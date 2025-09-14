import React, { useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: 'prod_sample_1' }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No session URL returned', data);
        alert('Impossible de créer la session de paiement');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 32 }}>
      <h1>Produit : T-shirt cool</h1>
      <p>Prix : 25,00 €</p>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Redirection...' : "Payer via Stripe"}
      </button>
      <p style={{ marginTop: 16 }}>
        Après le paiement vous serez redirigé vers une page de succès.
      </p>
    </div>
  );
}
