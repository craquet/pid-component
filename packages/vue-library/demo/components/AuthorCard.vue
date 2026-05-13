<script lang="ts">
export interface Author {
  orcid: string;
  name: string;
  institution?: string;
}
</script>

<script lang="ts" setup>
defineProps<{
  author: Author;
  darkMode?: boolean;
}>();

const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('');
};
</script>

<template>
  <v-card :color="darkMode ? 'grey-darken-3' : 'white'" elevation="1">
    <v-card-text>
      <div class="d-flex align-start ga-4">
        <v-avatar class="flex-shrink-0" :color="darkMode ? 'grey-darken-1' : 'indigo-lighten-5'" size="48">
          <span :class="darkMode ? 'text-grey-lighten-1' : 'text-indigo-darken-2'"
                class="font-weight-bold">{{ getInitials(author.name) }}</span>
        </v-avatar>
        <div class="flex-grow-1" style="min-width: 0;">
          <div
            class="text-body-1 font-weight-bold"
            :class="darkMode ? 'text-white' : 'text-grey-darken-3'"
            style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
          >
            {{ author.name }}
          </div>
          <div
            v-if="author.institution"
            class="text-caption mb-2"
            :class="darkMode ? 'text-grey-lighten-1' : 'text-grey-darken-2'"
            style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
          >
            {{ author.institution }}
          </div>
          <div style="min-height: 24px; max-height: 80px; overflow: hidden;">
            <pid-component :emphasize-component="false" :dark-mode="darkMode ? 'dark' : 'light'" :value="author.orcid"
                           style="display: block;" width="100%" />
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
