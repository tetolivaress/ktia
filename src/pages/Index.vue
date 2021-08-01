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
    <q-btn color="warning" label="Contactar" @click="buy"/>

  </div>
</template>

<script>

export default {
  data () {
    return {
      whatsappURL: 'https://api.whatsapp.com/send?phone=584141113126&text=Hi%20%40ktia.ccs%20',
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
      let message = ''

      this.pizzas.forEach(({ name, amount }) => {
        amount ? message += `${name}: ${amount} \n` : ''
      })

      return message
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
