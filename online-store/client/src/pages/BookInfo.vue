<template>
    <div>
        <q-card flat>
            <div class="row">
                <q-img :src="bookData.image" class="col-4"></q-img>
                <q-card-section class="col-6">
                    <div class="text-h4 text-center"> {{ bookData.name }} </div>
                    <div class="q-my-lg text-h6"> Автор : {{ bookData.author }}</div>
                    <div class="q-my-lg text-h6"> Жанр : {{ bookData.genre }}</div>
                    <div class="q-my-lg text-h6"> Цена : {{ bookData.price }}</div>
                    <div class="q-my-lg text-h6"> Описание : {{ bookData.description }}</div>
                </q-card-section>
            </div>
            <q-card-section>
                <q-btn style="background-color: #1b2332; bottom:-30vh;" text-color="white"
                    :to="{ name: 'main' }">Назад</q-btn>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { userStore } from '../usage'
export default {
    setup() {
        const bookData = reactive(userStore.getState().bookInfo);

        console.log(bookData)

        return {
            bookData
        }

    },
}
</script>