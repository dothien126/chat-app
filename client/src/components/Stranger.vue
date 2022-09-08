<template>
  <TabPanel>
    <div class="pr-1">
      <div class="box p-5 mt-5">
        <div class="relative text-slate-500">
          <input
            type="text"
            class="form-control py-3 px-4 border-transparent bg-slate-100 pr-10"
            placeholder="Search for users..."
            
          />
          <SearchIcon class="w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0" />
        </div>
        <button type="button" class="btn btn-primary w-full mt-3">Invite Friends</button>
      </div>
    </div>
    <div class="chat__user-list overflow-y-auto scrollbar-hidden pr-1 pt-1">
      
    </div>
  </TabPanel>
</template>

<script lang="ts">
import User from './User.vue';

export default {
  name: 'Stranger',
  components: { User },
  setup() {
    return {};
  },
};
</script>

<style></style>
