<script lang="ts" setup>

defineProps<{
  title?: string;
  description?: string;
  doi?: string;
  darkMode?: boolean;
}>();
</script>

<template>
  <v-card :color="darkMode ? 'grey-darken-3' : 'white'" class="fill-height" elevation="1">
    <v-card-item>
      <template #prepend>
        <div class="d-flex gap-2">
          <v-chip size="small" :color="darkMode ? 'blue-darken-1' : 'blue-lighten-5'"
                  :text-color="darkMode ? 'white' : 'blue-darken-2'">DOI
          </v-chip>
          <v-chip size="small" :color="darkMode ? 'green-darken-1' : 'green-lighten-5'"
                  :text-color="darkMode ? 'white' : 'green-darken-2'">Research Data
          </v-chip>
        </div>
      </template>
    </v-card-item>
    <v-card-text>
      <h1 class="text-h5 font-weight-bold mb-2" :class="darkMode ? 'text-white' : 'text-grey-darken-3'">
        {{ title || 'This is an example webpage' }}
      </h1>
      <p class="text-body-2 mb-6" :class="darkMode ? 'text-grey-lighten-1' : 'text-grey-darken-2'">
        {{ description || 'This is an example of how the pid-component can be used within a Next.js app. Demo showcases DOIs (e.g. 10.5281/zenodo.13629109), ORCIDs (e.g. 0009-0005-2800-4833), RORs (e.g. https://ror.org/04t3en479), SPDX licenses (e.g. Apache-2.0), and more.'
        }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn :color="darkMode ? 'blue-lighten-1' : 'primary'" prepend-icon="mdi-download">Download Dataset</v-btn>
      <v-btn :color="darkMode ? 'blue-lighten-1' : 'primary'" prepend-icon="mdi-open-in-new" variant="outlined">View
        Source
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
