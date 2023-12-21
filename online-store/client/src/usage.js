import { PersistentStore } from "./storage";

class UserStore extends PersistentStore {
  data() {
    return {
      id: null,
      user_id: null,
      email: null,
      role: null,
      created_by: null,
      access_token: null,
      error: null,
      bookInfo: {
        name: null,
        price: null,
        description: null,
        author: null,
        genre: null,
        image: null,
      },
      genreInfo: [],
      authorInfo: [],
    };
  }

  updateAll(object) {
    console.log("object: ", object);
    for (const key in object) {
      this.state[key] = object[key];
    }
  }
  updateState(key, value) {
    this.state[key] = value;
  }
  updateInnerState(key, value) {
    for (const key1 in this.state[key]) {
      this.state[key][key1] = value[key1];
    }
  }
  clearAll() {
    for (const key in this.state) {
      this.clearKey(key);
    }
  }
  isAuthorized() {
    if (this.state.access_token && this.state.token_type) {
      return true;
    } else return false;
  }
  setError(value) {
    this.state.error = value;
  }
  getError() {
    return this.state.error;
  }
  clearKey(key) {
    if (
      this.state[key] &&
      typeof this.state[key] !== "string" &&
      Object.keys(this.state[key]).length > 0
    ) {
      for (const key1 in this.state[key]) {
        this.state[key][key1] = null;
      }
    } else {
      this.state[key] = null;
    }
  }
}
export const userStore = new UserStore("USER_STORE");
