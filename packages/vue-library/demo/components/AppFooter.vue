<script lang="ts" setup>
import { PidComponent } from '../../lib';
</script>

<template>
  <v-footer class="pa-0" color="grey-lighten-4">
    <v-container class="py-6" fluid>
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <v-btn icon size="small" variant="text">
            <v-icon color="grey-darken-2">mdi-database</v-icon>
          </v-btn>
          <span class="text-body-1 font-weight-bold text-black">Lorem ipsum</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="text-body-2 text-grey" style="white-space: nowrap;">Powered by</span>
          <div style="flex: 1; min-width: 0;">
            <pid-component :emphasize-component="false" :hide-subcomponents="true" style="display: block;"
                           value="https://ror.org/04t3en479" />
          </div>
        </div>
      </div>
    </v-container>
  </v-footer>
</template>
