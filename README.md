# IMPERIUM — Eventi da Favola · Sito web

Sito statico (HTML + CSS + JavaScript puro), pronto per **GitHub Pages**.
Nessun backend, nessun build, nessuna dipendenza.

---

## 📁 Struttura

```
imperium/
├── index.html
├── css/style.css
├── js/
│   ├── data.js      ← ⭐ TUTTI i dati del sito (modifica QUI)
│   └── app.js       ← logica (non serve toccarla)
├── assets/
│   ├── logo/        ← logo trasparente (PNG), favicon, PDF
│   ├── video/       ← video ottimizzati per il web
│   └── img/         ← poster (fermi immagine dei video)
└── .nojekyll
```

## ✏️ Come modificare testi, numeri, orari

Apri **`js/data.js`**. Tutto è lì, una riga per volta:
telefono, WhatsApp, indirizzo, orari, nomi e descrizioni delle sale, tipi di evento.
Non serve mai toccare `index.html` o il CSS.

Esempi:
- Cambiare il numero WhatsApp → riga `whatsapp: "393335944730"` (formato internazionale, solo cifre).
- Cambiare un orario → nella sezione `orari`, modifica `apre`/`chiude` del giorno.
- Cambiare una descrizione di sala → nella sezione `sale`.

## 🚀 Pubblicazione su GitHub Pages

1. Crea un repository (es. `imperium`) e carica **tutto il contenuto** di questa cartella.
2. `Settings → Pages → Build and deployment → Source: Deploy from a branch`.
3. Branch `main`, cartella `/ (root)` → **Save**.
4. Dopo ~1 minuto il sito è online su `https://<utente>.github.io/imperium/`.

> Il file `.nojekyll` è già incluso: serve a far caricare correttamente le cartelle `assets`.
> Per un dominio tuo (es. `imperiumeventidafavola.it`) aggiungilo in `Settings → Pages → Custom domain`.

## 🎬 Video

Tutti i video della cartella originale sono usati e **già compressi** per il web
(da ~24 MB a ~8,5 MB totali):
- `sfondo.mp4` → sfondo animato della hero (muto, in loop).
- `sala-roma / romani / veliero / balcone.mp4` → le 4 sale (si avviano al tocco).
- `esterno.mp4` → area esterna, **con audio attivabile** dal pulsante in basso a destra.
- `location.mp4` + `eventi.mp4` → galleria "La Location".

## 🖼️ Logo

Lo sfondo bianco è stato rimosso. Nella cartella `assets/logo/`:
- `imperium-logo.png` / `-light.png` → versione scura e versione chiara (per sfondi scuri), trasparenti.
- `favicon.png` → icona del sito.
- `imperium-logo.pdf` / `-black.pdf` → **logo in PDF** per stampa/uso professionale.

---

## 📝 [ASSUNZIONI] da verificare

1. **Coordinate GPS** (`geo` in data.js): approssimate su Teverola (CE). Verifica il pin esatto su Google Maps e aggiorna lat/lng per lo schema SEO.
2. **Orari**: interpretati come **11:00 – 00:00 (mezzanotte) tutti i giorni**, come da Google. Sono usati per l'indicatore "Aperto ora" e per limitare gli orari prenotabili.
3. **Numero WhatsApp**: impostato sul cellulare **333 594 4730**. Le telefonate del pulsante "Chiama" vanno sul **fisso 081 5047065**.
4. **Descrizioni delle sale**: scritte sulla base dei video (atmosfera, allestimenti). Adattale alla capienza/uso reale di ogni sala.
5. **"1000+ eventi realizzati"**: stima celebrativa dei trent'anni di attività — correggi col dato reale se preferisci.
6. **priceRange €€€**: fascia upscale ipotizzata; modificabile nello schema in `app.js`.

## ✅ Checklist (definition of done)

- [x] Render corretto su mobile (390px) e desktop
- [x] Tutti i dati modificabili da un unico file (`data.js`)
- [x] Link Chiama / WhatsApp / Mappa / Social funzionanti
- [x] Indicatore "Aperto ora / Chiuso" calcolato in JS dagli orari
- [x] Le 4 sale (Roma, Romani, Veliero, Balcone) con video
- [x] Video esterno con **attiva/disattiva audio**
- [x] Video "sfondo" come background della hero
- [x] Logo con sfondo rimosso, in PNG trasparente + PDF
- [x] **Preventivo veloce**: evento, invitati, data, nome, cellulare → WhatsApp precompilato
- [x] **Prenotazione consulenza**: form con validazione → WhatsApp
- [x] Validazione campi + messaggi d'errore in italiano
- [x] Stato di conferma onesto ("premi invio su WhatsApp…")
- [x] Barra fissa mobile: Chiama / Preventivo / Prenota
- [x] SEO: title, meta description, Open Graph, schema JSON-LD EventVenue
- [x] Deploy-ready per GitHub Pages (`.nojekyll` incluso)

## ⚠️ 3 modi in cui questo build potrebbe fallire (e come li ho prevenuti)

1. **Autoplay del video bloccato dai browser** → la hero parte **muta** (`muted` + `playsinline`), condizione richiesta per l'autoplay; l'audio dell'esterno si attiva solo su clic dell'utente (gesto esplicito), così non viene mai bloccato.
2. **Cartella `assets` non caricata su GitHub Pages** (Jekyll ignora file/cartelle) → incluso `.nojekyll` per servire tutto correttamente.
3. **Video pesanti su 4G / telefono datato** → video ricompressi (totale ~8,5 MB), le sale caricano `preload="none"` e partono solo al tocco; i poster (immagini leggere) sono mostrati subito. La hero ha un `poster` immediato mentre il video carica.
