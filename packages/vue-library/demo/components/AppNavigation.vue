<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  activePage?: string;
  darkMode?: boolean;
}>();

const emit = defineEmits<{
  navigate: [page: string];
  'update:darkMode': [value: boolean];
}>();

const activePage = ref(props.activePage || 'home');

const handleNavigate = (page: string) => {
  activePage.value = page;
  emit('navigate', page);
};

const toggleDarkMode = () => {
  emit('update:darkMode', !props.darkMode);
};
</script>

<template>
  <v-app-bar :color="darkMode ? 'grey-darken-4' : 'white'" border="b" flat>
    <template #prepend>
      <v-btn icon variant="text">
        <v-icon :color="darkMode ? 'white' : 'indigo-darken-1'">mdi-database</v-icon>
      </v-btn>
    </template>
    <v-app-bar-title class="font-weight-bold">
      <span :class="darkMode ? 'text-white' : 'text-grey-darken-3'">Lorem ipsum</span>
      <v-chip class="ml-2" size="x-small" color="orange" :class="darkMode ? 'text-white' : 'text-white'">Demo</v-chip>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <div class="d-flex align-center ga-2 mr-4">
      <v-btn
        :color="activePage === 'home' ? 'primary' : 'default'"
        :class="darkMode ? 'text-white' : ''"
        variant="text"
        @click="handleNavigate('home')"
      >
        Home
      </v-btn>
      <v-btn
        :color="activePage === 'datasets' ? 'primary' : 'default'"
        :class="darkMode ? 'text-white' : ''"
        variant="text"
        @click="handleNavigate('datasets')"
      >
        Datasets
      </v-btn>
      <v-btn
        :color="activePage === 'about' ? 'primary' : 'default'"
        :class="darkMode ? 'text-white' : ''"
        variant="text"
        @click="handleNavigate('about')"
      >
        About
      </v-btn>
      <v-btn
        icon
        variant="text"
        @click="toggleDarkMode"
      >
        <v-icon :color="darkMode ? 'yellow' : 'grey'">{{ darkMode ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
        </v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>
