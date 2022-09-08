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
    getListConversations(conversations: Conversation[]) {
      this.conversations = conversations;
    },

    getChatDetail(conversationId: string) {
      this.detailConversation = this.conversations.find(
        (conversation: Conversation) => conversation._id === conversationId
      );
    },

    openChat() {
      this.inChatting = true;
    },
  },
});
