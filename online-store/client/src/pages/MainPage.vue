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

                    <q-select filled v-model="authors" multiple class="q-mx-md q-my-sm col" :options="optionsAuthor"
                        option-value="id" option-label="name" emit-value map-options label="Автор"></q-select>
                    <q-select filled v-model="genres" multiple class="q-mx-md q-my-sm col" :options="optionsGenre"
                        option-value="id" option-label="name" emit-value map-options label="Жанр"></q-select>

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


        <q-dialog v-model="review">
            <q-card>

                <div>
                    <q-input filled label="Ваш отзыв" class="q-mx-md q-my-sm col" v-model="bookReview" clearable></q-input>
                    <q-btn style="background-color: #1b2332; " text-color="white" class="q-mr-lg" flat
                        @click="addReview">Добавить</q-btn>
                </div>
            </q-card>
        </q-dialog>


        <q-dialog v-model="MOREREVIEW" width="60vw">
            <div>

                <q-card v-if="selectRow1">
                    <q-btn style="background-color: #1b2332; " text-color="white" class="q-mr-lg" flat
                        @click="answerOn">Ответить</q-btn>
                </q-card>
                <q-table :rows="rows1" :columns="columns1" row-key="id" @row-click="onSelection">

                </q-table>
            </div>
        </q-dialog>



        <q-page-container>
            <q-page>
                <div>
                    <div class="row" v-if="role === 'ADMIN'">
                        <q-card class="col-12 col-sm-4" flat>
                            <q-card-section>
                                <q-input outlined label="Email пользователя" class="q-my-sm"
                                    v-model="workData.email"></q-input>
                                <q-input outlined label="Новая роль (ADMIN)" class="q-my-sm"
                                    v-model="workData.role"></q-input>
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
                        Выбранная книга: {{ selectRow.name }} &mdash; {{ optionsAuthor.find((a) => a.id ===
                            selectRow.authorId).name }}
                    </div>
                    <q-btn style="background-color: #1b2332;" text-color="white" size="md" class=" q-ma-sm col-auto"
                        @click="addToStore">Показать
                        подробнее</q-btn>
                    <q-btn style="background-color: #1b2332;" text-color="white" size="md" class="q-ma-sm col-auto"
                        @Click="showReview">Добавить отзыв</q-btn>
                    <q-btn style="background-color: #1b2332;" text-color="white" size="md" class="q-ma-sm col-auto"
                        @Click="showAllReview">Показать отзывы на книгу</q-btn>
                    <q-btn style="background-color: #1b2332;" text-color="white" size="md" class="q-ma-sm col-auto"
                        @Click="addToFavourites">Добавить в избранное</q-btn>
                </div>
                <q-toggle v-model="isGrid" color="green" label="Внешний вид"></q-toggle>
                <q-table :rows="rows" :columns="columns" row-key="id" :grid="isGrid" @row-click="rowSelected">
                    <template v-slot:item="props">
                        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                            <q-card flat bordered>
                                <q-card-section class="text-center">
                                    <strong>{{ props.row.name }}</strong>
                                </q-card-section>
                                <q-separator />
                                <q-card-section class="text-center">
                                    <div>Автор: {{ optionsAuthor.find((a) => props.row.authorId === a.id).name }} </div>
                                    <div>Жанр: {{ optionsGenre.find((g) => props.row.genreId === g.id).name }} </div>
                                    <div>Цена: {{ props.row.price }} </div>
                                    <div>Описание: {{ getDescription(props.row.id) }}
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </template>
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
        const review = ref(false);
        const showBook = ref(false);
        const edit = ref(false);
        const selectRow = ref(null);
        const selectRow1 = ref(null);

        const authors = ref(null);
        const genres = ref(null);
        const myDescription = ref('');
        const optionsAuthor = ref([]);
        const optionsGenre = ref([]);
        const allInfos = ref([]);
        const workData = reactive({ id: '', role: '', author: '', genre: '' })
        const bookData = reactive({ name: '', description: '', price: null });
        const bookReview = ref('');
        const MOREREVIEW = ref(false);
        // const addReview = ref('');
        const $q = useQuasar();
        const answer = ref(false);


        const rows1 = ref([]);

        const columns1 = [
            {
                name: 'id',
                align: 'center',
                label: 'Название книги',
                field: 'bookId',
                format: (val, row) => {
                    if (allBooks.value.length === 0 || !val) {
                        return null;
                    }
                    const book = allBooks.value.find((b) => b.id === val);
                    if (!book) {
                        return null;
                    }
                    return book.name;
                },
                sortable: true,
            },
            {
                name: 'text',
                align: 'center',
                label: 'Отзыв',
                field: 'text',
                sortable: true,
            },
            // {
            //     name: 'Пользователь',
            //     align: 'center',
            //     label: 'user',
            //     field: 'userId',
            //     sortable: true,
            // },
            {
                name: 'parentId',
                align: 'center',
                label: 'Отве на отзыв',
                field: 'parentId',
                format: (val, row) => {
                    if (!val) {
                        return 'Отсутствует родительский отзыв';
                    }
                    // Здесь можете преобразовать val в нужный формат, если это id, ищите соответствующий отзыв и получайте информацию о нем
                    // Например:
                    const parentReview = rows1.value.find((review) => review.id === val);
                    return parentReview ? `${parentReview.text}` : 'Не найден';
                },
                sortable: true,
            },
        ]




        const columns = [
            // {
            //     name: 'id',
            //     align: 'center',
            //     label: 'id',
            //     field: 'id',
            //     sortable: true,
            // },
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


        const allBooks = ref([]);
        function getTable() {
            postToServer({ url: 'http://localhost:5000/api/book', request: 'get' })
                .then((response) => {
                    console.log(response);
                    rows.value = [...response];
                    allBooks.value = [...response];
                    console.log(allBooks.value);
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
                    // userStore.updateState('genreInfo', response);
                    optionsGenre.value = [...response];
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
                    // userStore.updateState('authorInfo', response);
                    optionsAuthor.value = [...response];

                })
                .catch((error) => {
                    console.error(error);
                    userStore.setError(error);
                })
        }

        getGenre();
        getAuthor();




        // optionsAuthor.value = [...authorInfo];
        // console.log(optionsAuthor.value)
        // optionsGenre.value = [...userStore.getState().genreInfo];
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
        function onSelection(event, row, idx) {
            console.log('ON SEKECT', row);
            selectRow1.value = row;
        }

        function getAllInfos() {
            postToServer({ url: 'http://localhost:5000/api/bookinfo', request: 'get' })
                .then((response) => {
                    console.log('info', response);
                    allInfos.value = [...response];
                })
                .catch((error) => {
                    console.error(error);
                })
        }

        getAllInfos();
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

        function answerOn() {
            if (selectRow1.value && selectRow1.value.id) {
                review.value = true;
            }
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
        function getDescription(bookId) {
            const infos = allInfos.value.find((info) => info.bookId === bookId);
            // console.log('INFO', info.id)
            return infos ? infos.description : 'Описание отсутствует';
        }
        function addToFavourites() {
            if (selectRow.value && selectRow.value.id) {
                postToServer({
                    url: 'http://localhost:5000/api/favorite', data: { bookId: selectRow.value.id, userId: userStore.getState().id },
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

        function showReview() {
            if (selectRow.value && selectRow.value.id) {
                review.value = true;
            }
        }

        function addReview() {
            if (selectRow.value && selectRow.value.id) {
                console.log('SELECTROW', selectRow.value.id)
                let requestData = { userId: userStore.getState().id, bookId: selectRow.value.id, text: bookReview.value };

                if (selectRow1.value && selectRow1.value.id) {
                    console.log('SELECTROW1', selectRow1.value.id);
                    requestData.parentId = selectRow1.value.id;
                }

                postToServer({ url: 'http://localhost:5000/api/review', data: requestData, request: 'post' })
                    .then((response) => {
                        console.log(response);
                        bookReview.value = '';
                        review.value = false;
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
        }


        function showAllReview() {
            if (selectRow.value && selectRow.value.id) {
                postToServer({ url: `http://localhost:5000/api/review/${selectRow.value.id}`, request: 'get' })
                    .then((response) => {
                        MOREREVIEW.value = true;
                        console.log(response);
                        rows1.value = [...response];
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
        }

        function replyToReview() {

        }


        return {
            role, columns, rows, isGrid, addAdmin, workData,
            bookData, logout, cancel, addBook, dialogOpen, selectRow,
            rowSelected, addToStore, deleteBook, editBook, addAuthor, addGenre,
            optionsAuthor, authors, genres, optionsGenre, getTable, showBook, myDescription, edit, addToFavourites, getDescription,
            allInfos, addReview, review, bookReview, showReview, showAllReview, MOREREVIEW, rows1, columns1, replyToReview, onSelection, selectRow1,
            answerOn
        }
    },
}
</script>

<style scoped></style>