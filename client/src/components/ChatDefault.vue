<template>
  <!-- BEGIN: Chat Default -->
  <div v-if="conversationStore.inChatting === false" class="h-full flex items-center">
    <div class="mx-auto text-center">
      <div class="w-16 h-16 flex-none image-fit rounded-full overflow-hidden mx-auto">
        <img alt="Midone Tailwind HTML Admin Template" :src="$f()[0].photos[0]" />
      </div>
      <div class="mt-3">
        <div class="font-medium">Hey, {{ $f()[0]['users'][0]['name'] }}!</div>
        <div class="text-slate-500 mt-1">Please select a chat to start messaging.</div>
      </div>
    </div>
  </div>
  <!-- END: Chat Default -->
</template>

<script lang="ts">
import { computed } from 'vue';
import { useConversationStore } from '../stores/conversationStore';
import { useAuthStore } from '../stores/authStore';
export default {
  name: 'ChatDefault',
  setup() {
    const conversationStore = useConversationStore();
    const authStore = useAuthStore();

    const currentUser = computed(() => {
      return authStore.currentUser.userInfor;
    });

    return {
      conversationStore,
      currentUser,
    };
  },
};
</script>
