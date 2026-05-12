<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, provide, ref } from 'vue';
import {
  initPidDetection,
  type PidDetectionConfig,
  type PidDetectionController,
} from '@kit-data-manager/pid-component';

const props = withDefaults(defineProps<{
  config?: PidDetectionConfig;
  standalone?: boolean;
  darkMode?: boolean;
}>(), {
  standalone: true,
});

const articleRef = ref<HTMLElement | null>(null);
const isInitialized = ref(false);

interface AutodiscoveryProvider {
  controller: PidDetectionController | null;
  root: HTMLElement | null;
  isActive: boolean;
}

let controller: PidDetectionController | null = null;

const initAutodetection = () => {
  if (articleRef.value && !controller) {
    controller = initPidDetection({
      root: articleRef.value,
      darkMode: props.darkMode ? 'dark' : 'light',
      emphasizeComponent: false,
      ...props.config,
    });
    isInitialized.value = true;

    provide<AutodiscoveryProvider>('autodiscovery', {
      get controller() {
        return controller;
      },
      get root() {
        return articleRef.value;
      },
      get isActive() {
        return isInitialized.value;
      },
    });
  }
};

onMounted(async () => {
  await nextTick();
  if (props.standalone) {
    initAutodetection();
  }
});

onUnmounted(() => {
  if (controller && props.standalone) {
    controller.destroy();
    controller = null;
    isInitialized.value = false;
  }
});

defineExpose({
  initAutodetection,
  isInitialized,
  getRoot: () => articleRef.value,
});
</script>

<template>
  <div class="mb-8">
    <h2 class="text-h6 font-weight-bold mb-4 d-flex align-center"
        :class="darkMode ? 'text-white' : 'text-grey-darken-3'">
      <v-icon :color="darkMode ? 'success' : 'success'" class="mr-2">mdi-file-document</v-icon>
      Lorem ipsum dolor sit amet
      <v-chip
        :color="isInitialized ? 'success-lighten-5' : 'error-lighten-5'"
        :text-color="isInitialized ? 'success-darken-2' : 'error-darken-2'"
        class="ml-3"
        size="small"
      >
        {{ isInitialized ? 'Autodetection Active' : 'Autodetection Inactive' }}
      </v-chip>
    </h2>
    <div ref="articleRef">
      <v-card :color="darkMode ? 'grey-darken-3' : 'white'" class="pa-6" elevation="1">
        <p class="text-body-2 mb-4" :class="darkMode ? 'text-grey-lighten-1' : 'text-grey-darken-1'"
           style="line-height: 1.8;">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Dataset created as part of project
          <strong>21.T11981/be908bd1-e049-4d35-975e-8e27d40117e6</strong> and hosted at
          the <strong>https://ror.org/04t3en479</strong> research institution. Previous findings published
          in DOI <strong>10.1109/eScience.2024.1042</strong> extend methodology to Handle System resolutions.
        </p>
        <p class="text-body-2 mb-4" :class="darkMode ? 'text-grey-lighten-1' : 'text-grey-darken-1'"
           style="line-height: 1.8;">
          Contact corresponding author at <strong>someone@example.com</strong>. Analysis framework available under
          <strong>https://spdx.org/licenses/Apache-2.0</strong> for reuse. Research conducted at institution
          associated with ROR <strong>https://ror.org/04t3en479</strong>.
        </p>
        <p class="text-body-2 mb-4" :class="darkMode ? 'text-grey-lighten-1' : 'text-grey-darken-1'"
           style="line-height: 1.8;">
          Published in multiple venues including Handle System <strong>20.1000/100</strong> and DOI
          <strong>10.1016/j.future.2025.01.004</strong>. Related works include ISBN
          <strong>978-3-642-54441-6</strong> and ISSN <strong>2041-1723</strong> for the journal.
        </p>
        <p class="text-body-2" :class="darkMode ? 'text-grey-lighten-1' : 'text-grey-darken-1'"
           style="line-height: 1.8;">
          Handle identifier <strong>20.1000/100</strong> resolves to Handle system documentation.
          Research data archived at <strong>https://doi.org/10.5281/zenodo.1234567</strong>.
        </p>
      </v-card>
    </div>
  </div>
</template>
