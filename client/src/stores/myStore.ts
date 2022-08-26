import { defineStore } from 'pinia';
import { ref } from 'vue';
import { CookieResponse } from '../models/cookieResponse';
import { NotificationMessage } from '../models/NotificationAlert';
import noAvatar from '@/assets/images/no-avatar.png';

export const MyStore = defineStore('myStore', () => {
  //Init value
  const cookie = ref('');
  const routeParam = ref('');
  const showMessage = ref<NotificationMessage>(new NotificationMessage());
  const isLoading = ref(false);

  //Cookie
  function deleteCookie(name: string) {
    const date = new Date();
    // Set it expire in -1 days
    date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
    // Set it
    document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
  }

  function getCookie(name: string) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');

    if (parts.length == 2) {
      cookie.value = parts.pop()!.split(';').shift() as string;
    } else {
      cookie.value = '';
    }
  }

  return {
    deleteCookie,
    getCookie,
    showMessage,
    routeParam,
    isLoading,
    cookie,
  };
});
