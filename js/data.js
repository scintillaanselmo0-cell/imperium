/* =============================================================
   IMPERIUM — Eventi da Favola
   FILE DATI UNICO — modifica QUI tutto il sito.
   Cambia un numero, un orario o un testo su UNA riga:
   non toccare mai l'HTML o il CSS.
   ============================================================= */

window.IMPERIUM = {

  /* ---------- ATTIVITÀ ---------- */
  nome: "IMPERIUM",
  claim: "Eventi da Favola",
  dal: "1992",
  tagline: "Dal 1992 la location perfetta per i tuoi eventi da favola.",

  /* ---------- CONTATTI ---------- */
  telefonoFisso: "081 5047810",
  telefonoFissoLink: "+390815047810",
  cellulare: "333 594 4730",
  // numero usato per WhatsApp (formato internazionale, solo cifre)
  whatsapp: "393335944730",

  indirizzo: "SS 7bis, Km 11.00",
  cap: "81030",
  citta: "Teverola",
  provincia: "CE",
  indirizzoCompleto: "SS 7bis, Km 11.00 — 81030 Teverola (CE)",

  // Coordinate approssimative di Teverola (CE) — [ASSUNZIONE] da verificare col pin reale
  geo: { lat: 40.9962, lng: 14.2074 },

  // Mappa Google (embed) e link "apri in Maps"
  mapEmbed: "https://maps.google.com/maps?q=Imperium%20Eventi%20da%20Favola%20SS%207bis%20Km%2011%20Teverola%20CE&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapLink: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x133afe57e57b2607:0x2185d400701ddadb",

  /* ---------- SOCIAL ---------- */
  instagram: "https://www.instagram.com/imperium_eventidafavola/",
  facebook: "https://www.facebook.com/savaris.teverola/?locale=it_IT",
  recensioniGoogle: "https://www.google.com/search?q=Imperium+Eventi+da+Favola+Recensioni",

  /* ---------- ORARI (contatti/visite) ----------
     formato 24h. chiusura "24:00" = mezzanotte.
     giorni: 0=Domenica ... 6=Sabato                        */
  orari: [
    { g: "Domenica",  apre: "11:00", chiude: "24:00" }, // 0
    { g: "Lunedì",    apre: "11:00", chiude: "24:00" }, // 1
    { g: "Martedì",   apre: "11:00", chiude: "24:00" }, // 2
    { g: "Mercoledì", apre: "11:00", chiude: "24:00" }, // 3
    { g: "Giovedì",   apre: "11:00", chiude: "24:00" }, // 4
    { g: "Venerdì",   apre: "11:00", chiude: "24:00" }, // 5
    { g: "Sabato",    apre: "11:00", chiude: "24:00" }, // 6
  ],

  /* ---------- NUMERI / PUNTI DI FORZA ---------- */
  numeri: [
    { valore: "1992", label: "Dal" },
    { valore: "4", label: "Sale eleganti" },
    { valore: "1000+", label: "Eventi realizzati" },
    { valore: "∞", label: "Ricordi da favola" },
  ],

  /* ---------- LE SALE E GLI SPAZI ----------
     video = file in assets/video/  (lascia "" per uno SLOT VUOTO:
             comparirà il segnaposto "Video in arrivo", basta poi
             incollare qui il percorso del video per attivarlo).
     poster = fermo immagine (opzionale).                           */
  sale: [
    {
      id: "roma",
      nome: "Sala Roma",
      sottotitolo: "Imponente e scenografica",
      descrizione: "La sala più spettacolare: pareti scolpite, giochi di luce e un'atmosfera da grande evento. Pensata per matrimoni e ricevimenti che vogliono lasciare il segno.",
      video: "",                     // SLOT VUOTO — in attesa del nuovo video
      poster: "",
    },
    {
      id: "romani",
      nome: "Sala Romani",
      sottotitolo: "Classica e luminosa",
      descrizione: "Eleganza senza tempo tra toni avorio e dettagli dorati. Una sala versatile e raffinata, perfetta per cerimonie, battesimi e feste di famiglia.",
      video: "assets/video/sala-romani.mp4",
      poster: "assets/img/poster-romani.jpg",
    },
    {
      id: "colosseo",
      nome: "Sala Colosseo",
      sottotitolo: "Grandiosa e monumentale",
      descrizione: "Volumi imponenti e dettagli che evocano la grandezza di Roma. La scelta ideale per ricevimenti scenografici e di grande effetto.",
      video: "assets/video/sala-colosseo.mp4",
      poster: "assets/img/poster-colosseo.jpg",
    },
    {
      id: "archi",
      nome: "Sala Archi",
      sottotitolo: "Elegante e senza tempo",
      descrizione: "Archi raffinati e luce avvolgente per un'atmosfera dal fascino classico. Perfetta per matrimoni e cerimonie da ricordare.",
      video: "assets/video/sala-archi.mp4",
      poster: "assets/img/poster-archi.jpg",
      orizzontale: true,            // video in formato orizzontale (16:9)
    },
    {
      id: "club",
      nome: "Club Imperium",
      sottotitolo: "La sala sotterranea",
      descrizione: "Lo spazio più esclusivo: un ambiente sotterraneo e riservato per feste private, after-dinner e serate a tema.",
      video: "",                     // SLOT VUOTO — in attesa del video
      poster: "",
    },
    {
      id: "ingressi",
      nome: "Gli Ingressi",
      sottotitolo: "Accoglienza monumentale",
      descrizione: "Ingressi imponenti che accolgono gli ospiti con eleganza, preparando la scena del vostro grande evento.",
      video: "",                     // SLOT VUOTO — in attesa del video
      poster: "",
    },
    {
      id: "uffici",
      nome: "Gli Uffici",
      sottotitolo: "Consulenze e preventivi",
      descrizione: "Gli spazi dove accogliervi per consulenze e preventivi, e progettare insieme ogni dettaglio del vostro evento.",
      video: "",                     // SLOT VUOTO — in attesa del video
      poster: "",
    },
  ],

  /* ---------- SOLARIUM (video con audio) ---------- */
  esterno: {
    titolo: "Solarium",
    descrizione: "Sotto le stelle, tra luci sospese e palme: lo spazio all'aperto di IMPERIUM trasforma aperitivi, cerimonie e feste in un'esperienza indimenticabile.",
    video: "assets/video/esterno.mp4",
    poster: "assets/img/poster-esterno.jpg",
  },

  /* ---------- GALLERY / LA LOCATION ---------- */
  gallery: [
    { titolo: "La Location", video: "assets/video/location.mp4", poster: "assets/img/poster-location.jpg" },
    { titolo: "I Nostri Eventi", video: "assets/video/eventi.mp4", poster: "assets/img/poster-eventi.jpg" },
  ],

  /* ---------- TIPI DI EVENTO (preventivo) ---------- */
  tipiEvento: [
    "Matrimonio",
    "Battesimo",
    "Comunione / Cresima",
    "Compleanno",
    "Anniversario",
    "Laurea",
    "Evento aziendale",
    "Cena di gala",
    "Altro",
  ],
};
