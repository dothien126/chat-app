<template>
  <!-- BEGIN: Chat Side Menu -->
  <TabGroup class="col-span-12 lg:col-span-4 2xl:col-span-3">
    <div class="intro-y pr-1">
      <div class="box p-2">
        <TabList class="nav-pills">
          <Tab class="w-full py-2" tag="button">Chats</Tab>
          <Tab class="w-full py-2" tag="button">Friends</Tab>
          <Tab class="w-full py-2" tag="button">Profile</Tab>
        </TabList>
      </div>
    </div>
    <TabPanels>
      <TabPanel>
        <div class="pr-1">
          <div class="box px-5 pt-5 pb-5 lg:pb-0 mt-5">
            <div class="relative text-slate-500">
              <input
                type="text"
                class="form-control py-3 px-4 border-transparent bg-slate-100 pr-10"
                placeholder="Search for messages or users..."
              />
              <SearchIcon class="w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0" />
            </div>
            <div class="overflow-x-auto scrollbar-hidden">
              <div class="flex mt-5">
                <a
                  v-for="user in users"
                  :key="user._id"
                  href="javascript:;"
                  class="w-10 mr-4 cursor-pointer"
                >
                  <div class="w-10 h-10 flex-none image-fit rounded-full">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      class="rounded-full"
                      :src="user.avatar"
                      @click="handleCreateConversation(user._id)"
                    />
                    <div
                      class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                    ></div>
                  </div>
                  <div class="text-xs text-slate-500 truncate text-center mt-2">
                    {{ user.name }}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto scrollbar-hidden">
          <div class="relative text-slate-500">
            <input
              type="text"
              class="form-control py-3 px-4 border-transparent bg-slate-100 pr-10"
              placeholder="Search for users..."
            />
            <SearchIcon class="w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0" />
          </div>
          <div class="flex mt-5">
            <List User v-for="user in users" :key="user._id" :user="user" />
          </div>
        </div>
        <div class="overflow-x-auto scrollbar-hidden">
          <div class="cursor-pointer box relative flex items-center p-5 mt-5">
            <div class="flex mt-5">
              <a
                v-for="conversation in conversations"
                :key="conversation._id"
                href="javascript:;"
                class="w-10 mr-4 cursor-pointer"
                @click="showConversation()"
              >
                <div class="w-10 h-10 flex-none image-fit rounded-full bg-red-700">
                  <div class="w-10 h-10 flex-none image-fit rounded-full bg-white-700">
                    <div
                      class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                    ></div>
                  </div>
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
              </a>
            </div>
          </div>
          <div
            class="chat__chat-list overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4"
        >
          <Conversation
              :socket="socket"
              v-for="conversation in conversations"
              :key="conversation._id"
              :conversation="conversation"
          />
        </div>
        </div>
      </TabPanel>
      <TabPanel>
        <div class="pr-1">
          <div class="box p-5 mt-5">
            <div class="relative text-slate-500">
              <input
                type="text"
                class="form-control py-3 px-4 border-transparent bg-slate-100 pr-10"
                placeholder="Search for messages or users..."
              />
              <SearchIcon class="w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0" />
            </div>
            <button type="button" class="btn btn-primary w-full mt-3">Invite Friends</button>
          </div>
        </div>
        <div class="chat__user-list overflow-y-auto scrollbar-hidden pr-1 pt-1">
          <div class="cursor-pointer box relative flex items-center p-5 mt-5">
            <div class="w-12 h-12 flex-none image-fit mr-1">
              <img
                alt="Midone Tailwind HTML Admin Template"
                class="rounded-full"
                :src="$f()[3].photos[0]"
              />
              <div
                class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
              ></div>
            </div>
            <div class="ml-2 overflow-hidden">
              <div class="flex items-center">
                <a href="" class="font-medium">{{ $f()[3]['users'][0]['name'] }}</a>
              </div>
              <div class="w-full truncate text-slate-500 mt-0.5">Last seen 2 hours ago</div>
            </div>
            <Dropdown class="ml-auto">
              <DropdownToggle tag="a" class="w-5 h-5 block" href="javascript:;">
                <MoreHorizontalIcon class="w-5 h-5 text-slate-500" />
              </DropdownToggle>
              <DropdownMenu class="w-40">
                <DropdownContent>
                  <DropdownItem>
                    <Share2Icon class="w-4 h-4 mr-2" />
                    Share Contact
                  </DropdownItem>
                  <DropdownItem> <CopyIcon class="w-4 h-4 mr-2" /> Copy Contact </DropdownItem>
                </DropdownContent>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div class="cursor-pointer box relative flex items-center p-5 mt-5">
            <div class="w-12 h-12 flex-none image-fit mr-1">
              <img
                alt="Midone Tailwind HTML Admin Template"
                class="rounded-full"
                :src="$f()[4].photos[0]"
              />
              <div
                class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
              ></div>
            </div>
            <div class="ml-2 overflow-hidden">
              <div class="flex items-center">
                <a href="" class="font-medium">{{ $f()[4]['users'][0]['name'] }}</a>
              </div>
              <div class="w-full truncate text-slate-500 mt-0.5">Last seen 2 hours ago</div>
            </div>
            <Dropdown class="ml-auto">
              <DropdownToggle tag="a" class="w-5 h-5 block" href="javascript:;">
                <MoreHorizontalIcon class="w-5 h-5 text-slate-500" />
              </DropdownToggle>
              <DropdownMenu class="w-40">
                <DropdownContent>
                  <DropdownItem>
                    <Share2Icon class="w-4 h-4 mr-2" />
                    Share Contact
                  </DropdownItem>
                  <DropdownItem> <CopyIcon class="w-4 h-4 mr-2" /> Copy Contact </DropdownItem>
                </DropdownContent>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </TabPanel>
      <ChatProfile />
    </TabPanels>
  </TabGroup>
  <!-- END: Chat Side Menu -->
