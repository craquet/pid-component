<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  activePage?: string;
}>();

const emit = defineEmits<{
  navigate: [page: string];
}>();

const activePage = ref(props.activePage || 'home');

const handleNavigate = (page: string) => {
  activePage.value = page;
  emit('navigate', page);
};
</script>

<template>
  <v-app-bar border="b" color="white" flat>
    <template #prepend>
      <v-btn icon variant="text">
        <v-icon color="indigo-darken-1">mdi-database</v-icon>
      </v-btn>
    </template>
    <v-app-bar-title class="text-grey-darken-3 font-weight-bold">
      Lorem ipsum
      <v-chip class="ml-2" color="warning" size="x-small">Demo</v-chip>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <div class="d-flex align-center ga-2 mr-4">
      <v-btn
        :color="activePage === 'home' ? 'primary' : 'default'"
        variant="text"
        @click="handleNavigate('home')"
      >
        Home
      </v-btn>
      <v-btn
        :color="activePage === 'datasets' ? 'primary' : 'default'"
        variant="text"
        @click="handleNavigate('datasets')"
      >
        Datasets
      </v-btn>
      <v-btn
        :color="activePage === 'about' ? 'primary' : 'default'"
        variant="text"
        @click="handleNavigate('about')"
      >
        About
      </v-btn>
    </div>
  </v-app-bar>
</template>
