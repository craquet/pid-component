<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, provide, ref, watch } from 'vue';
import {
  AboutPage,
  AppFooter,
  AppNavigation,
  ArticleSection,
  AuthorGrid,
  DatasetsPage,
  DatasetTable,
  DoiCard,
  HeroCard,
  LicenseDialog,
} from './components';
import { initPidDetection, type PidDetectionController } from '@kit-data-manager/pid-component';

const activePage = ref('home');
const darkMode = ref(false);
const articleSectionRef = ref<InstanceType<typeof ArticleSection> | null>(null);
const autodiscoveryController = ref<PidDetectionController | null>(null);

watch(darkMode, (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

const handleNavigate = (page: string) => {
  activePage.value = page;
};

const initAutodetection = () => {
  const articleRoot = articleSectionRef.value?.getRoot();
  if (articleRoot && !autodiscoveryController.value) {
    autodiscoveryController.value = initPidDetection({
      root: articleRoot,
      darkMode: darkMode.value ? 'dark' : 'light',
    });
  }
};

provide('autodiscovery', {
  controller: autodiscoveryController,
  root: articleSectionRef.value?.getRoot() ?? null,
  isActive: autodiscoveryController,
});

onMounted(async () => {
  await nextTick();
  setTimeout(initAutodetection, 100);
});

onUnmounted(() => {
  if (autodiscoveryController.value) {
    autodiscoveryController.value.destroy();
    autodiscoveryController.value = null;
  }
});

const datasets = [
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
];

const authors = [
  { orcid: '0009-0005-2800-4833', name: 'Maximilian Inckmann', institution: 'Karlsruhe Institute of Technology' },
  { orcid: '0000-0001-6575-1022', name: 'Andreas Pfeil', institution: 'Karlsruhe Institute of Technology' },
  { orcid: '0009-0003-2196-9187', name: 'Christopher Raquet', institution: 'Karlsruhe Institute of Technology' },
];
</script>

<template>
  <v-app :dark="darkMode">
    <AppNavigation :active-page="activePage" :dark-mode="darkMode" @navigate="handleNavigate"
                   @update:darkMode="darkMode = $event" />

    <v-main>
      <v-container class="pa-8" fluid>

        <template v-if="activePage === 'home'">
          <v-row class="mb-6">
            <v-col cols="8">
              <HeroCard
                title="This is an example webpage"
                description="This is an example of how the pid-component can be used within a Next.js app. Demo showcases DOIs (e.g. 10.5281/zenodo.13629109), ORCIDs (e.g. 0009-0005-2800-4833), RORs (e.g. https://ror.org/04t3en479), SPDX licenses (e.g. Apache-2.0), and more."
                :dark-mode="darkMode"
              />
            </v-col>
            <v-col cols="4">
              <DoiCard
                license="https://spdx.org/licenses/Apache-2.0"
                value="https://doi.org/10.5281/zenodo.13629109"
                :dark-mode="darkMode"
              />
            </v-col>
          </v-row>

          <DatasetTable :datasets="datasets" :dark-mode="darkMode" class="mb-6" />

          <AuthorGrid :authors="authors" :dark-mode="darkMode" />

          <ArticleSection ref="articleSectionRef" :dark-mode="darkMode" class="mb-6" />

        </template>

        <template v-else-if="activePage === 'datasets'">
          <DatasetsPage :dark-mode="darkMode" />
        </template>

        <template v-else-if="activePage === 'about'">
          <AboutPage />
        </template>

        <LicenseDialog :dark-mode="darkMode" />
      </v-container>
    </v-main>

    <AppFooter :dark-mode="darkMode" />
  </v-app>
</template>
