/* =============================================================
   IMPERIUM — Eventi da Favola · logica (vanilla JS)
   ============================================================= */
(function () {
  "use strict";
  var D = window.IMPERIUM;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* -------- WhatsApp helper -------- */
  function waURL(msg) {
    return "https://wa.me/" + D.whatsapp + "?text=" + encodeURIComponent(msg);
  }

  /* -------- Aperto / Chiuso -------- */
  function toMin(hhmm) { var p = hhmm.split(":"); return (+p[0]) * 60 + (+p[1]); }
  function statoApertura() {
    var now = new Date();
    var day = now.getDay();            // 0=dom ... 6=sab
    var mins = now.getHours() * 60 + now.getMinutes();
    var o = D.orari[day];
    if (!o || !o.apre || !o.chiude) return { aperto: false, testo: "Chiuso oggi" };
    var apre = toMin(o.apre);
    var chiude = toMin(o.chiude); if (chiude === 0) chiude = 1440; // 24:00
    var aperto = mins >= apre && mins < chiude;
    return {
      aperto: aperto,
      testo: aperto ? "Aperto ora · fino alle " + (o.chiude === "24:00" ? "00:00" : o.chiude)
                    : "Chiuso ora · apre alle " + o.apre
    };
  }

  /* ============================================================
     POPOLAMENTO CONTENUTI
     ============================================================ */
  function fill() {
    // tagline / hero
    $("#heroTag").textContent = D.tagline;

    // badge stato nel hero
    var s = statoApertura();
    var badge = $("#statoBadge");
    badge.textContent = s.testo;
    badge.classList.add(s.aperto ? "aperto" : "chiuso");

    // numeri
    $("#numeri").innerHTML = D.numeri.map(function (n) {
      return '<li><span class="n">' + n.valore + '</span><span class="l">' + n.label + '</span></li>';
    }).join("");

    // SALE E SPAZI (slot con video oppure segnaposto "Video in arrivo")
    var tempio = '<svg class="soon-mark" viewBox="0 0 64 34" aria-hidden="true">' +
      '<path fill="currentColor" d="M32 1 2 16h60zM5 19h8v13H5zm15 0h8v13h-8zm15 0h8v13h-8zm15 0h8v13h-8zM2 33h60v-1H2z"/></svg>';
    $("#saleGrid").innerHTML = D.sale.map(function (sa, i) {
      var media = sa.video
        ? '<video class="autovid" autoplay data-src="' + sa.video + '" poster="' + (sa.poster || "") + '" muted loop playsinline preload="none" aria-label="' + sa.nome + '"></video>'
        : '<div class="sala-card__soon">' + tempio + '<span>Video in arrivo</span></div>';
      var zoom = '<span class="sala-card__zoom" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M10 2a8 8 0 1 0 4.9 14.3l5.4 5.4 1.4-1.4-5.4-5.4A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm-1 2v2H7v2h2v2h2V10h2V8h-2V6z"/></svg></span>';
      return '' +
      '<article class="sala-card' + (sa.video ? "" : " is-soon") + (sa.orizzontale ? " is-wide" : "") + '" data-idx="' + i + '" role="button" tabindex="0" aria-label="Apri ' + sa.nome + '">' +
        '<div class="sala-card__media">' + media +
          '<div class="sala-card__grad"></div>' + (sa.video ? zoom : "") +
        '</div>' +
        '<div class="sala-card__body">' +
          '<h3 class="sala-card__name">' + sa.nome + '</h3>' +
          '<p class="sala-card__sub">' + sa.sottotitolo + '</p>' +
          '<p class="sala-card__desc">' + sa.descrizione + '</p>' +
          '<span class="sala-card__cta">Scopri &rarr;</span>' +
        '</div>' +
      '</article>';
    }).join("");

    // ESTERNO
    $("#esternoTitolo").textContent = D.esterno.titolo;
    $("#esternoDesc").textContent = D.esterno.descrizione;
    $("#esternoSrc").setAttribute("src", D.esterno.video);
    $("#esternoVideo").load();

    // LOCATION / gallery
    $("#locationGrid").innerHTML = D.gallery.map(function (g) {
      return '' +
      '<article class="loc-card">' +
        '<div class="media">' +
          '<video class="autovid" autoplay data-src="' + g.video + '" poster="' + g.poster + '" muted loop playsinline preload="none" aria-label="' + g.titolo + '"></video>' +
          '<span class="cap">' + g.titolo + '</span>' +
        '</div>' +
      '</article>';
    }).join("");

    // SELECT tipi evento (preventivo)
    var opts = '<option value="" disabled selected>Seleziona…</option>' +
      D.tipiEvento.map(function (t) { return '<option>' + t + '</option>'; }).join("");
    $("#pv-evento").innerHTML = opts;

    // CONTATTI
    $("#ctIndirizzo").textContent = D.indirizzoCompleto;
    $("#ctMapLink").href = D.mapLink;
    var f = $("#ctFisso"); f.textContent = D.telefonoFisso; f.href = "tel:" + D.telefonoFissoLink;
    var c = $("#ctCell"); c.textContent = D.cellulare; c.href = "tel:+39" + D.cellulare.replace(/\s/g, "");
    $("#dockCall").href = "tel:" + D.telefonoFissoLink;
    var dw = $("#dockWhats"); if (dw) dw.href = waURL("Ciao IMPERIUM! Vorrei qualche informazione.");

    // orari list
    var todayIdx = new Date().getDay();
    $("#orariList").innerHTML = D.orari.map(function (o, i) {
      var val = (o.apre && o.chiude) ? (o.apre + " – " + (o.chiude === "24:00" ? "00:00" : o.chiude)) : "Chiuso";
      return '<li class="' + (i === todayIdx ? "today" : "") + '"><span class="d">' + o.g + '</span><span class="h">' + val + '</span></li>';
    }).join("");

    // stato nei contatti
    var sc = $("#statoContatti");
    sc.textContent = s.aperto ? "Aperto" : "Chiuso";
    sc.className = "stato " + (s.aperto ? "stato--aperto" : "stato--chiuso");

    // socials
    $("#socials").innerHTML =
      '<a href="' + D.instagram + '" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.4.36 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.4.17-1 .36-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2zm0 1.98c-3.14 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17C2.4 10.5 2.39 10.86 2.39 14s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.6.07-4.74M12 6.87A5.13 5.13 0 1 0 12 17.13 5.13 5.13 0 0 0 12 6.87zm0 8.46A3.33 3.33 0 1 1 12 8.67a3.33 3.33 0 0 1 0 6.66zm6.54-8.69a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/></svg>Instagram</a>' +
      '<a href="' + D.facebook + '" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>Facebook</a>' +
      '<a href="' + D.recensioniGoogle + '" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01z"/></svg>Recensioni</a>';

    // mappa: caricata solo col consenso cookie (vedi initCookie)
    var mapLinkEl = $("#mapConsentLink"); if (mapLinkEl) mapLinkEl.href = D.mapLink;

    // footer
    $("#footMeta").textContent = D.indirizzoCompleto + " · Tel. " + D.telefonoFisso;
    $("#year").textContent = new Date().getFullYear();

    // footer legale
    if (D.legale) {
      var L = D.legale;
      $("#footLegal").innerHTML =
        "<strong>" + L.ragioneSociale + "</strong> — Sede legale: " + L.sedeLegale +
        " · P.IVA/C.F. " + L.piva +
        " · REA " + L.rea + " (CCIAA di " + L.cciaa + ")" +
        " · Cap. soc. " + L.capitaleSociale +
        " · PEC: <a href=\"mailto:" + L.pec + "\">" + L.pec + "</a>";
    }

    // credito autore (riutilizzabile)
    if (D.autore) {
      var a = D.autore, ic = [];
      if (a.instagram) ic.push('<a href="' + a.instagram + '" target="_blank" rel="noopener" aria-label="Instagram ' + a.nome + '"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.4.36 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.4.17-1 .36-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.4-.36-1-.42-2.2C2.4 15.6 2.39 15.2 2.39 12s.01-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.21-.55.48-.96.9-1.38.41-.41.8-.67 1.35-.88.41-.16 1.03-.35 2.17-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.98c-3.14 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.6.07-4.74M12 6.87A5.13 5.13 0 1 0 12 17.13 5.13 5.13 0 0 0 12 6.87zm0 8.46A3.33 3.33 0 1 1 12 8.67a3.33 3.33 0 0 1 0 6.66zm6.54-8.69a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/></svg></a>');
      if (a.email) ic.push('<a href="mailto:' + a.email + '" aria-label="Email ' + a.nome + '"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13A1.5 1.5 0 0 1 20.5 20h-17A1.5 1.5 0 0 1 2 18.5zM4.3 6l7.7 5.1L19.7 6zM20 7.3l-8 5.3-8-5.3V18h16z"/></svg></a>');
      if (a.telefono) ic.push('<a href="tel:+39' + a.telefono.replace(/\s/g, "") + '" aria-label="Telefono ' + a.nome + '"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1z"/></svg></a>');
      $("#autoreCredit").innerHTML = 'Sito realizzato da <strong>' + a.nome + '</strong>' +
        '<span class="footer__author-ic">' + ic.join("") + '</span>';
    }

    injectSchema(s);
    bindMediaEvents();
  }

  /* ============================================================
     VIDEO SALE + GALLERY (tap to play, muted loop)
     ============================================================ */
  function makeInlineVideo(src) {
    var v = document.createElement("video");
    v.src = src; v.muted = true; v.loop = true; v.playsInline = true;
    v.setAttribute("playsinline", ""); v.setAttribute("preload", "none");
    return v;
  }

  function bindMediaEvents() {
    // AUTOPLAY: i video partono da soli (muti, in loop) quando entrano
    // nello schermo e si fermano quando escono — risparmia dati su mobile.
    var vids = $$(".autovid");
    function startVid(v) {
      v.muted = true;
      if (!v.getAttribute("src")) { v.setAttribute("src", v.getAttribute("data-src")); v.load(); }
      var pr = v.play();
      if (pr && pr.catch) pr.catch(function () {
        v.addEventListener("canplay", function () { v.play().catch(function () {}); }, { once: true });
      });
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) startVid(e.target);
          else e.target.pause();
        });
      }, { threshold: 0.25 });
      vids.forEach(function (v) { io.observe(v); });
    } else {
      vids.forEach(startVid);
    }

    // ogni slot è cliccabile → apre la galleria della sala
    $$(".sala-card").forEach(function (card) {
      var idx = +card.getAttribute("data-idx");
      var sa = D.sale[idx];
      if (!sa || !sa.video) return;            // slot "in arrivo": non apre nulla
      function open() { apriGalleria(sa); }
      card.addEventListener("click", open);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    });
  }

  /* ============================================================
     GALLERIA MODALE (foto + video di ogni slot)
     ============================================================ */
  function isVideo(src) { return /\.(mp4|webm|mov|m4v)$/i.test(src); }

  function costruisciModale() {
    if ($("#galleria")) return;
    var m = document.createElement("div");
    m.className = "gmodal"; m.id = "galleria"; m.hidden = true;
    m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true");
    m.innerHTML =
      '<div class="gmodal__backdrop" data-close></div>' +
      '<div class="gmodal__panel" role="document">' +
        '<button class="gmodal__close" data-close aria-label="Chiudi">&times;</button>' +
        '<div class="gmodal__head">' +
          '<p class="kicker" id="gmKicker"></p>' +
          '<h3 class="h-serif" id="gmTitle"></h3>' +
          '<p class="gmodal__desc" id="gmDesc"></p>' +
        '</div>' +
        '<div class="gmodal__grid" id="gmGrid"></div>' +
        '<div class="gmodal__foot">' +
          '<a href="#preventivo" class="btn btn--gold" id="gmCta">Richiedi un preventivo</a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(m);
    $$("[data-close]", m).forEach(function (el) { el.addEventListener("click", chiudiGalleria); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") chiudiGalleria(); });
    $("#gmCta", m).addEventListener("click", chiudiGalleria);
  }

  function apriGalleria(sa) {
    costruisciModale();
    var m = $("#galleria");
    $("#gmKicker").textContent = sa.sottotitolo || "";
    $("#gmTitle").textContent = sa.nome;
    $("#gmDesc").textContent = sa.descrizione || "";
    var media = (sa.galleria && sa.galleria.length) ? sa.galleria : (sa.video ? [sa.video] : []);
    $("#gmGrid").innerHTML = media.map(function (src) {
      if (isVideo(src)) {
        return '<div class="gmedia"><video src="' + src + '" controls playsinline muted loop preload="metadata"></video></div>';
      }
      return '<div class="gmedia"><img src="' + src + '" alt="' + sa.nome + '" loading="lazy" /></div>';
    }).join("") || '<p class="gmodal__empty">Le foto e i video di questa sala saranno disponibili a breve.</p>';
    m.hidden = false;
    document.body.classList.add("no-scroll");
    // avvia il primo video in muto
    var fv = m.querySelector("video"); if (fv) { fv.muted = true; fv.play().catch(function(){}); }
  }

  function chiudiGalleria() {
    var m = $("#galleria"); if (!m || m.hidden) return;
    m.querySelectorAll("video").forEach(function (v) { try { v.pause(); } catch (e) {} });
    m.hidden = true;
    document.body.classList.remove("no-scroll");
  }

  /* ============================================================
     ESTERNO — play + toggle audio
     ============================================================ */
  function initEsterno() {
    var v = $("#esternoVideo");
    // video muto, in autoplay quando è in vista, pausa quando esce
    v.muted = true; v.loop = true; v.playsInline = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { var pr = v.play(); if (pr && pr.catch) pr.catch(function(){}); }
          else v.pause();
        });
      }, { threshold: 0.3 }).observe(v);
    } else {
      v.play().catch(function(){});
    }
  }

  /* ============================================================
     VALIDAZIONE + WHATSAPP
     ============================================================ */
  function setErr(field, msg) {
    var wrap = field.closest(".field");
    var err = wrap.querySelector(".err");
    if (msg) { wrap.classList.add("invalid"); if (err) err.textContent = msg; }
    else { wrap.classList.remove("invalid"); if (err) err.textContent = ""; }
    return !msg;
  }
  function telValida(v) { return /^[+\d][\d\s.\-()]{6,}$/.test(v.trim()); }
  function oggiISO() { var d = new Date(); d.setHours(0,0,0,0); return d; }

  function initForms() {
    /* ---- PREVENTIVO ---- */
    var fp = $("#formPreventivo");
    // data min = oggi
    var pvData = $("#pv-data"); pvData.min = new Date().toISOString().split("T")[0];
    fp.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var ev = $("#pv-evento"), inv = $("#pv-invitati"), nome = $("#pv-nome"), tel = $("#pv-tel"), data = $("#pv-data"), note = $("#pv-note"), priv = $("#pv-privacy");
      ok &= setErr(ev, ev.value ? "" : "Seleziona il tipo di evento.");
      ok &= setErr(inv, (inv.value && +inv.value >= 1 && +inv.value <= 2000) ? "" : "Inserisci un numero valido (1–2000).");
      ok &= setErr(nome, nome.value.trim().length >= 2 ? "" : "Inserisci il tuo nome.");
      ok &= setErr(tel, telValida(tel.value) ? "" : "Inserisci un numero di cellulare valido.");
      if (data.value && new Date(data.value) < oggiISO()) ok &= setErr(data, "La data non può essere nel passato."); else setErr(data, "");
      ok &= setErr(priv, priv.checked ? "" : "Devi accettare la Privacy Policy per continuare.");
      if (!ok) { $("#pvEsito").textContent = "Controlla i campi evidenziati."; $("#pvEsito").className = "form__note"; return; }

      var msg = "Ciao IMPERIUM! Vorrei un preventivo veloce.\n" +
        "• Evento: " + ev.value + "\n" +
        "• Invitati: " + inv.value + "\n" +
        (data.value ? "• Data indicativa: " + formatData(data.value) + "\n" : "") +
        "• Nome: " + nome.value.trim() + "\n" +
        "• Cellulare: " + tel.value.trim() +
        (note.value.trim() ? "\n• Note: " + note.value.trim() : "");
      openWA(msg, "#pvEsito");
    });
  }

  function formatData(iso) {
    var d = new Date(iso);
    return d.toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" });
  }

  function openWA(msg, esitoSel) {
    var url = waURL(msg);
    var esito = $(esitoSel);
    esito.className = "form__note ok";
    esito.textContent = "Ti stiamo aprendo WhatsApp — premi invio per inviare il messaggio. Ti confermeremo noi in chat.";
    window.open(url, "_blank");
  }

  /* ============================================================
     SCHEMA JSON-LD (SEO locale)
     ============================================================ */
  function injectSchema(s) {
    var hours = D.orari.map(function (o) {
      return {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][D.orari.indexOf(o)],
        "opens": o.apre,
        "closes": o.chiude === "24:00" ? "23:59" : o.chiude
      };
    });
    var schema = {
      "@context": "https://schema.org",
      "@type": "EventVenue",
      "name": "IMPERIUM Eventi da Favola",
      "description": D.tagline,
      "image": location.origin + "/assets/img/poster-sfondo.jpg",
      "url": location.href,
      "telephone": D.telefonoFissoLink,
      "priceRange": "€€€",
      "foundingDate": D.dal,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": D.indirizzo,
        "addressLocality": D.citta,
        "addressRegion": D.provincia,
        "postalCode": D.cap,
        "addressCountry": "IT"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": D.geo.lat, "longitude": D.geo.lng },
      "openingHoursSpecification": hours,
      "sameAs": [D.instagram, D.facebook]
    };
    var sc = document.createElement("script");
    sc.type = "application/ld+json";
    sc.textContent = JSON.stringify(schema);
    document.head.appendChild(sc);
  }

  /* ============================================================
     NAV (scroll solido + burger)
     ============================================================ */
  function initNav() {
    var nav = $("#nav");
    var burger = $("#burger");
    // crea drawer
    var drawer = document.createElement("div");
    drawer.className = "nav__drawer";
    drawer.innerHTML =
      '<a href="#sale">Le Sale</a>' +
      '<a href="#esterno">Solarium</a>' +
      '<a href="#location">La Location</a>' +
      '<a href="#preventivo">Preventivo Veloce</a>' +
      '<a href="#contatti">Contatti</a>' +
      '<a href="#preventivo" class="btn btn--gold btn--block">Preventivo veloce</a>';
    document.body.appendChild(drawer);

    function closeDrawer() { drawer.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
    burger.addEventListener("click", function () {
      var open = drawer.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("a", drawer).forEach(function (a) { a.addEventListener("click", closeDrawer); });

    function onScroll() {
      if (window.scrollY > 40) nav.classList.add("nav--solid"); else nav.classList.remove("nav--solid");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     COOKIE + MAPPA A CONSENSO
     ============================================================ */
  function caricaMappa() {
    var f = $("#mapFrame"); if (f && !f.src) f.src = D.mapEmbed;
    var mc = $("#mapConsent"); if (mc) mc.hidden = true;
  }
  function getConsenso() { try { return localStorage.getItem("imperium_cookie"); } catch (e) { return null; } }
  function setConsenso(v) { try { localStorage.setItem("imperium_cookie", v); } catch (e) {} }

  function initCookie() {
    var banner = $("#cookie");
    var scelta = getConsenso();
    if (scelta === "all") caricaMappa();          // mappa attiva
    // banner solo se non ha ancora scelto
    if (!scelta && banner) banner.hidden = false;

    var acc = $("#cookieAccept"), rej = $("#cookieReject");
    if (acc) acc.addEventListener("click", function () { setConsenso("all"); caricaMappa(); if (banner) banner.hidden = true; });
    if (rej) rej.addEventListener("click", function () { setConsenso("necessary"); if (banner) banner.hidden = true; });

    // bottone sul segnaposto della mappa: attiva solo la mappa
    var mb = $("#mapConsentBtn");
    if (mb) mb.addEventListener("click", function () { setConsenso("all"); caricaMappa(); if (banner) banner.hidden = true; });
  }

  /* -------- aggiorna stato apertura ogni minuto -------- */
  function tickStato() {
    var s = statoApertura();
    var b = $("#statoBadge"); if (b) { b.textContent = s.testo; b.className = "hero__eyebrow " + (s.aperto ? "aperto" : "chiuso"); }
    var sc = $("#statoContatti"); if (sc) { sc.textContent = s.aperto ? "Aperto" : "Chiuso"; sc.className = "stato " + (s.aperto ? "stato--aperto" : "stato--chiuso"); }
  }

  /* ============================================================ */
  document.addEventListener("DOMContentLoaded", function () {
    if (!D) return;
    fill();
    initEsterno();
    initForms();
    initNav();
    initCookie();
    setInterval(tickStato, 60000);
  });
})();
