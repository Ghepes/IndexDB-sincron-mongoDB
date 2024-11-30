// Inițializare IndexedDB
let db;
const request = indexedDB.open("UserDB", 1);

request.onupgradeneeded = (event) => {
  db = event.target.result;
  db.createObjectStore("users", { keyPath: "email" });
};

request.onsuccess = (event) => {
  db = event.target.result;
};

// Adaugă utilizator local
const addUserLocal = (user) => {
  const transaction = db.transaction(["users"], "readwrite");
  const store = transaction.objectStore("users");
  store.put(user);
};

// Sincronizare cu backend
const syncWithBackend = async () => {
  const transaction = db.transaction(["users"], "readonly");
  const store = transaction.objectStore("users");

  const request = store.getAll();
  request.onsuccess = async () => {
    const users = request.result;

    for (const user of users) {
      await fetch('http://localhost:5000/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
    }

    console.log('Sync complete');
  };
};

// Exemplu utilizare
document.getElementById('syncButton').addEventListener('click', syncWithBackend);
