<script lang="ts" setup>
defineProps<{
  darkMode?: boolean;
}>();
</script>

<template>
  <v-footer :color="darkMode ? 'grey-darken-4' : 'white'" class="pa-0">
    <div class="d-flex align-center w-100 px-4 py-3">
      <v-icon :icon="darkMode ? 'mdi-database' : 'mdi-database'" :color="darkMode ? 'white' : 'grey-darken-2'" />
      <span class="ml-3 text-body-1 font-weight-bold" :class="darkMode ? 'text-white' : 'text-black'">Lorem ipsum</span>
      <v-spacer />
      <span class="text-body-2" :class="darkMode ? 'text-grey-lighten-1' : 'text-grey-darken-2'">Powered by</span>
      <v-btn
        icon
        variant="text"
        size="small"
        class="ml-2"
        :color="darkMode ? 'grey-lighten-1' : 'grey-darken-2'"
      >
        <v-icon size="20">mdi-database</v-icon>
      </v-btn>
    </div>
  </v-footer>
</template>