<template>
  <div class="q-pa-md">
    <q-list padding>
      <q-item-label header>Menu</q-item-label>
      <template v-for="pizza in pizzas" :key="pizza.name">
        <q-item>
          <q-item-section
            thumbnail
            class="q-ml-none"
            @click="(selectedPizza = pizza), (detail = true)"
          >
            <q-avatar rounded>
              <img :src="pizza.image" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ pizza.name }}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <div class="d-flex jusify-content-between">
              <q-btn
                push
                color="warning"
                round
                icon="remove_circle_outline"
                @click="decrement(pizza)"
              />
              <b class="q-px-sm"> {{ pizza.amount }} </b>
              <q-btn
                push
                color="warning"
                round
                icon="control_point"
                @click="increment(pizza)"
              />
            </div>
          </q-item-section>
        </q-item>

        <q-separator spaced />
      </template>
    </q-list>
    <q-btn
      color="warning"
      label="Contactar"
      @click="form = true"
      :disable="totalPizzaAmount === 0"
    />

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
              <q-btn color="warning" label="Contactar" @click="buy" />
            </q-item>
          </q-list>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="detail">
      <q-card class="my-card">
        <q-img :src="selectedPizza.image">
          <div class="absolute-bottom text-h6">{{ selectedPizza.name }}</div>
        </q-img>
        <q-card-section>{{ selectedPizza.detail }}</q-card-section
        ><q-card-actions align="right">
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
        detail: `alksndlkansdlkansdlknasda alksdjlkas
           a sjdajs dlak jsdlakjds alksjd`,
      },
      name: "",
      address: "",
      pizzas: [
        {
          name: "Margarita",
          amount: 0,
          image: "/assets/margarita.jpg",
          detail:
            "alksndlkansdlkansdlknasda alksdjlkas a sjdajs dlak jsdlakjds alksjd",
        },
        {
          name: "Peperoni",
          amount: 0,
          image: "/assets/pepperoni.jpg",
          detail:
            "alksndlkansdlkansdlknasda alksdjlkas a sjdajs dlak jsdlakjds alksjd",
        },
        {
          name: "American Rush",
          amount: 0,
          image: "/assets/americanrush.jpg",
          detail:
            "alksndlkansdlkansdlknasda alksdjlkas a sjdajs dlak jsdlakjds alksjd",
        },
        {
          name: "Primavera",
          amount: 0,
          image: "/assets/primavera.jpg",
          detail:
            "alksndlkansdlkansdlknasda alksdjlkas a sjdajs dlak jsdlakjds alksjd",
        },
        {
          name: "Chorikramel",
          amount: 0,
          image: "/assets/chorikramel.jpg",
          detail:
            "alksndlkansdlkansdlknasda alksdjlkas a sjdajs dlak jsdlakjds alksjd",
        },
      ],
      phoneNumber: "584122566503",
    };
  },
  computed: {
    whatsappMessage() {
      let message = `%0AMe llamo ${this.name}, quiero:%0A`;

      this.pizzas.forEach(({ name, amount }) => {
        amount ? (message += `*${name}:* ${amount}%0A`) : "";
      });

      return `${message}%0A*Dirección*: ${this.address}`;
    },
    totalPizzaAmount() {
      const amounts = this.pizzas.map(({ amount }) => amount);
      return amounts.reduce((total, amount) => total + amount);
    },
    whatsappURL() {
      return (
        "https://api.whatsapp.com/send?phone=" + this.phoneNumber + "&text="
      );
    },
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
        this.whatsappURL + "Hi%20%40ktia.ccs%20" + this.whatsappMessage,
        "_blank"
      );
    },
    sendImageToWhatsapp() {
      const { image } = this.selectedPizza;
      const img = image.substring(1, image.length);
      window.open(
        "https://api.whatsapp.com/send?phone=" +
          this.phoneNumber +
          "&text=" +
          window.location.href +
          encodeURIComponent(img),
        "_blank"
      );
    },
  },
};
</script>
