<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="q-py-sm row bg-grey-3">
            <q-toolbar-title class="col q-mx-lg text-black">{{ role }}</q-toolbar-title>
            <q-btn class="col-auto q-mx-lg" color="white" text-color="black">Выход</q-btn>
        </q-header>

        <q-page-container>
            <q-page>
                <q-card>
                    <q-input outlined label="Id пользователя" class="q-my-sm" v-model="workData.id"></q-input>
                    <q-input outlined label="Новая роль" class="q-my-sm" v-model="workData.role"></q-input>
                    <q-btn @click="AddAdmin">Добавить админа</q-btn>
                </q-card>
                <q-toggle v-model="isGrid" color="green" label="Показ"></q-toggle>
                <q-table :rows="rows" :columns="columns" row-key="id" :grid="isGrid">

                </q-table>
            </q-page>
        </q-page-container>

    </q-layout>
</template>

<script>
import { ref, reactive } from 'vue';
import { userStore } from '../usage'
import { postToServer } from '../axiosRequest';
export default {
    setup() {
        const isGrid = ref(false);
        const role = userStore.getState().role;
        const workData = reactive({ id: '', role: '' })
        const columns = [
            {
                name: 'id',
                align: 'center',
                label: 'id',
                field: 'id',
                sortable: true,
            },
            {
                name: 'name',
                label: 'Название',
                field: 'name',
                align: 'center',
                sortable: true,
            },
            {
                name: 'author',
                label: 'Автор',
                field: 'author',
                align: 'center',
                sortable: true,
            },
            {
                name: 'genre',
                label: 'Жанр',
                field: 'genre',
                align: 'center',
                sortable: true,
            },
            {
                name: 'price',
                label: 'Цена',
                field: 'price',
                align: 'center',
                sortable: true,
            },

        ]
        const rows = [
            {
                id: 1, name: 'LOTR', author: 'Author', genre: 'adventure', price: '100$',
            },
            {
                id: 2, name: 'HOT', author: 'Martin', genre: 'adventure', price: '200$',
            },

        ]

        function AddAdmin() {
            if (userStore.getState().access_token) {
                postToServer({ url: 'http://localhost:5000/api/admin/assignRole', data: { userId: workData.id, newRole: workData.role }, request: 'post' })
                    .then((response) => {
                        console.log(response);

                    })
                    .catch((error) => {
                        console.error(error);
                        userStore.setError(error);
                    })
            }
        }


        return { role, columns, rows, isGrid, AddAdmin, workData }
    },
}
</script>