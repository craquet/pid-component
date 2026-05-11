<script lang="ts" setup>
import { inject, ref } from 'vue';
import type { PidDetectionController } from '@kit-data-manager/pid-component';

defineProps<{
  excludeArticleRef?: boolean;
}>();

const articleRef = inject<{
  controller: PidDetectionController | null;
  root: HTMLElement | null;
  isActive: boolean
}>('autodiscovery');

const headers = [
  { title: 'ID', key: 'id', align: 'start' as const },
  { title: 'Title', key: 'title', align: 'start' as const },
  { title: 'DOI', key: 'doi', align: 'start' as const },
  { title: 'License', key: 'license', align: 'start' as const },
];

const datasets = ref([
  {
    id: '1',
    title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    doi: 'doi:10.5445/IR/1000178054',
    license: 'https://spdx.org/licenses/MIT',
  },
  {
    id: '2',
    title: 'Sed do eiusmod tempor incididunt ut labore et dolore',
    doi: '10.52825/ocp.v5i.1411',
    license: 'CC-BY4.0',
  },
  {
    id: '3',
    title: 'Ut enim ad minim veniam quis nostrud exercitation',
    doi: 'https://doi.org/10.5281/zenodo.13629109',
    license: 'Apache-2.0',
  },
  {
    id: '4',
    title: 'An example Handle FDO with some nice contents',
    doi: '21.T11981/be908bd1-e049-4d35-975e-8e27d40117e6',
    license: 'CC-BY4.0',
  },
  {
    id: '5',
    title: 'An example of a very large record',
    doi: '21.T11981/5760c10e-6e64-41ea-824e-8dd4d3d2145d',
    license: 'CC-BY4.0',
  },
]);
</script>

<template>
  <div class="mb-8">
    <h2 class="text-h6 font-weight-bold mb-4 d-flex align-center">
      <v-icon class="mr-2" color="primary">mdi-database</v-icon>
      Lorem ipsum dolor sit amet
      <v-chip class="ml-3" color="primary-lighten-5" size="small" text-color="primary-darken-2">
        {{ articleRef?.isActive ? 'Scanning Active' : 'Scanning Inactive' }}
      </v-chip>
    </h2>
    <v-card class="pa-6" elevation="1">
      <v-data-table
        :headers="headers"
        :items="datasets"
        :items-per-page="5"
        class="elevation-0"
      >
        <template v-slot:item.doi="{ item }">
          <pid-component :open-by-default="false" :value="item.doi" />
        </template>
        <template v-slot:item.license="{ item }">
          <pid-component :open-by-default="false" :value="item.license" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
