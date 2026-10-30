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
  telefonoFisso: "081 5047065",
  telefonoFissoLink: "+390815047065",
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
  mapLink: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x133afe57e57b2607:0x2185d400701ddadb?sa=X&ved=1t:8290&ictx=111",

  /* ---------- SOCIAL ---------- */
  instagram: "https://www.instagram.com/imperium_eventidafavola/",
  facebook: "https://www.facebook.com/savaris.teverola/?locale=it_IT",
  recensioniGoogle: "https://www.google.com/search?q=Imperium+Eventi+da+Favola+Recensioni",

  /* ---------- CREDITO AUTORE (riutilizzabile su ogni sito) ---------- */
  autore: {
    nome: "SCINTILLA.DIGITAL.WEB",
    instagram: "https://www.instagram.com/scintilla.digital.web",
    email: "scintillaanselmo0@gmail.com",
    telefono: "3762474257",            // link tel: (+39)
  },

  /* ---------- DATI LEGALI (footer a norma + privacy) ---------- */
  legale: {
    ragioneSociale: "EVENTI DA FAVOLA S.R.L.",
    formaGiuridica: "Società a responsabilità limitata",
    piva: "04260740610",
    cf: "04260740610",
    sedeLegale: "Via Aldo Moro 73, 81031 Aversa (CE)",
    rea: "CE - 312056",
    cciaa: "Caserta",
    capitaleSociale: "€ 10.000,00 i.v.",
    pec: "eventidafavola@legalmail.it",
    titolare: "Michele Dello Iacono",   // Titolare del trattamento / Rappresentante legale
  },

  /* ---------- ORARI (contatti/visite) ----------
     formato 24h (es. apertura 11:00, chiusura 21:30).
     giorni: 0=Domenica ... 6=Sabato                        */
  orari: [
    { g: "Domenica",  apre: "11:00", chiude: "21:30" }, // 0
    { g: "Lunedì",    apre: "11:00", chiude: "21:30" }, // 1
    { g: "Martedì",   apre: "11:00", chiude: "21:30" }, // 2
    { g: "Mercoledì", apre: "11:00", chiude: "21:30" }, // 3
    { g: "Giovedì",   apre: "11:00", chiude: "21:30" }, // 4
    { g: "Venerdì",   apre: "11:00", chiude: "21:30" }, // 5
    { g: "Sabato",    apre: "11:00", chiude: "21:30" }, // 6
  ],

  /* ---------- NUMERI / PUNTI DI FORZA ---------- */
  numeri: [
    { valore: "1992", label: "Dal" },
    { valore: "4", label: "Sale eleganti" },
    { valore: "1000+", label: "Eventi realizzati" },
    { valore: "∞", label: "Ricordi da favola" },
  ],

  /* ---------- LE SALE E GLI SPAZI ----------
     video   = clip di copertina dello slot (autoplay muto).
     poster  = fermo immagine (opzionale).
     galleria= elenco di foto/video mostrati cliccando lo slot.
               Aggiungi qui nuovi file (foto .jpg/.png o video .mp4):
               "assets/img/roma-1.jpg", "assets/video/roma-2.mp4", ...   */
  sale: [
    {
      id: "roma",
      nome: "Sala Roma",
      sottotitolo: "Imponente e scenografica",
      descrizione: "La sala più spettacolare: pareti scolpite, giochi di luce e un'atmosfera da grande evento. Pensata per matrimoni e ricevimenti che vogliono lasciare il segno.",
      video: "assets/video/sala-roma.mp4",
      poster: "assets/img/poster-roma.jpg",
      galleria: ["assets/video/sala-roma.mp4"],
    },
    {
      id: "romani",
      nome: "Sala Romani",
      sottotitolo: "Classica e luminosa",
      descrizione: "Eleganza senza tempo tra toni avorio e dettagli dorati. Una sala versatile e raffinata, perfetta per cerimonie, battesimi e feste di famiglia.",
      video: "assets/video/sala-romani.mp4",
      poster: "assets/img/poster-romani.jpg",
      galleria: ["assets/video/sala-romani.mp4"],
    },
    {
      id: "colosseo",
      nome: "Sala Colosseo",
      sottotitolo: "Grandiosa e monumentale",
      descrizione: "Volumi imponenti e dettagli che evocano la grandezza di Roma. La scelta ideale per ricevimenti scenografici e di grande effetto.",
      video: "assets/video/sala-colosseo.mp4",
      poster: "assets/img/poster-colosseo.jpg",
      galleria: ["assets/video/sala-colosseo.mp4"],
    },
    {
      id: "archi",
      nome: "Sala Archi",
      sottotitolo: "Elegante e senza tempo",
      descrizione: "Archi raffinati e luce avvolgente per un'atmosfera dal fascino classico. Perfetta per matrimoni e cerimonie da ricordare.",
      video: "assets/video/sala-archi.mp4",
      poster: "assets/img/poster-archi.jpg",
      orizzontale: true,            // video in formato orizzontale (16:9)
      galleria: ["assets/video/sala-archi.mp4"],
    },
    {
      id: "ingressi",
      nome: "Gli Ingressi",
      sottotitolo: "Accoglienza monumentale",
      descrizione: "Ingressi imponenti che accolgono gli ospiti con eleganza, preparando la scena del vostro grande evento.",
      video: "assets/video/sala-ingressi.mp4",
      poster: "assets/img/poster-ingressi.jpg",
      galleria: ["assets/video/sala-ingressi.mp4"],
    },
    {
      id: "uffici",
      nome: "Gli Uffici",
      sottotitolo: "Consulenze e preventivi",
      descrizione: "Gli spazi dove accogliervi per consulenze e preventivi, e progettare insieme ogni dettaglio del vostro evento.",
      video: "assets/video/sala-uffici.mp4",
      poster: "assets/img/poster-uffici.jpg",
      galleria: ["assets/video/sala-uffici.mp4"],
    },
    {
      id: "eventi",
      nome: "Eventi",
      sottotitolo: "I momenti da favola",
      descrizione: "Matrimoni, cerimonie e grandi feste: un assaggio degli eventi realizzati da IMPERIUM. Guarda i video per vivere l'atmosfera.",
      video: "assets/video/eventi-copertina.mp4",
      poster: "assets/img/poster-eventi-slot.jpg",
      galleria: [
        "assets/video/eventi-copertina.mp4",
        "assets/video/eventi-festa.mp4",
        "assets/video/eventi-post.mp4",
      ],
    },
  ],

  /* ---------- SOLARIUM (video muto, in autoplay) ---------- */
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
