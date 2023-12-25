<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="q-py-sm row bg-grey-3">
            <q-toolbar-title class="col q-mx-lg text-black">{{ role }}</q-toolbar-title>
            <q-btn class="col-auto q-mx-lg" color="white" text-color="black" @click="logout"
                :to="{ name: 'home' }">Выход</q-btn>
        </q-header>

        <q-dialog v-model="dialogOpen" persistent>
            <q-card class="q-ma-sm" style="width:50vw; height: 60vh;">
                <q-card-section>
                    <!-- <q-input filled label="id" class="q-ma-md" v-model="bookData.id" clearable></q-input> -->
                    <q-input filled label="Название книги" type="text" class="q-mx-md q-my-sm col" v-model="bookData.name"
                        clearable></q-input>

                    <q-select filled v-model="authors" class="q-mx-md q-my-sm col" :options="optionsAuthor"
                        option-value="id" option-label="name" emit-value map-options label="Автор"></q-select>
                    <q-select filled v-model="genres" class="q-mx-md q-my-sm col" :options="optionsGenre" option-value="id"
                        option-label="name" emit-value map-options label="Жанр"></q-select>

                    <q-input filled label="Описание книги" class="q-mx-md q-my-sm col" v-model="bookData.description"
                        clearable></q-input>
                    <q-input filled label="Цена" class="q-mx-md q-my-sm col" type="number" v-model.number="bookData.price"
                        clearable></q-input>
                    <!-- <q-file v-model="file" clearable label="Изображение" filled accept="image/*" max-files="1"
                        class="q-mx-md q-my-sm col" /> -->
                </q-card-section>

                <q-card-actions align="right" class="q-ma-md">
                    <q-btn class="q-mr-lg" flat @click="cancel">Отмена</q-btn>
                    <q-btn style="background-color: #1b2332;" text-color="white" class="q-ml-lg"
                        @click="addBook">Подтвердить</q-btn>
                </q-card-actions>
            </q-card>
        </q-dialog>




        <q-page-container>
            <q-page>
                <div>
                    <div class="row" v-if="role === 'ADMIN'">
                        <q-card class="col-12 col-sm-4" flat>
                            <q-card-section>
                                <q-input outlined label="Id пользователя" class="q-my-sm" v-model="workData.id"></q-input>
                                <q-input outlined label="Новая роль" class="q-my-sm" v-model="workData.role"></q-input>
                                <q-btn style="background-color: #1b2332;" text-color="white" size="md"
                                    @click="addAdmin">Добавить админа</q-btn>
                            </q-card-section>

                        </q-card>
                        <q-card class="col-12 col-sm-5" flat>
                            <q-card-section>
                                <q-input outlined label="Добавьте автора" v-model="workData.author"
                                    class="q-my-sm"></q-input>
                                <q-btn style="background-color: #1b2332;" text-color="white" size="md"
                                    class="q-ma-sm col-auto" @click="addAuthor">Добавить автора</q-btn>
                                <q-input outlined label="Добавьте жанр" v-model="workData.genre" class="q-my-sm"></q-input>
                                <q-btn style="background-color: #1b2332;" text-color="white" size="md"
                                    class="q-ma-sm col-auto" @click="addGenre">Добавить жанр</q-btn>
                            </q-card-section>
                        </q-card>
                    </div>
                    <q-card flat>
                        <q-card-section class="q-mx-auto">
                            <q-btn style="background-color: #1b2332;" text-color="white" size="md" class="q-ma-sm col-auto"
                                @Click="dialogOpen = true">Добавить книгу</q-btn>
                            <q-btn v-if="role === 'ADMIN'" style="background-color: #1b2332;" text-color="white" size="md"
                                class="q-ma-sm col-auto" @click="editBook">Редактировать книгу</q-btn>
                            <q-btn v-if="role === 'ADMIN'" style="background-color: #1b2332;" text-color="white" size="md"
                                class="q-ma-sm col-auto" @click="deleteBook">Удалить книгу</q-btn>
                        </q-card-section>
                    </q-card>
                </div>

                <div v-if="selectRow" class="q-my-md row">
                    <div class="col-12 col-md-5">
                        Выбранная книга: {{ selectRow.name }} &mdash; {{ selectRow.genre }}
                    </div>
                    <q-btn style="background-color: #1b2332;" text-color="white" size="md" :to="{ name: 'book' }"
                        class="col-auto" @click="addToStore">Показать
                        подробнее</q-btn>
                </div>
                <q-toggle v-model="isGrid" color="green" label="Внешний вид"></q-toggle>
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
        const file = ref(null);
        const image = ref(null);
        const authors = ref(null);
        const genres = ref(null);
        const optionsAuthor = ref([]);
        const optionsGenre = ref([]);
        const workData = reactive({ id: '', role: '', author: '', genre: '' })
        const bookData = reactive({ name: '', description: '', price: null });



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

        const rows = ref([
            {
                id: 1, name: 'LOTR', author: 'Author', genre: 'adventure', price: '100$',
            },
            {
                id: 2, name: 'HOT', author: 'Martin', genre: 'adventure', price: '200$',
            },

        ])



        function getGenre() {
            postToServer({ url: 'http://localhost:5000/api/genre', request: 'get' })
                .then((response) => {
                    console.log(response);
                    userStore.updateState('genreInfo', response);
                    optionsGenre.value = [...userStore.getState().genreInfo];
                })
                .catch((error) => {
                    console.error(error);
                    userStore.setError(error);
                })
        }

        function getAuthor() {
            postToServer({ url: 'http://localhost:5000/api/author', request: 'get' })
                .then((response) => {
                    console.log(response);
                    userStore.updateState('authorInfo', response);
                    optionsAuthor.value = [...userStore.getState().authorInfo];

                })
                .catch((error) => {
                    console.error(error);
                    userStore.setError(error);
                })
        }

        getGenre();
        getAuthor();


        optionsAuthor.value = [...userStore.getState().authorInfo];
        // console.log(optionsAuthor.value)
        optionsGenre.value = [...userStore.getState().genreInfo];
        function addAdmin() {
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
            console.log('selectRow.value ', selectRow.value);
            userStore.updateInnerState('bookInfo', selectRow.value);
        }

        function addAuthor() {
            if (!workData.author.trim()) {
                throw new Error('Пустая строка');
            }


            postToServer({ url: 'http://localhost:5000/api/author', data: { name: workData.author }, request: 'post' })
                .then((response) => {
                    console.log(response);
                    workData.author = '';
                    getAuthor()
                })
                .catch((error) => {
                    console.error(error);
                    userStore.setError(error);
                })


        }

        function addGenre() {
            if (!workData.genre.trim()) {
                throw new Error('Пустая строка');
            }

            postToServer({ url: 'http://localhost:5000/api/genre', data: { name: workData.genre }, request: 'post' })
                .then((response) => {
                    console.log(response);
                    workData.genre = '';
                    getGenre();
                })
                .catch((error) => {
                    console.error(error);
                    userStore.setError(error);
                })
        }

        function addBook() {

            if (!bookData.name.trim() || !bookData.description.trim() || !bookData.price || !genres.value || !authors.value) {
                throw new Error('Не все данные введены');
            }

            postToServer({
                url: 'http://localhost:5000/api/book', data: {
                    name: bookData.name, info: { title: bookData.name, description: bookData.description, }, price: bookData.price,
                    authorId: authors.value, genreId: genres.value
                }, request: 'post'
            })
                .then((response) => {
                    console.log(response);
                    dialogOpen.value = false;
                    for (const key in bookData) {
                        bookData[key] = '';
                    }
                })
                .catch((error) => {
                    console.error(error);
                    userStore.setError(error);
                })
        }
        function cancel() {
            dialogOpen.value = false;
        }


        function deleteBook() {

        }
        function editBook() {

        }
        return {
            role, columns, rows, isGrid, addAdmin, workData,
            bookData, logout, cancel, addBook, dialogOpen, selectRow,
            rowSelected, addToStore, deleteBook, editBook, addAuthor, addGenre,
            optionsAuthor, authors, genres, optionsGenre
        }
    },
}
</script>

<style scoped></style>