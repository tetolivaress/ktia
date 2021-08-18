<template>
  <div class="q-pa-md">
    <q-list padding>
      <q-item-label header class="flex justify-between">
        <span>Menu</span>
        <q-btn color="primary" label="agregar" @click="onReset(), form = true"/>
      </q-item-label>
      <template v-for="pizza in pizzas" :key="pizza.name">
        <q-item>
          <q-item-section
            thumbnail
            class="q-ml-none"
            @click="edit = true"
          >
            <q-avatar rounded @click="detail = true, selectedPizza = pizza">
              <img :src="pizza.image" />
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
                @click="form = true, selectedPizza = pizza, edit = true, selectedPizza.id = pizza.id"
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

    <q-dialog v-model="form" @hide="edit = false">
      <q-card class="my-card bg-white">
        <q-form @submit="onSubmit" @reset="onReset">
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
                  <q-input filled v-model="selectedPizza.price" label="precio" />
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

              <q-file filled v-model="image" label="Imagen" />

              <q-editor v-model="selectedPizza.detail" min-height="5rem" />

              <q-item clickable>
                <q-btn color="warning" label="editar" v-if="edit" @click="updatePizzas(selectedPizza.id)"/>
                <q-btn label="Crear" type="submit" color="primary" v-else/>
                <q-spinner-hourglass color="primary" size="2em" v-if="loading"/>
              </q-item>
            </q-list>
          </q-card-actions>
        </q-form>
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

    <q-dialog v-model="detail" transition-show="flip-left" transition-hide="flip-right">
      <q-card class="my-card" style="width: 720px;">
        <q-img :src="selectedPizza.image">
          <div class="absolute-bottom text-h6">{{ selectedPizza.name }}</div>
        </q-img>
        <q-card-section v-html="selectedPizza.detail" />
          <q-card-actions align="right">
          <q-btn
            flat
            round
            color="red"
            icon="share"
            @click="sendImageToWhatsapp"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>
<script>
import { db } from '../db'
import readFileAsync from '../utils/FileReader'
import resizeImage from '../utils/ImageReader'
import firebase from 'firebase/app'
import 'firebase/storage'

export default {
  data() {
    return {
      detail: false,
      edit: false,
      pizzas: [],
      confirm: false,
      active: true,
      form: false,
      image: undefined,
      loading: false,
      selectedPizza: {
        id: '',
        name: "",
        image: "",
        detail: "",
        price: 0,
        active: true
      }
    }
  },
  watch: {
    async image(file) {
      try{
        const fileB64 = await readFileAsync(file)
        const image = await resizeImage(fileB64)
        this.selectedPizza.image = image
      }catch (error) {
        alert('Los archivos solo pueden ser tipo JPEG, JPG ó PNG')
      }
    },
    selectedPizza (pizza) {
      console.log(pizza)
    }
  },
  methods: {
    async getPizzas() {
      const pizzas = await db.collection("pizzas").get()
      this.pizzas = []
      pizzas.forEach((doc) => {
        const pizza = { id: doc.id, ...doc.data() }
        this.pizzas.push(pizza)
      });
    },
    onReset () {
      this.selectedPizza.name = ''
      this.selectedPizza.detail = ''
      this.selectedPizza.price = 0
      this.selectedPizza.active = true
      this.selectedPizza.image = ''
    },
    async onSubmit () {
      //db.collection('pizzas').add(this.selectedPizza).then(()=>this.getPizzas())
      const refStorage = firebase.storage().ref(`pizzas/${this.image.name}`)
      const snapshot = await refStorage.putString(this.selectedPizza.image, 'data_url')
      const image = await snapshot.ref.getDownloadURL()
      delete this.selectedPizza.image
      await db.collection('pizzas').add({ ...this.selectedPizza, image })
      this.getPizzas()
    },
    async updatePizzas (pizza) {
      console.log(pizza)
      this.loading = true
      const refStorage = firebase.storage().ref(`pizzas/${this.image.name}`)
      const snapshot = await refStorage.putString(this.selectedPizza.image, 'data_url')
      const image = await snapshot.ref.getDownloadURL()
      delete this.selectedPizza.image
      await db.collection('pizzas').doc(pizza).update({ ...this.selectedPizza, image })
      await this.getPizzas()
      this.form = false
      this.loading = false
    }
  },
  mounted() {
    this.getPizzas()
  }
}
</script>
