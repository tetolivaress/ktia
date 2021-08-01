<template>
  <div class="q-pa-md">
    <q-list padding>
      <q-item-label header>Menu</q-item-label>
      <template v-for="pizza in pizzas"  :key="pizza.name">
        <q-item>
          <q-item-section top thumbnail class="q-ml-none">
            <div>
              <img :src="pizza.image">
            </div>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ pizza.name }}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <div class="d-flex jusify-content-between">
              <q-btn push color="warning" round icon="remove_circle_outline" @click="decrement(pizza)" />
              <b class="q-px-sm"> {{ pizza.amount }} </b>
              <q-btn push color="warning" round icon="control_point" @click="increment(pizza)"/>
            </div>
          </q-item-section>
        </q-item>

        <q-separator spaced />
      </template>
    </q-list>
    <q-btn color="warning" label="Contactar" @click="form = true"/>

    <q-dialog v-model="form">
      <q-card class="my-card bg-white">
      <q-card-section>
        <div class="text-h6">Contacto</div>
      </q-card-section>

      <q-card-actions>
      <q-list>
        <q-item clickable>
          <q-item-section>
            <q-input filled v-model="name" label="Nombre" />
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>
            <q-input filled v-model="address" label="Dirección" />
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-btn color="warning" label="Contactar" @click="buy"/>
        </q-item>
      </q-list>
      </q-card-actions>
    </q-card>
    </q-dialog>

  </div>
</template>

<script>

export default {
  data () {
    return {
      whatsappURL: 'https://api.whatsapp.com/send?phone=584141113126&text=Hi%20%40ktia.ccs%20',
      form: false,
      name: '',
      address: '',
      pizzas: [
        {
          name: 'Margarita',
          amount: 0,
          image: '/assets/margarita.jpg'
        },
        {
          name: 'Peperoni',
          amount: 0,
          image: '/assets/pepperoni.jpg'
        },
        {
          name: 'Amarican Rush',
          amount: 0,
          image: '/assets/americanrush.jpg'
        },
        {
          name: 'Primavera',
          amount: 0,
          image: '/assets/primavera.jpg'
        }
      ]
    }
  },
  computed: {
    whatsappMessage () {
      let message = `me llamo ${this.name}, me interesan: `

      this.pizzas.forEach(({ name, amount }) => {
        amount ? message += `${amount} ${name} - ` : ''
      })

      return `${message} dirección: ${this.address}`
    }
  },
  methods: {
    increment (pizza) {
      pizza.amount = pizza.amount + 1
    },
    decrement (pizza) {
      pizza.amount = pizza.amount && pizza.amount - 1
    },
    buy () {
      window.open(this.whatsappURL+this.whatsappMessage, "_blank");
    }
  }
}
</script>
