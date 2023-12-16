<template>
  <div>
  <q-dialog v-model="errorShow">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6 text-bold">Ошибка</div>
      </q-card-section>

      <q-card-section class="q-pt-none" style="white-space: pre-line;">{{ error }}</q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" @click="closeError" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <div v-if="isInit">
    <router-view />
  </div>
  <div v-else>not Initialized</div>
  </div>
</template>

<script>
import { userStore } from "./usage";
import { ref, watch, watchEffect } from "vue";
import { onBeforeMount } from "vue";
// import { postToServer } from "./axiosRequest";


export default {
  setup() {
    const isInit = ref(userStore.getIsInitialized());
    const errorShow = ref(false);
    const error = ref(null);
    // const route = useRoute();
    function closeError() {
      userStore.setError(null);
      errorShow.value = false;
    }



    console.log(userStore.getState().access_token);

    watch(
      () => userStore.getError(),
      (val) => {
        console.log(val);
        error.value = val;
        if (val !== null) {
          errorShow.value = true;
        }
      },
    );
    watch(
      () => userStore.getIsInitialized(),
      (val) => {
        isInit.value = val;
      }
    );

    onBeforeMount(() => {
      userStore.init();
    })
    return { errorShow, error, closeError, isInit }
    }
}
</script>
