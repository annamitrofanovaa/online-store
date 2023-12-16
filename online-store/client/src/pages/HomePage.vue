<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated reveal>
            <q-toolbar style="background-color: white;">
                <q-toolbar-title style="color:#222C3C; font-family:Montserrat; font-weight:light;"
                    class="gt-xs q-ml-lg text-h5">
                    Library
                </q-toolbar-title>
                <q-space></q-space>
                <q-btn :to="{ name: 'login' }" padding="2px 25px" text-color="primary" rounded
                    class="my__btn q-my-auto q-mx-lg" size="lg">
                    Войти
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <q-page>
                <q-card>
                    <q-card-section horizontal>
                        <q-img class="col-12 my-image" src="~assets/lib.png">
                        </q-img>
                        <div
                            class="absolute-center text-uppercase text-weight-bold text-h3 text-white col-8 text-center topic">
                             Обозреватель книг
                        </div>
                        <div class="absolute-bottom text-center">
                            <q-btn :to="{ name: 'reg' }" size="xl" color="white" text-color="primary" rounded push
                                padding="5px 30px" style="bottom: 15vh; font-weight:500;">Зарегистрироваться</q-btn>
                        </div>
                        <div>

                        </div>

                    </q-card-section>
                </q-card>

                <div class="register-text text-center col-12 text-h3 text-weight-medium"
                    style="font-family: Montserrat; font-weight: medium; padding-top:10vh; padding-bottom: 5vh;">Наши преимущества
                </div>

                <div>
                    <q-intersection transition="fade" transition-duration="1500" once>
                        <q-card class="row" flat style="background-color: rgba(247, 247, 247, 0.684);">
                            <q-card-section class=" col-12 col-md-4" style="padding-top: 5vh;">
                                <q-icon name="fa-solid fa-bookmark" size="5rem"></q-icon>
                                <div class="text-center text-h5" style="padding-top: 5vh; font-family: Montserrat;"> Добавляйте любимые книги
                                </div>
                                <div class="text-center "
                                    style="padding-top: 3vh; font-family:Montserrat; font-weight: 400;">
                                    Выбирайте и добавляйте книги 
                                </div>
                            </q-card-section>

                            <q-card-section class="col-12 col-md-4" style="padding-top: 5vh;">
                                <q-icon name="fa-solid fa-address-book" size="5rem"></q-icon>
                                <div class="text-center text-h5" style="padding-top: 5vh; font-family: Montserrat;">
                                    Ищите по авторам</div>
                                <div class="text-center "
                                    style="padding-top: 3vh; font-family:Montserrat; font-weight: 400;">
                                    Выбирайте книги любимых авторов
                                </div>
                            </q-card-section>

                            <q-card-section class="col-12 col-md-4" style="padding-top: 5vh;">
                                <q-icon name="fa-solid fa-swatchbook" size="5rem"></q-icon>
                                <div class="text-center text-h5" style="padding-top: 5vh; font-family: Montserrat;">
                                    Выбирайте любимые жанры</div>
                                <div class="text-center "
                                    style="padding-top: 3vh; font-family:Montserrat; font-weight: 400;">
                                    Сортируйте и ищите книги исходя из предпочитаемого жанра
                                </div>
                            </q-card-section>

                        </q-card>
                    </q-intersection>
                </div>




                <div class="text-center text-weight-medium text-h4"
                    style="font-family: Montserrat; font-weight: medium;  padding-bottom:10vh; padding-top:10vh;">
                    Удобный поиск без лишних усилий</div>


                <q-card flat style="font-family: Montserrat; padding-top: 2vh; padding-bottom: 5vh;">
                    <q-card-section class="row">
                        <div class="col-12 col-md-5 q-ml-auto q-my-auto">
                            <div class="text-weight-medium my-text">Анализируйте данные о книге</div>
                            <div class="q-my-lg text-weight-regular q-mr-lg">Читайте описание книги</div>
                        </div>
                        <q-img class="col-11 col-md-5 q-mr-auto" src="~assets/book.jpg"></q-img>
                    </q-card-section>
                </q-card>


                <q-card
                    style="font-family: Montserrat; background-color: rgba(243, 242, 242, 0.827); padding-top: 5vh; padding-bottom: 5vh;">
                    <q-card-section class="row center">
                        <div class="col-12 col-md-5 q-mr-auto q-my-auto">
                            <div class="text-weight-medium my-text">Управляйте ресурсами</div>
                            <div class="q-my-lg text-weight-regular">Добавляйте свое описание, ищите по авторам и жанрам</div>
                        </div>
                        <q-img class="col-11 col-md-5 q-mr-lg unic" src="~assets/lib2.jpg "></q-img>
                    </q-card-section>
                </q-card>

            </q-page>
        </q-page-container>

    </q-layout>
</template>

<script>

export default {
}
</script>

<style scoped>
.my__btn {
    font-size: 1rem;

}

.my-image {
    height: 60vh;
}

.topic {
    top: calc(20vh + 50px);
}

.col-md-3 {
    font-size: 15px;
}

.unic {
    margin-left: 0px;
}

.q-my-auto {
    font-size: 17px;
}

.my-text {
    font-size: 20px;
}

.q-icon {
    left: 43%;
}

@media(min-width:1024px) {

    .center {
        flex-direction: row-reverse;

    }

    .q-my-auto {
        font-size: 20px;
    }

    .my-text {
        font-size: 27px;
    }

    .unic {
        margin-left: 100px;
    }

    .q-icon {
        left: 40%;
    }

    .my-image {
        height: 80vh;
    }

    .topic {
        top: calc(25vh);
    }
}
</style>