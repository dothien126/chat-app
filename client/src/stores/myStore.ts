import { defineStore } from 'pinia';
import { ref } from 'vue';
import { NotificationMessage } from '../models/NotificationAlert';
import Cookies from 'js-cookie';

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

  function getCookie() {
    const cookie = Cookies.get('uid-chat');
    return cookie;
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
