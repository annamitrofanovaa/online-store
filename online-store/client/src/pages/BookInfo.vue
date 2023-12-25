<template>
    <div>
        <div v-if="selectRow" class="q-my-md row">
            <div class="col-12 col-md-5">
                Выбранная книга: {{ selectRow.name }} &mdash; {{ optionsAuthor.find((a) => a.id ===
                    selectRow.authorId).name }}
            </div>
            <q-btn style="background-color: #1b2332;" text-color="white" size="md" class="q-ma-sm col-auto"
                @Click="deleteFromFav">Удалить из избранного</q-btn>
        </div>
        <q-table :rows="rows" :columns="columns" row-key="id" @row-click="rowSelected">
        </q-table>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { userStore } from '../usage'
import { postToServer } from '../axiosRequest';
export default {
    setup() {
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
                    console.log(val)
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
        const optionsAuthor = ref([]);
        const optionsGenre = ref([]);
        const selectRow = ref(null);
        const allBooks = ref([]);
        const favoriteBooks = ref([]);

        function getAllBooks() {
            postToServer({ url: 'http://localhost:5000/api/book', request: 'get' })
                .then((response) => {
                    allBooks.value = [...response];
                    return postToServer({ url: `http://localhost:5000/api/favorite/${userStore.getState().id}`, getParams: { params: { userId: userStore.getState().id } }, request: 'get' })
                })
                .then((response) => {
                    console.log('second', response)
                    favoriteBooks.value = [...response];
                    favoriteBooks.value.forEach(element => {
                        const book = allBooks.value.find((b) => b.id === element.bookId);
                        if (book) {
                            rows.value.push(book);
                        }
                    });
                    console.log(rows.value);
                })
                .catch((error) => {
                    console.error(error);
                })

        }

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
        getAllBooks();

        function deleteFromFav() {
            if (selectRow.value && selectRow.value.id) {
                postToServer({ url: 'http://localhost:5000/api/favorite', getParams: { params: { bookId: selectRow.value.id, userId: userStore.getState().id } }, request: 'delete' })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
        }

        function rowSelected(event, row, idx) {
            console.log(row);
            selectRow.value = row;
        }

        return {
            columns, rows, getAllBooks, getGenre, getAuthor, optionsAuthor, optionsGenre, deleteFromFav, rowSelected, selectRow
        }

    },
}
</script>