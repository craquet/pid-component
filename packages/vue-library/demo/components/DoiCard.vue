<script lang="ts" setup>
import { PidComponent } from '../../lib';

defineProps<{
  value: string;
  license?: string;
  darkMode?: boolean;
}>();
</script>

<template>
  <v-card :color="darkMode ? 'grey-darken-3' : 'white'" class="fill-height" elevation="1">
    <v-card-text>
      <div class="text-caption text-uppercase font-weight-bold mb-3"
           :class="darkMode ? 'text-grey-lighten-1' : 'text-grey-darken-2'">
        Digital Object Identifier
      </div>
      <div style="min-height: 120px; max-height: 300px; overflow: hidden;">
        <pid-component :value="value" style="display: block;" width="100%" />
      </div>
      <v-divider v-if="license" class="my-4"></v-divider>
      <template v-if="license">
        <div class="text-caption text-uppercase font-weight-bold mb-3"
             :class="darkMode ? 'text-grey-lighten-1' : 'text-grey-darken-2'">
          License
        </div>
        <div style="min-height: 80px; max-height: 200px; overflow: hidden;">
          <pid-component :value="license" style="display: block;" width="100%" />
        </div>
      </template>
    </v-card-text>
  </v-card>
</template>
