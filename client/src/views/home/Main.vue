<template>
  <div class="intro-y chat grid grid-cols-12 gap-5 mt-5">
    <ChatSideMenu :socket="socket" />
    <div class="intro-y col-span-12 lg:col-span-8 2xl:col-span-9">
      <div class="chat__box box">
        <ChatActive :socket="socket" />
        <!-- <ChatDefault /> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import ChatDefault from '../../components/ChatDefault.vue';
import ChatActive from '../../components/ChatActive.vue';
import ChatSideMenu from '../../components/ChatSideMenu.vue';
import TopBar from '../../components/top-bar/Main.vue';
import io from 'socket.io-client';
import SideMenu from '../../components/SideMenu.vue';
import { watch, ref, onMounted } from 'vue';
import { useConversationStore } from '../../stores/conversationStore';
import { Conversation } from '../../types/conversationType';
import { env } from '../../utils/myVariable';

export default {
  name: 'Home',
  components: {
    // ChatDefault,
    ChatActive,
    ChatSideMenu,
    TopBar,
    SideMenu,
  },
  setup() {
    // @ts-ignore
    const socket = io.connect(env.hostSocket);

    const showChat = ref(false);

    const conversationStore = useConversationStore();

    // onMounted(() => {
    //   if (localStorage.getItem('reloaded')) {
    //     // The page was just reloaded. Clear the value from local storage
    //     // so that it will reload the next time this page is visited.
    //     localStorage.removeItem('reloaded');
    //   } else {
    //     // Set a flag so that we know not to reload the page twice.
    //     localStorage.setItem('reloaded', '1');
    //     location.reload();
    //   }
    // });

    watch(
      () => conversationStore.detailConversation,
      async (detailConversation: Conversation) => {
        if (detailConversation) {
          showChat.value = true;
        }
      }
    );
    return { socket, conversationStore, showChat };
  },
};
</script>

<style></style>
