<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated :class="`bg-${theme.light}`">
      <q-toolbar>
        <q-img src="../assets/tiendi.png" class="rounded-borders" width="36px" />
        <q-icon name="fab fa-instagram" />
        <q-toolbar-title :class="`text-${theme.dark}`">
          {{ theme.businessName }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="q-pa-sm" :class="`text-${theme.dark} bg-${theme.light}`">
      <span class="float-right">{{ theme.businessName }}</span>
    </q-footer>
  </q-layout>
</template>

<script>
import { theme } from '../utils/theme'
const linksList = [
  {
    title: 'Whatsapp',
    caption: '',
    icon: 'school',
    link: 'https://api.whatsapp.com/send?phone=584141113126&text=Hi%20%40ktia.ccs%20me%20llamo%3A%20'
  },
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(true)


    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      theme,
    }
  }
})
</script>
