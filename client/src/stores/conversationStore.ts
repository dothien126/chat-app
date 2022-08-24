import { defineStore, StoreDefinition } from 'pinia';
import { Conversation } from '../types/conversationType';

export const useConversationStore: StoreDefinition = defineStore({
  id: 'conversations',
  state: () => ({
    conversations: [] as Conversation[],
    detailConversation: {} as Conversation | undefined,
    inChatting: false as boolean,
  }),
  getters: {},
  actions: {
    getListConversations(conv: Conversation[]) {
      this.conversations = conv;
    },

    getChatDetail(convId: string) {
      this.detailConversation = this.conversations.find(
        (conversation: Conversation) => conversation._id === convId
      );
    },

    openChat() {
      this.inChatting = true;
    },
  },
});
