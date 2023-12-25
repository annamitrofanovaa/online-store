<template>
    <div>
        <q-table :rows="rows" :columns="columns" row-key="id" :grid="isGrid" @row-click="rowSelected">
        </q-table>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { userStore } from '../usage'
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

        const bookData = reactive(userStore.getState().bookInfo);

        console.log(bookData)

        return {
            bookData
        }

    },
}
</script>