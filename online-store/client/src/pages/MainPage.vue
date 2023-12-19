<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="q-py-sm row bg-grey-3">
            <q-toolbar-title class="col q-mx-lg text-black">{{ role }}</q-toolbar-title>
            <q-btn class="col-auto q-mx-lg" color="white" text-color="black">Выход</q-btn>
        </q-header>

        <q-page-container>
            <q-page>
                <q-toggle v-model="isGrid" color="green" label="Показ"></q-toggle>
                <q-table :rows="rows" :columns="columns" row-key="id" :grid="isGrid">

                </q-table>
            </q-page>
        </q-page-container>

    </q-layout>
</template>

<script>
import { ref } from 'vue';
import { userStore } from '../usage'
export default {
    setup() {
        const isGrid = ref(false);
        const role = userStore.getState().role;
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


        return { role, columns, rows, isGrid }
    },
}
</script>