</template>

<script lang="ts">
import ChatProfile from './ChatProfile.vue';
import Conversation from './Conversation.vue';
import { onMounted, ref } from 'vue';
import { setNotificationFailedWhenGetData, setNotificationToastMessage } from '../utils/MyFunction';
import { IUser } from '../types/userType';
import ConversationService from '../services/conversationService';
import { IConversation } from '../types/conversationType';
import Cookies from 'js-cookie';
import UserService from '../services/userService';

export default {
  name: 'ChatSideMenu',
  components: { ChatProfile, Conversation },
  props: ['socket'],
  setup() {
    const usernameKeyword = ref('');
    const users = ref<IUser[]>([]);
    const conversations = ref<IConversation[]>([]);
    const conversation = ref(true);

    async function getAllConvHandle() {
      const cookie = Cookies.get('uid-chat') as string;

      const response = await ConversationService.getConvList({ data: '' }, cookie);
      if (response.data) {
        if (response.data.message === 'success') {
          conversations.value = response.data.values;
        } else if (!response.data.success) {
          // setNotificationToastMessage(response.data.message, false);
        }
      } else {
        setNotificationFailedWhenGetData();
      }
    }

    onMounted(async () => {
      await getAllConvHandle();
    });

    async function handleGetAllUser() {
      const cookie = Cookies.get('uid-chat') as string;

      const response = await UserService.getAllExpelMe({ data: '' }, cookie);

      if (response.data) {
        if (response.data.message === 'success') {
          users.value = response.data.values;
        } else {
          // setNotificationToastMessage(response.data.message, false);
        }
      } else {
        setNotificationFailedWhenGetData();
      }
    }

    onMounted(async () => {
      await handleGetAllUser();
    });

    const handleCreateConversation = async (receiverId: string) => {
      const cookie = Cookies.get('uid-chat') as string;

      const response = await ConversationService.createConv(receiverId, cookie);

      console.log(response);
    };

    const showConversation = () => {
      conversation.value = !conversation.value;
    };

    return {
      conversations,
      usernameKeyword,
      users,
      getAllConvHandle,
      handleGetAllUser,
      handleCreateConversation,
      showConversation,
    };
  },
};
</script>
