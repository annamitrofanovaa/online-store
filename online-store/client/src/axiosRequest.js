import axios from 'axios'
import { userStore } from './usage';
import router from './router';

function parseerror(data) {
    let errorMsg = "";
    data.detail.forEach((det) => {
        let tmp = "";
        tmp += det.loc[0] + " - ";
        tmp += det.loc[1] + ". ";
        tmp += det.type + ". ";
        tmp += det.msg + " \n";
        errorMsg += tmp;
    })
    return errorMsg
}

function parseCodeError(error) {
    let msg = '';
    // console.log('ERROR', error)
    if (error.status === 401) {
        // clean the store; go to logout page
        userStore.clearAll();
        router.push('/login');
        return;
    }
    if (Array.isArray(error.data.detail)) {
        msg = parseerror(error.data);
    } else {
        msg = error.data.detail;
    }
    return msg;
}

export function postreg({ email, password, role }) {
    return new Promise((resolve, reject) => {
        const myrequest = {
            "email": email,
            "password": password,
            "role": role
        }
        axios
            .post('http://localhost:5000/api/user/registration', myrequest)
            .then((response) => {
                console.log(response);
                const code = response.status;
                if (code > 199 && code < 300) {
                    resolve(response.data);
                } else {
                    reject(parseCodeError(response));
                }
            }

            )
            .catch((error) => {
                reject(parseCodeError(error.response));
            })
    }

    )
}

export function postlog({ email, password }) {
    return new Promise((resolve, reject) => {
        const myrequest = {
            "email": email,
            "password": password,
        }

        axios
            .post('http://localhost:5000/api/user/login', myrequest)
            .then((response) => {
                console.log(response);
                const code = response.status;
                if (code > 199 && code < 300) {
                    resolve(response.data);
                } else {
                    reject(parseCodeError(response));
                }
            })
            .catch((error) => {
                reject(parseCodeError(error.response));
            })
    })
}
