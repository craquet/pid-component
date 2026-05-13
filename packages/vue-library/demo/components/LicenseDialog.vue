<script lang="ts" setup>
import { ref } from 'vue';
import { PidComponent } from '../../lib';

defineProps<{
  darkMode?: boolean;
}>();

const dialogOpen = ref(false);

const openDialog = () => {
  dialogOpen.value = true;
};
</script>

<template>
  <v-card :color="darkMode ? 'grey-darken-3' : 'white'" class="fill-height" elevation="1">
    <v-card-item>
      <v-card-title class="text-body-1 font-weight-bold d-flex align-center ga-2"
                    :class="darkMode ? 'text-white' : 'text-grey-darken-3'">
        <v-icon :color="darkMode ? 'grey-lighten-1' : 'grey-darken-2'">mdi-scale-balance</v-icon>
        License Information
      </v-card-title>
    </v-card-item>
    <v-card-text>
      <v-btn color="primary" @click="openDialog">
        <v-icon start>mdi-scale-balance</v-icon>
        View License Details
      </v-btn>
    </v-card-text>
  </v-card>

  <v-dialog v-model="dialogOpen" max-width="600">
    <v-card :color="darkMode ? 'grey-darken-3' : 'white'">
      <v-card-title class="text-h6 font-weight-bold" :class="darkMode ? 'text-white' : 'text-grey-darken-3'">Apache
        License 2.0
      </v-card-title>
      <v-card-text>
        <p class="text-body-2 mb-4" :class="darkMode ? 'text-grey-lighten-1' : 'text-grey-darken-2'">
          This dataset is published under the Apache 2.0 license, allowing free reuse with appropriate attribution.
        </p>
        <div style="min-height: 150px; max-height: 400px; overflow: hidden;">
          <pid-component style="display: block;" value="https://spdx.org/licenses/Apache-2.0"
                         :dark-mode="darkMode ? 'dark' : 'light'" width="100%" />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="darkMode ? 'grey-lighten-1' : 'grey-darken-1'" variant="outlined" @click="dialogOpen = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
