project/
├── backend/               # Backend Node.js
│   ├── server.js          # Serverul Express
│   ├── routes/            # Rutele API
│   │   └── sync.js        # Rute pentru sincronizare
│   ├── models/            # Modele de baze de date (MongoDB)
│   │   └── user.js        # Model pentru utilizatori
│   └── db/                # Configurare conexiune DB
│       └── mongo.js       # Conexiunea la MongoDB
├── frontend/              # Aplicația Electron.js
│   ├── main.js            # Procesul principal al Electron.js
│   ├── index.html         # Interfața UI
│   ├── renderer.js        # Logica pentru interfață (IndexedDB)
│   └── styles.css         # Stilizare UI
└── package.json           # Fișierul principal al proiectului


