<template>
  <TabPanel>
    <div class="pr-1">
      <div class="box px-5 py-10 mt-5">
        <div class="w-20 h-20 flex-none image-fit rounded-full overflow-hidden mx-auto">
          <img alt="Midone Tailwind HTML Admin Template" v-bind:src="informationOfMe?.avatar" />
        </div>
        <div class="text-center mt-3">
          <div class="font-medium text-lg">
            {{ informationOfMe?.username }}
          </div>
          <div class="text-slate-500 mt-1">Try to besttt</div>
        </div>
      </div>
      <div class="box p-5 mt-5">
        <div class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 py-5">
          <div>
            <div class="text-slate-500">Email</div>
            <div class="mt-1">{{informationOfMe?.email}}</div>
          </div>
          <MailIcon class="w-4 h-4 text-slate-500 ml-auto" />
        </div>
        <div class="flex items-center pt-5">
          <div>
            <div class="text-slate-500">Joined Date</div>
            <div class="mt-1">{{ moment(informationOfMe?.createdAt).format('MMMM d, YYYY') }}</div>
          </div>
          <ClockIcon class="w-4 h-4 text-slate-500 ml-auto" />
        </div>
      </div>
    </div>
  </TabPanel>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import moment from 'moment';
import Cookies from 'js-cookie';
import UserService from '../services/userService';
import { IUser } from '../types/userType';

export default {
  name: 'ChatProfile',
  setup() {
    let informationOfMe = ref<IUser>();

    async function handleGetInforMe() {
      const cookie = Cookies.get('uid-chat') as string;

      const response = await UserService.getInforMe(cookie);
      if (response.data) {
        if (response.data.message === 'success') {
          informationOfMe.value = response.data.values;
        } else if (!response.data.success) {
          // setNotificationToastMessage(response.data.message, false);
        }
      } else {
        // setNotificationFailedWhenGetData();
      }
    }

    onMounted(async () => {
      await handleGetInforMe();
    });

    return {
      moment,
      informationOfMe,
      handleGetInforMe
    };
  },
};
</script>

<style></style>
