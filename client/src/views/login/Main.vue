<template>
  <div>
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
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
              sign in to your account.
            </div>
            <div class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
              Manage all your e-commerce accounts in one place
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">Sign In</h2>
            <div class="intro-x mt-2 text-slate-400 xl:hidden text-center">
              A few more clicks to sign in to your account. Manage all your e-commerce accounts in
              one place
            </div>
            <div class="intro-x mt-8">
              <input
                type="text"
                class="intro-x login__input form-control py-3 px-4 block"
                v-model="v$.addEmail.$model"
                placeholder="Email"
              />

              <input
                type="password"
                class="intro-x login__input form-control py-3 px-4 block mt-4"
                v-model="v$.password.$model"
                placeholder="Password"
              />
            </div>
            <div class="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
              <div class="flex items-center mr-auto">
                <input id="remember-me" type="checkbox" class="form-check-input border mr-2" />
                <label class="cursor-pointer select-none" for="remember-me">Remember me</label>
              </div>
              <a href="">Forgot Password?</a>
            </div>
            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button
                @click="loginHandle"
                class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
              >
                Login
              </button>
              <button
                @click="router.push('/')"
                class="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
              >
                Register
              </button>
            </div>
            <div
              class="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left"
            >
              By signin up, you agree to our
              <a class="text-primary dark:text-slate-200" href="">Terms and Conditions</a>
              &
              <a class="text-primary dark:text-slate-200" href="">Privacy Policy</a>
            </div>
          </div>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { email, helpers, required } from '@vuelidate/validators';
import { onMounted, ref, defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import Cookies from 'js-cookie';
import dom from '@left4code/tw-starter/dist/js/dom';

import { REQUIRED_EMAIL, REQUIRED, env } from '../../utils/myVariable';
import { IUser } from '../../types/userType';
import UserService from '../../services/UserService';
import {
  setNotificationFailedWhenGetData,
  setNotificationToastMessage,
} from '../../utils/MyFunction';
import { MyStore } from '../../stores/myStore';
import axios from 'axios';

export default defineComponent({
  name: 'Login',
  components: {},

  setup() {
    const addEmail = ref('');
    const password = ref('');
    const message = ref('');

    const router = useRouter();
    const myStore = MyStore();
    const formLogin = {
      addEmail,
      password,
    };

    const rules = {
      addEmail: {
        required: helpers.withMessage(REQUIRED, required),
        email: helpers.withMessage(REQUIRED_EMAIL, email),
      },
      password: {
        required: helpers.withMessage(REQUIRED, required),
      },
    };

    const v$ = useVuelidate(rules, formLogin);

    async function loginHandle() {
      v$.value.$touch();

      if (v$.value.$invalid === false) {
        const data = {
          email: addEmail.value,
          password: password.value,
        } as IUser;

        if (Cookies.get(env.nameCookie)) {
        }

        const response = await UserService.login(data, myStore.cookie);
        // const response = await axios.post('localhost:8000/api/user/login', data)
        console.log(response);

        if (response.data) {
          // setNotificationToastMessage(response.data.message, response.data.success);
          Cookies.set('uid-chat', response.data.values.accessToken);

          if (response.data.message === 'success') {
            await router.push('/home');
          }
        } else {
          setNotificationFailedWhenGetData();
        }
      }
    }

    onMounted(() => {
      dom('body').removeClass('main').removeClass('error-page').addClass('register');
    });

    return {
      addEmail,
      password,
      message,
      router,
      v$,
      loginHandle,
    };
  },
});
</script>
