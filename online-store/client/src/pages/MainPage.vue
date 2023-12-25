<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="q-py-sm row bg-grey-3">
            <q-toolbar-title class="col q-mx-lg text-black">{{ role }}</q-toolbar-title>
            <q-btn class="col-auto q-mx-lg" color="white" text-color="black" :to="{ name: 'book' }">Мое избранное</q-btn>
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

                    <q-input v-if="!edit" filled label="Описание книги" class="q-mx-md q-my-sm col"
                        v-model="bookData.description" clearable></q-input>
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

        <q-dialog v-model="showBook">
            <q-card>
                <div class="q-pa-xl">
                    <div class="q-my-sm">Название: {{ selectRow.name }}</div>
                    <div class="q-my-sm">Автор: {{ optionsAuthor.find((a) => a.id === selectRow.authorId).name }}</div>
                    <div class="q-my-sm">Жанр: {{ optionsGenre.find((g) => g.id === selectRow.genreId).name }}</div>
                    <div class="q-my-sm">Описание: {{ myDescription }}</div>
                    <div class="q-my-sm">Цена: {{ selectRow.price }}</div>
                </div>
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
                                class="q-ma-sm col-auto" @click="addBook">Редактировать книгу</q-btn>
                            <q-btn v-if="role === 'ADMIN'" style="background-color: #1b2332;" text-color="white" size="md"
                                class="q-ma-sm col-auto" @click="deleteBook">Удалить книгу</q-btn>
                        </q-card-section>
                    </q-card>
                </div>

                <div v-if="selectRow" class="q-my-md row">
                    <div class="col-12 col-md-5">
                        Выбранная книга: {{ selectRow.name }} &mdash; {{ optionsAuthor.find((a) => a.id ===
                            selectRow.authorId).name }}
                    </div>
                    <q-btn style="background-color: #1b2332;" text-color="white" size="md" class="col-auto"
                        @click="addToStore">Показать
                        подробнее</q-btn>
                    <q-btn style="background-color: #1b2332;" text-color="white" size="md" class="q-ma-sm col-auto"
                        @Click="addToFavourites">Добавить в избранное</q-btn>
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
import { useQuasar } from 'quasar'
export default {
    setup() {
        const isGrid = ref(false);
        const role = userStore.getState().role;
        const dialogOpen = ref(false);
        const showBook = ref(false);
        const edit = ref(false);
        const selectRow = ref(null);
        const authors = ref(null);
        const genres = ref(null);
        const myDescription = ref('');
        const optionsAuthor = ref([]);
        const optionsGenre = ref([]);
        const workData = reactive({ id: '', role: '', author: '', genre: '' })
        const bookData = reactive({ name: '', description: '', price: null });
        const $q = useQuasar();




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
                field: 'authorId',
                format: (val, row) => {
                    if (optionsAuthor.value.length === 0 || !val) {
                        return null;
                    }
                    const author = optionsAuthor.value.find((a) => a.id === val)
                    if (!author) {
                        return null;
                    }
                    return author.name
                },
                align: 'center',
                sortable: true,
            },
            {
                name: 'genre',
                label: 'Жанр',
                field: 'genreId',
                format: (val, row) => {
                    // console.log(val)
                    if (optionsGenre.value.length === 0 || !val) {
                        return null;
                    }
                    const genre = optionsGenre.value.find((g) => g.id === val)
                    if (!genre) {
                        return null;
                    }
                    return genre.name
                },
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

        const rows = ref([]);


        function getTable() {
            postToServer({ url: 'http://localhost:5000/api/book', request: 'get' })
                .then((response) => {
                    console.log(response);
                    rows.value = [...response];
                })
                .catch((error) => {
                    console.error(error);
                })
        }

        getTable();

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
            if (selectRow.value && selectRow.value.id) {
                postToServer({ url: `http://localhost:5000/api/book/${selectRow.value.id}`, getParams: { id: selectRow.value.id }, request: 'get' })
                    .then((response) => {
                        myDescription.value = response.info[0].description;
                        showBook.value = true;
                    })
            }


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


            if (selectRow.value && selectRow.value.id) {
                const updatedBookData = {
                    name: bookData.name,
                    description: bookData.description,
                    price: bookData.price,
                    authorId: authors.value,
                    genreId: genres.value,
                };

                const hasChanges = JSON.stringify(selectRow.value) !== JSON.stringify(updatedBookData);

                if (!hasChanges) {
                    console.log('Данные не изменились');
                    return;
                }

                postToServer({
                    url: `http://localhost:5000/api/book/${selectRow.value.id}`,
                    data: updatedBookData,
                    request: 'put',
                })
                    .then((response) => {
                        console.log('Данные обновлены:', response);
                        dialogOpen.value = false;
                        getTable();
                    })
                    .catch((error) => {
                        console.error('Ошибка :', error);
                        userStore.setError(error);
                    });
            } else {
                if (!bookData.name.trim() || !bookData.description.trim() || !bookData.price || !genres.value || !authors.value) {
                    throw new Error('Не все данные введены');
                }
                postToServer({
                    url: 'http://localhost:5000/api/book',
                    data: {
                        name: bookData.name,
                        info: { title: bookData.name, description: bookData.description },
                        price: bookData.price,
                        authorId: authors.value,
                        genreId: genres.value
                    },
                    request: 'post'
                })
                    .then((response) => {
                        console.log(response);
                        dialogOpen.value = false;
                        for (const key in bookData) {
                            bookData[key] = '';
                        }
                        getTable();
                    })
                    .catch((error) => {
                        console.error(error);
                        userStore.setError(error);
                    });
            }
        }
        function cancel() {
            dialogOpen.value = false;
        }


        function deleteBook() {
            if (selectRow.value && selectRow.value.id) {
                $q.dialog({
                    title: 'Подтвердите',
                    message: 'Вы действительно хотите удалить эту книгу?',
                    cancel: 'Отмена',
                    persistent: true
                })
                    .onOk(() => {
                        postToServer({ url: `http://localhost:5000/api/book/${selectRow.value.id}`, request: 'delete' })
                            .then((response) => {
                                console.log(response);
                                selectRow.value = null;
                                getTable();
                            })
                            .catch((error) => {
                                console.error(error);
                                userStore.setError(error);
                            })
                    })
                    .onCancel(() => {

                    })
            } else {
                userStore.setError('Не выбрана книга');
            }
        }
        function editBook() {
            if (selectRow.value && selectRow.value.id) {
                bookData.name = selectRow.value.name;
                bookData.price = selectRow.value.price;
                authors.value = selectRow.value.authorId;
                genres.value = selectRow.value.genreId;
                edit.value = true;
                dialogOpen.value = true;
            }
        }
        function addToFavourites() {
            if (selectRow.value && selectRow.value.id) {
                postToServer({
                    url: 'http://localhost:5000/api/favorite/add', data: { bookId: selectRow.value.id, userId: userStore.getState().id },
                    request: 'post'
                })
                    .then((response) => {
                        console.log(response);

                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
        }
        return {
            role, columns, rows, isGrid, addAdmin, workData,
            bookData, logout, cancel, addBook, dialogOpen, selectRow,
            rowSelected, addToStore, deleteBook, editBook, addAuthor, addGenre,
            optionsAuthor, authors, genres, optionsGenre, getTable, showBook, myDescription, edit, addToFavourites
        }
    },
}
</script>

<style scoped></style>