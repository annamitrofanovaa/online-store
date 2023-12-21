<template>
    <div style="height:100vh;">
        <div class="upper-bg"> </div>

        <div class="lower-bg"> </div>

        <q-card class="container-card">
            <q-card-section horizontal style="height:100%">
                <q-img class="gt-xs col-3" src="~assets/lib2.jpg">
                </q-img>

                <div class="main-card q-mx-md q-my-sm">
                    <div class=" text-h4 text-center register-text">Регистрация</div>
                    <q-card class="sub-card" flat>
                        <q-card-section class="col-12 ">
                            <q-card-section class="q-px-none">
                                <q-input filled label="Email" type="email" class="q-my-sm" v-model="email"></q-input>
                                <span v-if="emailErrorMessage" class="error-message">{{ emailErrorMessage }}</span>
                                <q-input filled label="Пароль" type="password" class="q-my-sm" v-model="password"
                                    @keyup.enter="readyClick"></q-input>
                                <span v-if="passwordErrorMessage" class="error-message">{{ passwordErrorMessage }}</span>
                            </q-card-section>
                        </q-card-section>
                        <q-card-actions>
                            <q-btn @click="readyClick" class="ok-button full-width text-white">Зарегистрироваться</q-btn>
                        </q-card-actions>
                    </q-card>
                </div>
            </q-card-section>
        </q-card>

    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { postreg } from '../axiosRequest'
import { userStore } from '../usage'
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode"

export default {
    setup() {
        const email = ref('');
        const password = ref('');
        const router = useRouter();

        const emailErrorMessage = ref('');
        const passwordErrorMessage = ref('');

        function validateEmail() {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                emailErrorMessage.value = "Email address is not valid";
                return false;
            } else {
                emailErrorMessage.value = '';
                return true;
            }
        }

        function validatePassword() {
            if (password.value.length < 8) {
                passwordErrorMessage.value = "String should have at least 8 characters";
                return false;
            } else {
                passwordErrorMessage.value = '';
                return true;
            }
        }

        function validateEmail1() {
            // Ваша логика проверки email здесь
            // Верните сообщение об ошибке или null, если валидация успешна
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                return "Email address is not valid";
            }
            return "Email address is valid";
        }

        function validatePassword1() {
            // Ваша логика проверки пароля здесь
            // Верните сообщение об ошибке или null, если валидация успешна
            if (password.value.length < 8) {
                return "String should have at least 8 characters";
            }
            return "String is valid";
        }



        function readyClick() {
            console.log(email);
            console.log(password);
            if (!email.value.trim() || !password.value.trim()) {
                throw new Error('не все данные введены');
            }
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();

            if (isEmailValid && isPasswordValid) {

                postreg({ email: email.value, password: password.value })
                    .then((myresponse) => {
                        console.log(myresponse);
                        userStore.updateState('access_token', myresponse.token);
                        console.log(jwtDecode(myresponse.token))
                        const response = jwtDecode(myresponse.token);
                        userStore.updateAll({ id: response.id, email: response.email, role: response.role });
                        router.push({ name: 'main' });
                    })
                    .catch((myerror) => {
                        console.error(myerror);
                        userStore.setError(myerror);
                    })

            } else {
                console.error('не прошла валидация')
            }
        }

        return {
            email,
            password,
            readyClick,
            validateEmail,
            validatePassword,
            emailErrorMessage,
            passwordErrorMessage,
            validatePassword1,
            validateEmail1
        }

    },


}
</script>


<style scoped>
.container-card {
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0px;
    background: none;
    width: 100vw;
}

.main-card {
    height: 100%;
    width: 80%;
    margin: 0 auto;
}

.sub-card {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 40%;
}

.upper-bg {
    background-color: rgba(255, 255, 255, 0.679);
    display: block;
    width: 100%;
    height: 100%;
}

.lower-bg {
    background-color: rgba(233, 233, 233, 0.6);
    width: 100%;
    height: 0%;
}

.register-text {
    height: 200px;
    line-height: 200px;
}

.ok-button {
    background-color: rgba(78, 59, 19, 0.742);

}



@media (min-width: 600px) {
    .container-card {
        height: 70vh;
        top: 15vh;
        left: 5vw;
        width: 90vw;
        background-color: white;
    }

    .sub-card {
        height: calc(100% - 100px);
    }

    .upper-bg {
        height: 60%;
    }

    .lower-bg {
        height: 40%
    }

    .register-text {
        height: 100px;
        line-height: 100px;
    }
}

@media (min-width: 1024px) {
    .container-card {
        height: 70vh;
        width: 65vw;
        top: 15vh;
        left: 15.5vw;
    }
}

@media (min-width: 1300px) {
    .container-card {
        width: 60vw;
        left: 20vw;
    }

    .ok-button {
        font-size: 16px;
    }
}

@media (min-width: 1500px) {
    .container-card {
        width: 50vw;
        left: 25vw;
    }
}

@media (max-height: 400px) {
    .container-card {
        height: 100vh;
        top: 0;
        left: 0;
        width: 100vw;
    }


}
</style>
