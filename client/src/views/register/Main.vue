<template>
  <div>
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Register Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="" class="-intro-x flex items-center pt-5">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="w-6"
              src="@/assets/images/logo.svg"
            />
            <span class="text-white text-lg ml-3"> Rubick </span>
          </a>
          <div class="my-auto">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="-intro-x w-1/2 -mt-16"
              src="@/assets/images/illustration.svg"
            />
            <div class="-intro-x text-white font-medium text-4xl leading-tight mt-10">
              A few more clicks to <br />
              sign up to your account.
            </div>
            <div class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
              Manage all your e-commerce accounts in one place
            </div>
          </div>
        </div>
        <!-- END: Register Info -->
        <!-- BEGIN: Register Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">Sign Up</h2>
            <div class="intro-x mt-2 text-slate-400 dark:text-slate-400 xl:hidden text-center">
              A few more clicks to sign in to your account. Manage all your e-commerce accounts in
              one place
            </div>
            <div class="intro-x mt-8">
              <input
                type="text"
                class="intro-x login__input form-control py-3 px-4 block"
                v-model="v$.username.$model"
                placeholder="Username"
              />
              <template v-if="v$.username.$error">
                <div
                  class="text-danger mt-3"
                  v-for="(error, index) in v$.username.$errors"
                  :key="index"
                >
                  {{ error.$message }}
                </div>
              </template>
              <input
                type="text"
                class="intro-x login__input form-control py-3 px-4 block mt-4"
                v-model="v$.addEmail.$model"
                placeholder="Email"
              />
              <template v-if="v$.addEmail.$error">
                <div
                  class="text-danger mt-3"
                  v-for="(error, index) in v$.addEmail.$errors"
                  :key="index"
                >
                  {{ error.$message }}
                </div>
              </template>
              <input
                type="password"
                class="intro-x login__input form-control py-3 px-4 block mt-4"
                v-model="v$.password.$model"
                placeholder="Password"
              />
              <template v-if="v$.password.$error">
                <div
                  class="text-danger mt-3"
                  v-for="(error, index) in v$.password.$errors"
                  :key="index"
                >
                  {{ error.$message }}
                </div>
              </template>
              <div class="intro-x w-full grid grid-cols-12 gap-4 h-1 mt-3">
                <div class="col-span-3 h-full rounded bg-success"></div>
                <div class="col-span-3 h-full rounded bg-success"></div>
                <div class="col-span-3 h-full rounded bg-success"></div>
                <div class="col-span-3 h-full rounded bg-slate-100 dark:bg-darkmode-800"></div>
              </div>
              <a href="" class="intro-x text-slate-500 block mt-2 text-xs sm:text-sm"
                >What is a secure password?</a
              >
            </div>
            <div
              class="intro-x flex items-center text-slate-600 dark:text-slate-500 mt-4 text-xs sm:text-sm"
            >
              <input id="remember-me" type="checkbox" class="form-check-input border mr-2" />
              <label class="cursor-pointer select-none" for="remember-me"
                >I agree to the Envato
              </label>
              <a class="text-primary dark:text-slate-200" href="">Terms and Conditions</a>
              &
              <a class="text-primary dark:text-slate-200 ml-1" href=""> Privacy Policy</a>.
            </div>
            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button
                @click="registerHandle"
                class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
              >
                Register
              </button>
              <button
                @click="router.push('/login')"
                class="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
        <!-- END: Register Form -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { helpers, minLength, email, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import dom from '@left4code/tw-starter/dist/js/dom';

import UserService from '../../services/UserService';
import {
  setNotificationFailedWhenGetData,
  setNotificationToastMessage,
} from '../../utils/MyFunction';
import { REQUIRED_EMAIL, REQUIRED, MIN_LENGTH, MIN_TEXT_LENGTH } from '../../utils/myVariable';
import { IUser } from '../../types/userType';

export default defineComponent({
  name: 'Register',
  components: {},
  setup() {
    const username = ref('');
    const addEmail = ref('');
    const password = ref('');
    const avatar = ref('');
    const message = ref('');

    const router = useRouter();

    const formRegister = {
      username,
      addEmail,
      password,
      avatar,
    };

    // vuelidate
    const rules = {
      username: {
        required: helpers.withMessage(REQUIRED, required),
        minLength: helpers.withMessage(MIN_LENGTH, minLength(MIN_TEXT_LENGTH)),
      },
      addEmail: {
        required: helpers.withMessage(REQUIRED, required),
        email: helpers.withMessage(REQUIRED_EMAIL, email),
      },
      password: {
        required: helpers.withMessage(REQUIRED, required),
      },
      avatar: {},
    };

    const v$ = useVuelidate(rules, formRegister);

    async function registerHandle() {
      v$.value.$touch();

      if (v$.value.$invalid === false) {
        const data = {
          username: username.value,
          email: addEmail.value,
          password: password.value,
          avatar: avatar.value,
        } as IUser;

        const response = await UserService.insert(data);
        if (response.data) {
          // setNotificationToastMessage(response.data.message, response.data.success);

          if (response.data.message === 'success') {
            await router.push('/login');
          }
        } else {
          setNotificationFailedWhenGetData();
        }
      }
    }

    onMounted(() => {
      dom('body').removeClass('main').removeClass('error-page').addClass('login');
    });

    return {
      username,
      addEmail,
      password,
      avatar,
      message,
      v$,
      router,
      registerHandle,
    };
  },
});
</script>
