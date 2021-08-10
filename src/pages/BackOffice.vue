<template>
  <div class="q-pa-md">
    <q-list padding>
      <q-item-label header class="flex justify-between">
        <span>Menu</span>
        <q-btn color="primary" label="agregar" />
      </q-item-label>
      <template v-for="pizza in pizzas" :key="pizza.name">
        <q-item>
          <q-item-section
            thumbnail
            class="q-ml-none"
            @click="edit = true"
          >
            <q-avatar rounded>
              <img src="pizza.image" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ pizza.name }}</q-item-label>
            <q-item-label>${{ pizza.price }}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <div class="d-flex jusify-content-between">
              <q-btn
                push
                color="info"
                round
                icon="edit"
                @click="edit = true"
              />
              <b class="q-px-sm">{{ pizza.amount }} </b>
              <q-btn
                push
                color="negative"
                round
                icon="delete"
                @click="confirm = true"
              />
            </div>
          </q-item-section>
        </q-item>

        <q-separator spaced />
      </template>
    </q-list>

    <q-dialog v-model="edit">
      <q-card class="my-card bg-white">
        <q-card-section>
          <div class="text-h6">Editar</div>
        </q-card-section>

        <q-card-actions>
          <q-list>
            <q-item clickable>
              <q-item-section>
                <q-input filled v-model="selectedPizza.name" label="Nombre" />
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-input filled v-model="selectedPizza.address" label="precio" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-btn-toggle
                v-model="selectedPizza.active"
                push
                glossy
                toggle-color="primary"
                :options="[
                  {label: 'Desactivado', value: false},
                  {label: 'Activo', value: true}
                ]"
              />
            </q-item>

            <q-file filled v-model="selectedPizza.image" label="Imagen" />

            <q-editor v-model="selectedPizza.detail" min-height="5rem" />

            <q-item clickable>
              <q-btn color="warning" label="Contactar" />
            </q-item>
          </q-list>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are currently not connected to any network.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn label="Eliminar" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { db } from '../db'

export default {
  data() {
    return {
      pizzas: [],
      confirm: false,
      active: true,
      edit: false,
      selectedPizza: {
        name: "",
        amount: 0,
        image: "",
        detail: "",
        price: 0
      }
    }
  },
  methods: {
    getPizzas() {
      db.collection("pizzas").get().then((pizzas) => {
        pizzas.forEach((doc) => {
          this.pizzas.push(doc.data())
        });
      });
    }
  },
  mounted() {
    getPizzas()
  }
}
</script>
