/* ── DATA ── */
const USERS = [
  {
    email: "klient@test.pl",
    pass: "haslo123",
    name: "Kasia Kowalska",
    role: "client",
  },
  {
    email: "admin@test.pl",
    pass: "admin123",
    name: "Justyna Wachnicka",
    role: "admin",
  },
];

let GALLERIES = [
  {
    id: "g1",
    name: "Sesja ślubna Ania & Marek",
    client: "klient@test.pl",
    date: "2025-06-14",
    cat: "Ślubna",
    photos: [
      "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=600&q=80",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
      "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=500&q=80",
    ],
  },
  {
    id: "g2",
    name: "Plener wiosna 2025",
    client: "klient@test.pl",
    date: "2025-04-10",
    cat: "Plener",
    photos: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80",
    ],
  },
];

const ALL_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=700&q=80",
    cap: "Sesja plenerowa",
    cat: "plener",
  },
  {
    src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
    cap: "Portret w naturze",
    cat: "plener",
  },
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    cap: "Złota godzina",
    cat: "plener",
  },
  {
    src: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80",
    cap: "Sesja rodzinna",
    cat: "plener",
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80",
    cap: "Plener letni",
    cat: "plener",
  },
  {
    src: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=700&q=80",
    cap: "Studio portret",
    cat: "studio",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    cap: "Fashion",
    cat: "studio",
  },
  {
    src: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80",
    cap: "Portret biznesowy",
    cat: "studio",
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
    cap: "Headshot",
    cat: "studio",
  },
  {
    src: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=700&q=80",
    cap: "Para młoda",
    cat: "slub",
  },
  {
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80",
    cap: "Ceremonia",
    cat: "slub",
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
    cap: "Portret ślubny",
    cat: "slub",
  },
  {
    src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80",
    cap: "Detale ślubne",
    cat: "slub",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
    cap: "Wesele",
    cat: "slub",
  },
  {
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
    cap: "Urodziny",
    cat: "okazje",
  },
  {
    src: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
    cap: "Komunia",
    cat: "okazje",
  },
  {
    src: "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=700&q=80",
    cap: "Impreza okolicznościowa",
    cat: "okazje",
  },
  {
    src: "https://images.unsplash.com/photo-1578307980936-b4fb0b610b26?w=600&q=80",
    cap: "Chrzciny",
    cat: "okazje",
  },
];

const TESTIMONIALS = [
  {
    stars: 5,
    text: '„Justyna to niesamowita fotografka. Czułam się swobodnie, a zdjęcia są przepiękne!"',
    name: "Karolina M.",
    role: "plener",
  },
  {
    stars: 5,
    text: '„Zdjęcia ślubne przekroczyły nasze oczekiwania. Każde ujęcie to emocja."',
    name: "Ania & Marek",
    role: "ślub",
  },
  {
    stars: 5,
    text: '„Komunia córki uwieczniona cudownie. Zdjęcia naturalne i pełne emocji."',
    name: "Rodzina Kowalskich",
    role: "komunia",
  },
  {
    stars: 5,
    text: '„Sesja w studio przeszła oczekiwania. Justyna wydobywa to, co w człowieku najpiękniejsze."',
    name: "Piotr W.",
    role: "studio",
  },
  {
    stars: 5,
    text: '„Urodziny mamy uwiecznione na zawsze. Pracuje dyskretnie i z wielką wrażliwością."',
    name: "Rodzina Nowaków",
    role: "jubileusz",
  },
];

/* ── STATE ── */
let currentPage = "oferta";
let currentUser = null;
let lbImgs = [],
  lbIdx = 0;
let isDark = false;

/* ── INIT ── */
window.addEventListener("load", () => {
  setTimeout(
    () => document.getElementById("loader").classList.add("gone"),
    1800,
  );
  buildTesti();
  renderPhotoGrid("all");
  setupReveal();
});
window.addEventListener("scroll", () => {
  document
    .querySelector("nav")
    .classList.toggle("scrolled", window.scrollY > 40);
});

/* ── NAVIGATION ── */
function go(page) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("visible"));
  const el = document.getElementById("page-" + page);
  if (!el) return;
  el.classList.add("visible");
  currentPage = page;
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Nav tabs active
  document
    .querySelectorAll(".nav-tab a")
    .forEach((a) => a.classList.remove("active"));
  const active = document.querySelector(`.nav-tab a[data-p="${page}"]`);
  if (active) active.classList.add("active");
  document
    .querySelectorAll(".mob-menu a[data-p]")
    .forEach((a) => a.classList.toggle("active", a.dataset.p === page));

  // Skills animation on O mnie
  if (page === "o-mnie")
    setTimeout(
      () =>
        document
          .querySelectorAll(".sk-fill")
          .forEach((f) => f.classList.add("go")),
      300,
    );

  // Login page view
  if (page === "login") renderDashboard();

  // Re-run reveal
  setTimeout(() => setupReveal(), 100);
  return false;
}

