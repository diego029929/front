import React, { useEffect, useState } from 'react';

export default function Success() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const session_id = params.get('session_id');
    if (session_id) {
      fetch(`http://localhost:4242/session?session_id=${session_id}`)
        .then((r) => r.json())
        .then(setSession)
        .catch(console.error);
    }
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h1>Paiement réussi ✅</h1>
      <p>Merci pour votre achat.</p>
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </div>
  );
}
