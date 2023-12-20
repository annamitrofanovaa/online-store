<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="q-py-sm row bg-grey-3">
            <q-toolbar-title class="col q-mx-lg text-black">{{ role }}</q-toolbar-title>
            <q-btn class="col-auto q-mx-lg" color="white" text-color="black" @click="logout"
                :to="{ name: 'home' }">Выход</q-btn>
        </q-header>

        <q-dialog v-model="dialogOpen" persistent>
            <q-card class="q-ma-sm">
                <q-card-section>
                    <!-- <q-input filled label="id" class="q-ma-md" v-model="bookData.id" clearable></q-input> -->
                    <q-input filled label="Название книги" class="q-mx-md col" v-model="bookData.name" clearable></q-input>
                    <q-input filled label="Автор" class="q-mx-md col" v-model="bookData.author" clearable></q-input>
                    <q-input filled label="Жанр" class="q-mx-md col" v-model="bookData.genre" clearable></q-input>
                    <q-input filled label="Описание книги" class="q-mx-md col" v-model="bookData.description"
                        clearable></q-input>
                    <q-input filled label="Цена" class="q-mx-md col" v-model="bookData.price" clearable></q-input>
                </q-card-section>

                <q-card-actions align="right" class="q-ma-md"> <q-btn class="q-mr-lg" flat
                        @click="cancel">Отмена</q-btn><q-btn style="background-color: #1b2332;" text-color="white"
                        class="q-ml-lg" @click="addBook">Подтвердить</q-btn></q-card-actions>
            </q-card>
        </q-dialog>




        <q-page-container>
            <q-page>
                <q-card v-if="role === 'ADMIN'" class="row" flat>
                    <q-card-section class="col-12 col-sm-4">
                        <q-input outlined label="Id пользователя" class="q-my-sm" v-model="workData.id"></q-input>
                        <q-input outlined label="Новая роль" class="q-my-sm" v-model="workData.role"></q-input>
                        <q-btn @click="AddAdmin">Добавить админа</q-btn>
                    </q-card-section>
                    <q-card-section class="q-mx-auto">
                        <q-btn style="background-color: #1b2332;" text-color="white" size="md" class="q-ma-sm col-auto"
                            @Click="dialogOpen = true">Добавить книгу</q-btn>
                        <q-btn style="background-color: #1b2332;" text-color="white" size="md" class="q-ma-sm col-auto"
                            @click="editBook">Редактировать книгу</q-btn>
                        <q-btn style="background-color: #1b2332;" text-color="white" size="md" class="q-ma-sm col-auto"
                            @click="deleteUser">Удалить книгу</q-btn>
                    </q-card-section>
                </q-card>

                <div v-if="selectRow" class="q-my-md row">
                    <div class="col-12 col-md-5">
                        Выбранная книга: {{ selectRow.name }} &mdash; {{ selectRow.genre }}
                    </div>
                    <q-btn style="background-color: #1b2332;" text-color="white" size="md" :to="{ name: 'book' }"
                        class="col-auto" @click="addToStore">Показать
                        подробнее</q-btn>
                </div>
                <q-toggle v-model="isGrid" color="green" label="Показ"></q-toggle>
                <q-table :rows="rows" :columns="columns" row-key="id" :grid="isGrid" @row-click="rowSelected">

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
        const dialogOpen = ref(false);
        const selectRow = ref(null);
        const workData = reactive({ id: '', role: '' })
        const bookData = reactive({ name: '', description: '', author: '', genre: '', price: '' });



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

        function logout() {
            userStore.clearAll();
        }

        function rowSelected(event, row, idx) {
            console.log(row);
            selectRow.value = row;
        }

        function addToStore() {
            userStore.updateState()
        }
        function addBook() {
            for (const key in bookData) {
                if (!bookData[key].trim()) {
                    throw new Error('Не все данные введены');
                }
            }

            postToServer({ url: 'http://localhost:5000/api/book', data: { name: bookData.name, description: bookData.description, price: bookData.price, author: bookData.price, genre: bookData.genre }, request: 'post' })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                    userStore.setError(error);
                })
        }
        function cancel() {
            dialogOpen.value = false;
        }

        return { role, columns, rows, isGrid, AddAdmin, workData, bookData, logout, cancel, addBook, dialogOpen, selectRow, rowSelected, addToStore }
    },
}
</script>

<style scoped></style>