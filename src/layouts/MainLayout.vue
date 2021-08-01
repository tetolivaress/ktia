<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-warning">
      <q-toolbar>
        <q-toolbar-title>
          Katia App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
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
      }
    }
  }
})
</script>
