<script lang="ts" setup>
import type { Author } from './AuthorCard.vue';
import AuthorCardComponent from './AuthorCard.vue';

defineProps<{
  authors: Author[];
  darkMode?: boolean;
}>();
</script>

<template>
  <div class="mb-8">
    <h2 class="text-h6 font-weight-bold mb-4 d-flex align-center"
        :class="darkMode ? 'text-white' : 'text-grey-darken-3'">
      <v-icon :class="darkMode ? 'text-grey-lighten-1' : 'text-grey-darken-2'" class="mr-2">mdi-account-group</v-icon>
      Lorem ipsum dolor sit amet
    </h2>
    <v-row>
      <v-col v-for="author in authors" :key="author.orcid" cols="4">
        <AuthorCardComponent :author="author" :dark-mode="darkMode" />
      </v-col>
    </v-row>
  </div>
</template>
