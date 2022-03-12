<template>
  <div class="q-pa-md">
    <q-pull-to-refresh @refresh="getPizzas">
      <q-list padding>
        <q-item-label header class="flex justify-between"><span>Productos</span>  <b>$ {{ totalPrice }}</b></q-item-label>
        <template v-for="(sortedPizzas, category) in sortedByCategories" :key="category">
          <q-item-label header class="flex justify-between" v-if="sortedPizzas.filter(pizza => pizza.category === category && pizza.active).length">
            <span>{{ category }}</span>
          </q-item-label>
          <template v-for="pizza in sortedPizzas" :key="pizza.name">
            <q-item v-if="pizza.active">
              <q-item-section
                thumbnail
                class="q-ml-none"
                @click="(selectedPizza = pizza), (detail = true)"
              >
                <img
                  :src="pizza.image"
                  fit="contain"
                  style="max-width: 96px; height: 96px;"
                  class="rounded-borders"
                  rounded
                />
              </q-item-section>

              <q-item-section @click="(selectedPizza = pizza), (detail = true)">
                <q-item-label>{{ pizza.name }}</q-item-label>
                <q-item-label>${{ pizza.price }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="d-flex jusify-content-between">
                  <q-btn
                    push
                    :color="theme.primary"
                    round
                    icon="remove_circle_outline"
                    @click="decrement(pizza)"
                  />
                  <b class="q-px-sm"> {{ pizza.amount }} </b>
                  <q-btn
                    push
                    :color="theme.primary"
                    round
                    icon="control_point"
                    @click="increment(pizza)"
                  />
                </div>
              </q-item-section>
            </q-item>

            <q-separator spaced />
          </template>
        </template>
      </q-list>
      <q-btn
        :color="theme.primary"
        :text-color="theme.light"
        label="Contactar"
        @click="form = true"
        :disable="totalPizzaAmount === 0"
      />
    </q-pull-to-refresh>
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
              <q-btn
                :color="theme.primary" label="Contactar"
                @click="buy"
                :disable="name && address"
              />
            </q-item>
          </q-list>
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
import { theme } from '../utils/theme'
import { db } from '../db'

export default {
  data() {
    return {
      // whatsappURL: "https://api.whatsapp.com/send?phone=584141113126&text=",
      form: false,
      detail: false,
      selectedPizza: {
        name: "Margarita",
        amount: 0,
        image: "/assets/margarita.jpg",
        detail: ``,
      },
      name: "",
      address: "",
      pizzas: [],
      phoneNumber: process.env.VUE_APP_PHONE_NUMBER,
      theme
    };
  },
  computed: {
    whatsappMessage() {
      let message = `%0AMe llamo%0A *${this.name}*, quiero:%0A`;

      this.pizzas.forEach(({ name, amount }) => {
        amount ? (message += `*${name}:* ${amount}%0A`) : "";
      });

      return `${message}%0A*Dirección*: ${this.address}`;
    },
    totalPizzaAmount() {
      const amounts = this.pizzas.map(({ amount }) => amount);
      return amounts.reduce((total, amount) => total + amount, 0);
    },
    totalPrice() {
      const prices = this.pizzas.map(({ amount, price }) => amount && (price * amount));
      return prices.reduce((total, amount) => total + amount, 0);
    },
    whatsappURL() {
      return (
        "https://api.whatsapp.com/send?phone=" + this.phoneNumber + "&text="
      );
    },
    categories() {
      const pizzasCategories = this.pizzas.map(pizza => pizza.category)
      return [...new Set([...pizzasCategories])]
    },
    sortedByCategories() {
      const sortedItems = {}
      this.categories.forEach(category => {
        sortedItems[category] = this.pizzas
          .filter(pizza => category === pizza.category)
      })
      return sortedItems
    }
  },
  methods: {
    increment(pizza) {
      pizza.amount = pizza.amount + 1;
    },
    decrement(pizza) {
      pizza.amount = pizza.amount && pizza.amount - 1;
    },
    buy() {
      window.open(
        this.whatsappURL + "Hi%20%Tiendi%20" + this.whatsappMessage,
        "_blank"
      );
    },
    async getPizzas(done) {
      this.$q.loading.show()
      const pizzas = await db.collection(process.env.VUE_APP_FIRESTORE_COLLECTION).get()
      this.pizzas = []
      pizzas.forEach((doc) => {
        const pizza = { id: doc.id, ...doc.data(), amount: 0 }
        this.pizzas.push(pizza)
      });
      console.log(this.pizzas)
      this.$q.loading.hide()
      done && done()
    },
    sendImageToWhatsapp() {
      const { image } = this.selectedPizza;
      window.open(
        "https://api.whatsapp.com/send?phone=" +
          this.phoneNumber +
          "&text=" +
          encodeURIComponent(image),
        "_blank"
      );
    },
  },
  mounted() {
    this.getPizzas()
  }
};
</script>
