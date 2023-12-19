import axios from "axios";
import { userStore } from "./usage";
import router from "./router";

function parseerror(data) {
  let errorMsg = "";
  data.detail.forEach((det) => {
    let tmp = "";
    tmp += det.loc[0] + " - ";
    tmp += det.loc[1] + ". ";
    tmp += det.type + ". ";
    tmp += det.msg + " \n";
    errorMsg += tmp;
  });
  return errorMsg;
}

function parseCodeError(error) {
  let msg = "";
  // console.log('ERROR', error)
  if (error.status === 401) {
    // clean the store; go to logout page
    userStore.clearAll();
    router.push("/login");
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
      email: email,
      password: password,
      role: role,
    };
    axios
      .post("http://localhost:5000/api/user/registration", myrequest)
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
      });
  });
}

export function postlog({ email, password }) {
  return new Promise((resolve, reject) => {
    const myrequest = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:5000/api/user/login", myrequest)
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
      });
  });
}

export function postToServer({ url, data, request, getParams }) {
  console.log("POST TO SERVER: ", data); // что передаем

  return new Promise((resolve, reject) => {
    //ассинхронное
    const { access_token } = userStore.getState();
    let axiosFunc;

    if (!access_token) {
      //хранить в локальном хранилище
      console.log("No tokens found");
      reject("no token");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      ...getParams,
    };

    if (request === "get") {
      axiosFunc = axios.get(url, config);
    } else if (request === "post") {
      axiosFunc = axios.post(url, data, config);
    } else if (request === "put") {
      axiosFunc = axios.put(url, data, config);
    } else if (request === "delete") {
      axiosFunc = axios.delete(url, config);
    } else {
      console.log("unknown Request Type");
    }

    axiosFunc
      .then((response) => {
        const code = response.status;
        console.log("OBJECT: ", data);
        console.log("RESPONSE: ", response);
        if (code > 199 && code < 300) {
          console.log("RESULT: ", response.data);
          resolve(response.data);
        } else {
          reject(parseCodeError(response));
        }
      })
      .catch((error) => {
        // console.log("ERR", error);
        const errormsg = parseCodeError(error.response);
        console.log(errormsg);
        reject(errormsg);
      });
  });
}
