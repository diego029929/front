// Animation + données Vue
new Vue({
  el: "#app",
  data() {
    return {
      currentCardBackground: Math.floor(Math.random()* 25 + 1),
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      isCardFlipped: false,
    };
  },
  computed: {
    getCardType () {
      if (/^4/.test(this.cardNumber)) return "visa";
      if (/^(34|37)/.test(this.cardNumber)) return "amex";
      if (/^5[1-5]/.test(this.cardNumber)) return "mastercard";
      if (/^6011/.test(this.cardNumber)) return "discover";
      return "";
    }
  },
  methods: {
    flipCard (status) {
      this.isCardFlipped = status;
    }
  }
});

// Stripe integration
const stripe = Stripe("pk_test_xxx"); // Mets ta clé publique Stripe
const elements = stripe.elements();
const cardElement = elements.create("card", { style: { base: { fontSize: "16px" } } });
cardElement.mount("#card-element");

// Gérer le paiement
document.getElementById("submitBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  // ⚡ Appel à ton backend pour créer un PaymentIntent
  const res = await fetch("http://localhost:4242/create-payment-intent", { method: "POST" });
  const { clientSecret } = await res.json();

  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
      billing_details: {
        name: document.getElementById("cardName").value,
      }
    }
  });

  if (error) {
    alert("Erreur: " + error.message);
  } else if (paymentIntent.status === "succeeded") {
    alert("Paiement réussi !");
  }
});
