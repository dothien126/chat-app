<template>
  <!-- BEGIN: Chat Active -->
  <div v-if="!conversationStore.inChatting" class="h-full flex flex-col">
    <div
      class="flex flex-col sm:flex-row border-b border-slate-200/60 dark:border-darkmode-400 px-5 py-4"
    >
      <div class="flex items-center">
        <div class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit relative">
          <img
            alt="Midone Tailwind HTML Admin Template"
            class="rounded-full"
            v-bind:src="receiverId?.avatar"
          />
        </div>
        <div class="ml-3 mr-auto">
          <div class="ml-3 mr-auto">
            <div class="font-medium text-base">{{ receiver?.username }}</div>
            <div class="text-slate-500 text-xs sm:text-sm">
              Hey, I am using chat <span class="mx-1">•</span> Online
            </div>
            <div class="text-red-500"></div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center sm:ml-auto mt-5 sm:mt-0 border-t sm:border-0 border-slate-200/60 pt-3 sm:pt-0 -mx-5 sm:mx-0 px-5 sm:px-0"
      >
        <a href="javascript:;" class="w-5 h-5 text-slate-500">
          <SearchIcon class="w-5 h-5" />
        </a>
        <a href="javascript:;" class="w-5 h-5 text-slate-500 ml-5">
          <UserPlusIcon class="w-5 h-5" />
        </a>
        <Dropdown class="ml-auto sm:ml-3">
          <DropdownToggle tag="a" href="javascript:;" class="w-5 h-5 text-slate-500">
            <MoreVerticalIcon class="w-5 h-5" />
          </DropdownToggle>
          <DropdownMenu class="w-40">
            <DropdownContent>
              <DropdownItem>
                <Share2Icon class="w-4 h-4 mr-2" />
                Share Contact
              </DropdownItem>
              <DropdownItem>
                <SettingsIcon class="w-4 h-4 mr-2" />
                Settings
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1">
      <div class="clear-both"></div>
      <div class="chat__box__text-box flex items-end float-right mb-4">
        <Dropdown class="hidden sm:block mr-3 my-auto">
          <DropdownToggle tag="a" href="javascript:;" class="w-4 h-4 text-slate-500">
            <MoreVerticalIcon class="w-4 h-4" />
          </DropdownToggle>
          <DropdownMenu class="w-40">
            <DropdownContent>
              <DropdownItem>
                <CornerUpLeftIcon class="w-4 h-4 mr-2" />
                Reply
              </DropdownItem>
              <DropdownItem> <TrashIcon class="w-4 h-4 mr-2" /> Delete </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="clear-both"></div>
    </div>
    <div
        id="message-box"
        class="overflow-y-scroll scrollbar-hidden px-5 pt-5 h-96 flex-1 flex flex-col"
    >
      <div
          v-for="message in messageList"
          :key="message._id"
          :class="`chat__box__text-box flex items-end  mb-4 ${
          user._id === message.sender ? 'self-end' : 'self-start'
        }`"
      >
        <div
            class="w-10 h-10 hidden sm:block flex-none image-fit relative mr-5"
        >
          <img
              alt="Midone - HTML Admin Template"
              class="rounded-full"
              v-bind:src="
              message.sender === user._id ? user.avatar : receiverId?.avatar
            "
          />
        </div>
        <div
            class="bg-slate-100 dark:bg-darkmode-400 px-4 py-3 text-slate-500 rounded-r-md rounded-t-md"
        >
          {{ message.text }}
          <div class="mt-1 text-xs text-slate-500">
            {{ moment(message.createdAt).fromNow() }}
          </div>
        </div>
        <div class="hidden sm:block dropdown ml-3 my-auto">
          <a
              href="javascript:"
              class="dropdown-toggle w-4 h-4 text-slate-500"
          >
            <i class="w-4 h-4"></i>
          </a>
          <div class="dropdown-menu w-40">
            <ul class="dropdown-content">
              <li>
                <a class="dropdown-item">
                  <i class="w-4 h-4 mr-2"></i>
                  Reply
                </a>
              </li>
              <li>
                <a class="dropdown-item">
                  <i class="w-4 h-4 mr-2"></i> Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="clear-both"></div>
    </div>
    <div
        class="pt-4 pb-10 sm:py-4 flex items-center border-t border-slate-200/60"
    >
      <textarea
          class="chat__box__input form-control dark:bg-darkmode-600 h-16 resize-none border-transparent px-5 py-3 shadow-none focus:border-transparent focus:ring-0"
          placeholder="Type your message..."
          v-model="newMessage"
      ></textarea>
      <a
          @click="actionSendMessage"
          href="javascript:"
          class="w-8 h-8 sm:w-10 sm:h-10 block bg-primary text-white rounded-full flex-none flex items-center justify-center mr-5"
      >
        <SendIcon class="w-4 h-4" />
      </a>
    </div>
  </div>
  <!-- END: Chat Active -->
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useAuthStore } from '../stores/authStore';
import moment from 'moment';
import { useConversationStore } from '../stores/conversationStore';
import { IMessage } from '../types/messageType';
import { Conversation, GetConversationOfFriend } from '../types/conversationType';
import ConversationService from '../services/ConversationService';
import { setNotificationFailedWhenGetData, setNotificationToastMessage } from '../utils/myFunction';
import MessageService from '../services/MessageService';
import { IUser } from '../types/userType';
import { MyStore } from '../stores/myStore';
import Cookies from 'js-cookie';

export default {
  name: 'ChatActive',
  props: ['socket', 'conversation'],
  // @ts-ignore
  setup(props: any) {
    const newMessage = ref('');
    const messageList = ref<IMessage[]>([]);
    const conversationId = ref<string>('');
    const receiverId = ref<IUser>();
    const isTyping = ref(false);
    const deleteMessageId = ref('');

    const authStore = useAuthStore();
    const conversationStore = useConversationStore();
    const myStore = MyStore();
    const user = authStore.currentUser.userInfor;

    const previewFiles = (event) => {
      newMessage.value = event.target.files;
    };

    const chooseIcon = (event) => {
      newMessage.value = newMessage.value + event.target.value;
    };

    async function actionSaveMessage(data: IMessage) {
      const cookie = Cookies.get('uid-chat') as string;

      const response = await MessageService.createMsg(data, cookie);
      if (response.data) {
        if (!response.data.success) {
          setNotificationToastMessage(response.data.message, false);
        }
      } else {
        setNotificationFailedWhenGetData();
      }
    }

    async function findAllMessagesInConversation(conversationId: string) {
      const data = {
        conversationId: conversationId,
      } as IMessage;
      const response = await MessageService.getMsgOfConv(data, myStore.cookie);
      if (response.data) {
        if (response.data.success) {
          messageList.value = response.data.values;
        } else {
          setNotificationToastMessage(response.data.message, false);
        }
      } else {
        setNotificationFailedWhenGetData();
      }
    }

    function actionInitDeleteMessage(message: IMessage) {
      deleteMessageId.value = message._id;
    }

    async function actionDeleteMessage(message: IMessage) {
      const data = message;

      const response = await MessageService.deleteMsg(data, myStore.cookie);
      if (response.data) {
        if (response.data.success) {
          const indexOfMessage = messageList.value.findIndex((value) => value._id === message._id);
          if (indexOfMessage >= 0) {
            messageList.value.splice(indexOfMessage, 1);
          }
        } else {
          setNotificationToastMessage(response.data.message, false);
        }
      } else {
        setNotificationFailedWhenGetData();
      }
    }

    watch(
      () => conversationStore.detailConversation,
      async (detailConversation: Conversation) => {
        await findAllMessagesInConversation(conversationId.value);
      }
    );

    props.socket.on('start_typing_message', async (data: IMessage) => {
      if (data.senderId !== user._id) {
        isTyping.value = true;
      } else {
        isTyping.value = false;
      }

      // Scroll tới cuối Div
      const element: HTMLElement | any = await document.getElementById('message-box');
      element.scrollTop = element.scrollHeight;
    });

    if (newMessage.value === '') {
      props.socket.on('stop_typing_message', (data: IMessage) => {
        if (data.senderId !== user._id) {
          isTyping.value = false;
        }
      });
    }

    function actionStartTypingMessage() {
      const startTypingMessageData = {
        conversationId: conversationId.value,
        senderId: user._id,
      } as IMessage;
      props.socket.emit('start_typing_message', startTypingMessageData);
    }

    watch(
      () => newMessage.value,
      (value: string) => {
        if (value === '') {
          const stopTypingMessageData = {
            conversationId: conversationId.value,
            senderId: user._id,
          } as IMessage;
          props.socket.emit('stop_typing_message', stopTypingMessageData);
        }
      }
    );

    // @ts-ignore
    async function handleSendMessage(event) {
      event.preventDefault();

      if (newMessage.value !== '' && conversationId.value && user && receiverId.value) {
        const messageData = {
          conversationId: conversationId.value,
          senderId: user._id,
          text: newMessage.value,
          receiverId: receiverId.value._id,
        } as IMessage;

        await props.socket.emit('send_message', messageData);
        props.socket.emit('send_unread', messageData);
        await actionSaveMessage(messageData);
        newMessage.value = '';
      }
    }

    props.socket.on('receive_message', async (data: IMessage) => {
      messageList.value = [...messageList.value, data];

      // Scroll xuống dưới cùng
      const element: HTMLElement | any = await document.getElementById('message-box');
      element.scrollTop = element.scrollHeight;
    });

    return {
      newMessage,
      messageList,
      handleSendMessage,
      user,
      receiverId,
      conversationStore,
      moment,
      isTyping,
      previewFiles,
      chooseIcon,
      actionStartTypingMessage,
      actionDeleteMessage,
      actionInitDeleteMessage,
    };
  },
};
</script>
