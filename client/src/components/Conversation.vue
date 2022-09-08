<template>
  <div
    @click="joinConversation(conversation._id)"
    class="intro-x cursor-pointer box relative flex items-center p-5 mt-5 hover:bg-slate-400"
  >
    <div class="w-12 h-12 flex-none image-fit mr-1">
      <img alt="Midone Tailwind HTML Admin Template" class="rounded-full" src="" />
      <div
        class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
      ></div>
    </div>
    <div class="ml-2 overflow-hidden">
      <div class="flex items-center">
        <a href="javascript:" class="font-medium">{{}}</a>
        <div class="text-xs text-slate-400 ml-16">
          {{ moment(conversation?.lastMessage?.createdAt).format('HH:mm') }}
        </div>
      </div>
      <div class="w-full truncate text-slate-500 mt-0.5">
        {{ conversation?.lastMessage?.text }}
      </div>
    </div>
    <div
      class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1"
    >
      {{ unreadMessageCount }}
    </div>
    <div
      class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1"
    >
      0
    </div>
  </div>
</template>

<script lang="ts">
import { useConversationStore } from '../stores/conversationStore';
import { onMounted, ref, computed } from 'vue';
import moment from 'moment';
import { useAuthStore } from '../stores/authStore';
import { IMessage } from '../types/messageType';
import MessageService from '../services/MessageService';
import { setNotificationFailedWhenGetData, setNotificationToastMessage } from '../utils/myFunction';
import { MyStore } from '../stores/myStore';

export default {
  name: 'Conversation',
  props: ['conversation', 'socket'],
  // @ts-ignore
  setup(props: any) {
    const conversationStore = useConversationStore();
    const authStore = useAuthStore();
    const unReadMessage = ref<IMessage[]>([]);
    const myStore = MyStore();

    async function actionMarkReadedMessage(conversationId: string) {}

    onMounted(() => {
      unReadMessage.value = props.conversation.unreadMessage;
    });

    async function joinConversation(conversationId: string) {
      props.socket.emit('join_conversation', conversationId);
      conversationStore.openChat();
      // Lấy thông tin cuộc trò chuyện
      await conversationStore.getChatDetail(conversationId);

      // Change to read message

      // Scroll tới cuối cùng
      const element: HTMLElement | any = document.getElementById('message-box');
    }

    props.socket.on('receiver_unread', (data: IMessage) => {
      if (data.conversationId === props.conversation._id) {
        unReadMessage.value.push(data);
      }
    });

    const unReadMessageCount = computed(() => {
      return unReadMessage.value.length;
    });

    return {
      conversationStore,
      moment,
      unReadMessage,
      authStore,
      unReadMessageCount,
      joinConversation,
    };
  },
};
</script>

<style></style>
