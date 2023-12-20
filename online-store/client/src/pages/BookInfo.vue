<template>
    <div>
        <q-card flat>
            <div class="row">
                <div class="col-4">картинка</div>
                <q-card-section class="col-6">
                    <div class="text-h4 text-center"> Название </div>
                    <div class="q-my-lg text-h6"> Автор :</div>
                    <div class="q-my-lg text-h6"> Жанр :</div>
                    <div class="q-my-lg text-h6"> Цена :</div>
                    <div class="q-my-lg text-h6"> Описание :</div>
                </q-card-section>
            </div>
            <q-card-section>
                <q-btn style="background-color: #1b2332; bottom:-30vh;" text-color="white"
                    :to="{ name: 'main' }">Назад</q-btn>
            </q-card-section>
        </q-card>
    </div>
</template>