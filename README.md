# 📊 Social Media Dashboard

Una dashboard moderna, dinamica e responsive per il monitoraggio e la gestione delle performance sui social media.  
Progetto realizzato per l'esame finale del corso **Front-End Development con React**.

---

## ✅ Obiettivi Raggiunti

| Requisito                             | Stato     | Dove si trova                                        |
|---------------------------------------|-----------|------------------------------------------------------|
| **Routing + Layout condiviso**        | ✅ Fatto  | `AppRoutes.jsx` + `DashboardLayout.jsx`             |
| **3+ pagine distinte**                | ✅ Fatto  | `Home.jsx`, `Analytics.jsx`, `Settings.jsx`         |
| **Grafici interattivi (minimo 1)**    | ✅ Fatto  | `Analytics.jsx` (Line, Bar e Area Chart)            |
| **Componente riutilizzabile**         | ✅ Fatto  | `StatCard`, `UserCard`, `MiniWidget`, `DonutChart` |
| **Store centrale globale (Redux)**    | ✅ Fatto  | `store/`, `features/`, `store/store.js`             |
| **Uso di stato globale e locale**     | ✅ Fatto  | Redux + useState per la UI                          |
| **Design responsive**                 | ✅ Fatto  | Mobile-first con Tailwind CSS                       |
| **Dark theme**                        | ✅ Fatto  | Colori scuri + `ThemeToggle.jsx`                   |
| **Icone**                             | ✅ Fatto  | `lucide-react`                                      |
| **Filtro contenuti o dati (Bonus)**   | ✅ Fatto  | `FilterBar`, `GestionePost`, `SocialTable`         |
| **Modal, Toast, Toggle (Bonus)**      | ✅ Fatto  | `Modal`, `ThemeToggle`, interazioni dinamiche       |
| **Animazioni, UI curate (Bonus)**     | ✅ Parzialmente | Hover, transizioni, effetti visivi Tailwind  |

---

## 🧠 Tecnologie Usate

- **React**
- **React Router DOM**
- **Redux Toolkit**
- **Tailwind CSS**
- **Lucide React** (icone)
- **Recharts** (grafici dinamici)
- **Vite** (build & dev server)
- **Mock API** con `JSONPlaceholder`

---

## 📂 Struttura del Progetto

├── public/
├── src/
│ ├── components/ # Componenti riutilizzabili
│ ├── features/ # Slice Redux modulari
│ ├── layouts/ # Layout principale
│ ├── pages/ # Pagine principali
│ ├── routes/ # Gestione routing
│ ├── store/ # Configurazione Redux
│ ├── utils/ # Utility functions
│ ├── index.css # Tailwind + custom CSS
│ └── main.jsx # Entry point



---

## 🧪 Funzionalità Principali

- ✅ Dashboard iniziale con **statistiche generali**
- ✅ **Grafici dinamici** con switch tra Line/Bar/Area
- ✅ **Gestione post, profili, utenti**
- ✅ **Filtro dati** tramite componenti riutilizzabili
- ✅ Modal, toggle tema e interazioni animate
- ✅ Dark mode coerente in tutta l'app
- ✅ Responsive su mobile e desktop

---

## 🚀 Come Avviare il Progetto

```bash
git clone https://github.com/CorinneD-0/social-dashboard
cd social-dashboard
npm install
npm run dev
