<script lang="ts" setup>

defineProps<{
  title?: string;
  description?: string;
  doi?: string;
}>();
</script>

<template>
  <v-card class="fill-height" elevation="1">
    <v-card-item>
      <template #prepend>
        <div class="d-flex gap-2">
          <v-chip color="blue-lighten-5" size="small" text-color="blue-darken-2">DOI</v-chip>
          <v-chip color="green-lighten-5" size="small" text-color="green-darken-2">Research Data</v-chip>
        </div>
      </template>
    </v-card-item>
    <v-card-text>
      <h1 class="text-h5 font-weight-bold mb-2 text-grey-darken-3 dark:text-white">
        {{ title || 'This is an example webpage' }}
      </h1>
      <p class="text-body-2 text-grey mb-6">
        {{ description || 'This is an example of how the pid-component can be used within a Next.js app. Demo showcases DOIs (e.g. 10.5281/zenodo.13629109), ORCIDs (e.g. 0009-0005-2800-4833), RORs (e.g. https://ror.org/04t3en479), SPDX licenses (e.g. Apache-2.0), and more.'
        }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" prepend-icon="mdi-download">Download Dataset</v-btn>
      <v-btn prepend-icon="mdi-open-in-new" variant="outlined">View Source</v-btn>
    </v-card-actions>
  </v-card>
</template>