/* ── THEME ── */
function toggleTheme() {
  isDark = !isDark;
  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light",
  );
  document.getElementById("themeBtn").textContent = isDark ? "🌙" : "☀️";
}

/* ── MOBILE MENU ── */
function toggleMob() {
  const b = document.getElementById("burger"),
    m = document.getElementById("mobMenu");
  b.classList.toggle("open");
  m.classList.toggle("open");
  document.body.style.overflow = m.classList.contains("open") ? "hidden" : "";
}
function closeMob() {
  document.getElementById("burger").classList.remove("open");
  document.getElementById("mobMenu").classList.remove("open");
  document.body.style.overflow = "";
}

/* ── AUTH ── */
function handleAuthClick() {
  if (currentUser) {
    doLogout();
    return;
  }
  go("login");
}
function switchAuthTab(tab, btn) {
  document
    .querySelectorAll(".auth-tab")
    .forEach((t) => t.classList.remove("on"));
  btn.classList.add("on");
  document.getElementById("auth-login").style.display =
    tab === "login" ? "" : "none";
  document.getElementById("auth-register").style.display =
    tab === "register" ? "" : "none";
}
function doLogin() {
  const email = document.getElementById("li-email").value.trim();
  const pass = document.getElementById("li-pass").value;
  const user = USERS.find((u) => u.email === email && u.pass === pass);
  if (!user) {
    toast("Nieprawidłowy e-mail lub hasło");
    return;
  }
  currentUser = user;
  updateAuthUI();
  toast(`Witaj, ${user.name}! 👋`);
  renderDashboard();
}
function doRegister() {
  const name = document.getElementById("re-name").value.trim();
  const email = document.getElementById("re-email").value.trim();
  const pass = document.getElementById("re-pass").value;
  if (!name || !email || pass.length < 8) {
    toast("Wypełnij wszystkie pola (hasło ≥ 8 znaków)");
    return;
  }
  const newU = { email, pass, name, role: "client" };
  USERS.push(newU);
  currentUser = newU;
  updateAuthUI();
  toast(`Konto utworzone! Witaj, ${name}! 🎉`);
  renderDashboard();
}
function doLogout() {
  currentUser = null;
  updateAuthUI();
  renderDashboard();
  toast("Wylogowano pomyślnie");
}
function updateAuthUI() {
  const btn = document.getElementById("navAuthBtn");
  const mobLink = document.getElementById("mob-auth-link");
  if (currentUser) {
    btn.textContent = "Wyloguj się";
    btn.classList.add("active-user");
    if (mobLink) mobLink.textContent = "Wyloguj się";
  } else {
    btn.textContent = "Zaloguj się";
    btn.classList.remove("active-user");
    if (mobLink) mobLink.textContent = "Zaloguj się";
  }
}

/* ── DASHBOARD ── */
function renderDashboard() {
  document.getElementById("view-auth").style.display = currentUser
    ? "none"
    : "";
  document.getElementById("view-client").style.display =
    currentUser && currentUser.role === "client" ? "" : "none";
  document.getElementById("view-admin").style.display =
    currentUser && currentUser.role === "admin" ? "" : "none";

  if (!currentUser) return;

  if (currentUser.role === "client") {
    document.getElementById("dash-welcome").textContent =
      `Zalogowano jako: ${currentUser.email}`;
    const myGals = GALLERIES.filter((g) => g.client === currentUser.email);
    const el = document.getElementById("client-gal-list");
    el.innerHTML = myGals.length
      ? myGals.map((g) => galCardHTML(g)).join("")
      : '<p style="color:var(--sub);font-size:.85rem">Nie masz jeszcze żadnych galerii. Po sesji otrzymasz dostęp.</p>';
  }

  if (currentUser.role === "admin") {
    document.getElementById("admin-welcome").textContent =
      `Zalogowano jako: ${currentUser.email}`;
    document.getElementById("admin-gal-count").textContent =
      `(${GALLERIES.length})`;
    document.getElementById("admin-gal-list").innerHTML = GALLERIES.map((g) =>
      galCardHTML(g, true),
    ).join("");
  }
}

function galCardHTML(g, isAdmin) {
  const thumb = g.photos[0] || "";
  const dateStr = g.date
    ? new Date(g.date).toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  return `<div class="gal-card card" onclick="openGallery('${g.id}')">
    <img src="${thumb}" alt="${g.name}">
    <div class="gal-card-badge"><span class="badge">${g.cat}</span></div>
    <div class="gal-card-info">
      <div class="gal-card-title">${g.name}</div>
      <div class="gal-card-meta">${dateStr}${isAdmin ? ` · ${g.client}` : ""} · ${g.photos.length} zdjęć</div>
    </div>
  </div>`;
}

