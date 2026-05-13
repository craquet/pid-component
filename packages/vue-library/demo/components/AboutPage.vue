<script lang="ts" setup>
import { inject } from 'vue';
import type { PidDetectionController } from '@kit-data-manager/pid-component';

defineProps<{
  darkMode?: boolean;
}>();

const articleRef = inject<{
  controller: PidDetectionController | null;
  root: HTMLElement | null;
  isActive: boolean
}>('autodiscovery');
</script>

<template>
  <div class="mb-8">
    <h2 class="text-h6 font-weight-bold mb-4 d-flex align-center"
        :class="darkMode ? 'text-white' : 'text-grey-darken-3'">
      <v-icon :class="darkMode ? 'text-grey-lighten-1' : 'text-grey-darken-2'" class="mr-2">mdi-information</v-icon>
      About ResearchDemo
      <v-chip class="ml-3" :color="darkMode ? 'success-darken-3' : 'success-lighten-5'"
              :text-color="darkMode ? 'success-lighten-2' : 'success-darken-2'" size="small">
        {{ articleRef?.isActive ? 'Scanning Active' : 'Scanning Inactive' }}
      </v-chip>
    </h2>
    <v-card :color="darkMode ? 'grey-darken-3' : 'white'" class="pa-6" elevation="1">
      <p class="text-body-2 mb-4" :class="darkMode ? 'text-grey-lighten-1' : 'text-grey-darken-1'"
         style="line-height: 1.8;">
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Click the "View License" button below to see how a
        license can be rendered. Demo showcases pid-component integration with Next.js App Router, demonstrating
        seamless display of persistent identifiers including DOIs (e.g. 10.5281/zenodo.13629109), ORCIDs (e.g.
        0009-0005-2800-4833), ROR IDs (e.g. https://ror.org/04t3en479), Handle PIDs (e.g.
        21.T11981/be908bd1-e049-4d35-975e8e27d40117e6), and SPDX license references.
      </p>
      <p class="text-body-2 mb-4" :class="darkMode ? 'text-grey-lighten-1' : 'text-grey-darken-1'"
         style="line-height: 1.8;">
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Portal uses
        <strong> pid-component</strong> to render various PID types with automatic detection
        and resolution from respective registries.
      </p>
      <v-tabs align-tabs="start" color="primary">
        <v-tab :value="'dois'">DOIs</v-tab>
        <v-tab :value="'orcids'">ORCIDs</v-tab>
        <v-tab :value="'handles'">Handles</v-tab>
        <v-tab :value="'rors'">RORs</v-tab>
      </v-tabs>
      <v-window>
        <v-window-item value="dois">
          <div class="pa-4">
            <pid-component class="mb-2" value="10.5281/zenodo.13629109" :dark-mode="darkMode ? 'dark' : 'light'" />
            <pid-component class="mb-2" value="doi:10.5445/IR/1000178054" :dark-mode="darkMode ? 'dark' : 'light'" />
            <pid-component class="mb-2" value="10.52825/ocp.v5i.1411" :dark-mode="darkMode ? 'dark' : 'light'" />
          </div>
        </v-window-item>
        <v-window-item value="orcids">
          <div class="pa-4">
            <pid-component class="mb-2" value="0009-0005-2800-4833" :dark-mode="darkMode ? 'dark' : 'light'" />
            <pid-component class="mb-2" value="0000-0001-6575-1022" :dark-mode="darkMode ? 'dark' : 'light'" />
            <pid-component class="mb-2" value="0009-0003-2196-9187" :dark-mode="darkMode ? 'dark' : 'light'" />
          </div>
        </v-window-item>
        <v-window-item value="handles">
          <div class="pa-4">
            <pid-component class="mb-2" value="21.T11981/be908bd1-e049-4d35-975e8e27d40117e6"
                           :dark-mode="darkMode ? 'dark' : 'light'" />
            <pid-component class="mb-2" value="20.1000/100" :dark-mode="darkMode ? 'dark' : 'light'" />
          </div>
        </v-window-item>
        <v-window-item value="rors">
          <div class="pa-4">
            <pid-component class="mb-2" value="https://ror.org/04t3en479" :dark-mode="darkMode ? 'dark' : 'light'" />
            <pid-component class="mb-2" value="https://spdx.org/licenses/MIT"
                           :dark-mode="darkMode ? 'dark' : 'light'" />
          </div>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>