function createGallery() {
  const name = document.getElementById("ng-name").value.trim();
  const client = document.getElementById("ng-client").value.trim();
  const date = document.getElementById("ng-date").value;
  const cat = document.getElementById("ng-cat").value;
  if (!name || !client) {
    toast("Podaj nazwę galerii i e-mail klienta");
    return;
  }
  GALLERIES.push({
    id: "g" + Date.now(),
    name,
    client,
    date: date || new Date().toISOString().slice(0, 10),
    cat,
    photos: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
    ],
  });
  toast(`Galeria „${name}" została utworzona ✓`);
  document.getElementById("ng-name").value = "";
  document.getElementById("ng-client").value = "";
  document.getElementById("ng-date").value = "";
  renderDashboard();
}

function openGallery(id) {
  const g = GALLERIES.find((x) => x.id === id);
  if (!g) return;
  document.getElementById("sg-title").textContent = g.name;
  document.getElementById("sg-meta").textContent =
    `${g.photos.length} zdjęć · ${new Date(g.date).toLocaleDateString("pl-PL", { year: "numeric", month: "long", day: "numeric" })} · ${g.cat}`;
  document.getElementById("sg-grid").innerHTML = g.photos
    .map(
      (src, i) =>
        `<div class="sg-item" onclick="openLb(${JSON.stringify(g.photos)},${i})">
      <img src="${src}" alt="Zdjęcie ${i + 1}" loading="lazy">
      <div class="sg-overlay">
        <button class="sg-dl-btn" onclick="event.stopPropagation();dlPhoto(${i + 1})">⬇ Pobierz</button>
      </div>
    </div>`,
    )
    .join("");
  go("single-gallery");
}

function dlPhoto(n) {
  toast(`Pobieranie zdjęcia ${n}... ✓`);
}
function downloadAll() {
  toast("Pobieranie wszystkich zdjęć... ✓");
}

/* ── PORTFOLIO ── */
function renderPhotoGrid(cat) {
  const photos =
    cat === "all" ? ALL_PHOTOS : ALL_PHOTOS.filter((p) => p.cat === cat);
  document.getElementById("photoGrid").innerHTML = photos
    .map(
      (p, i) =>
        `<div class="ph-item" onclick="openLb(${JSON.stringify(photos.map((x) => x.src))},${i})">
      <img src="${p.src}" alt="${p.cap}" loading="lazy">
      <div class="ph-cap">${p.cap}</div>
    </div>`,
    )
    .join("");
}
function filterCat(cat, btn) {
  document
    .querySelectorAll(".cat-btn")
    .forEach((b) => b.classList.remove("on"));
  btn.classList.add("on");
  renderPhotoGrid(cat);
}

/* ── TESTIMONIALS ── */
function buildTesti() {
  const cards = [...TESTIMONIALS, ...TESTIMONIALS]
    .map(
      (t) =>
        `<div class="testi-card">
      <div class="t-stars">${"★".repeat(t.stars)}</div>
      <p class="t-text">${t.text}</p>
      <div class="t-by"><strong>${t.name}</strong> — ${t.role}</div>
    </div>`,
    )
    .join("");
  document.getElementById("testiTrack").innerHTML = cards;
}

/* ── LIGHTBOX ── */
function openLb(imgs, idx) {
  lbImgs = Array.isArray(imgs) ? imgs : [imgs];
  lbIdx = idx || 0;
  showLb();
  document.getElementById("lb").classList.add("open");
}
function showLb() {
  document.getElementById("lb-img").src = lbImgs[lbIdx];
  document.getElementById("lb-info").textContent =
    `${lbIdx + 1} / ${lbImgs.length}`;
}
function lbStep(d) {
  lbIdx = (lbIdx + d + lbImgs.length) % lbImgs.length;
  showLb();
}
function closeLb() {
  document.getElementById("lb").classList.remove("open");
}
document.getElementById("lb").addEventListener("click", (e) => {
  if (e.target === document.getElementById("lb")) closeLb();
});
document.addEventListener("keydown", (e) => {
  if (!document.getElementById("lb").classList.contains("open")) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowLeft") lbStep(-1);
  if (e.key === "ArrowRight") lbStep(1);
});

/* ── CONTACT ── */
function sendContact() {
  const n = document.getElementById("c-name").value.trim();
  const m = document.getElementById("c-email").value.trim();
  if (!n || !m) {
    toast("Podaj imię i e-mail");
    return;
  }
  toast("Wiadomość wysłana — odezwę się wkrótce! ✦");
  document.getElementById("c-name").value = "";
  document.getElementById("c-email").value = "";
}

/* ── REVEAL ── */
function setupReveal() {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in");
      }),
    { threshold: 0.1 },
  );
  document.querySelectorAll(".rv:not(.in)").forEach((el) => io.observe(el));
}

/* ── TOAST ── */
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 4000);
}
