function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function renderProfile(profile) {
  document.getElementById("nav-name").textContent = profile.name;
  document.getElementById("profile-name").textContent = profile.name;
  document.getElementById("profile-title").textContent = profile.title;
  document.getElementById("profile-location").textContent = profile.location;
  document.getElementById("profile-blurb").textContent = profile.blurb;

  const langList = document.getElementById("profile-languages");
  langList.innerHTML = (profile.languages || [])
    .map((lang) => `<li>${escapeHtml(lang)}</li>`)
    .join("");

  const contactList = document.getElementById("contact-list");
  contactList.innerHTML = `
    <li><span>Courriel</span><a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a></li>
    <li><span>Téléphone</span>${escapeHtml(profile.phone)}</li>
    <li><span>GitHub</span><a href="${escapeHtml(profile.github)}" target="_blank" rel="noopener">${escapeHtml(profile.github)}</a></li>
    <li><span>Localisation</span>${escapeHtml(profile.location)}</li>
  `;
}

async function fileExists(url) {
  try {
    const res = await fetch(url, { method: "HEAD", cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}

async function renderCvs(cvs) {
  const grid = document.getElementById("cvs-grid");
  grid.innerHTML = (cvs || [])
    .map(
      (cv) => `
    <article class="card" data-cv-id="${escapeHtml(cv.id)}">
      <h3>${escapeHtml(cv.label_fr)}</h3>
      <p>${escapeHtml(cv.description_fr)}</p>
      <div class="card-meta">Mis à jour : ${escapeHtml(cv.updated)}</div>
      <div class="card-actions" data-actions></div>
    </article>
  `
    )
    .join("");

  for (const cv of cvs || []) {
    const card = grid.querySelector(`[data-cv-id="${CSS.escape(cv.id)}"]`);
    const actions = card.querySelector("[data-actions]");
    const url = `cvs/${cv.file}`;
    const available = await fileExists(url);

    if (available) {
      actions.innerHTML = `
        <a class="btn" href="${escapeHtml(url)}" target="_blank" rel="noopener">Voir</a>
        <a class="btn btn-primary" href="${escapeHtml(url)}" download>Télécharger</a>
      `;
    } else {
      actions.innerHTML = `<span class="card-unavailable">Bientôt disponible</span>`;
    }
  }
}

function renderProjects(projects, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = (projects || [])
    .map(
      (p) => `
    <article class="card">
      <h3>${escapeHtml(p.name)}</h3>
      <div class="card-tech">${escapeHtml(p.tech)}</div>
      <p>${escapeHtml(p.description_fr)}</p>
      ${p.status ? `<div class="card-meta">${escapeHtml(p.status)}</div>` : ""}
      <div class="card-actions">
        ${p.repo_url ? `<a class="btn" href="${escapeHtml(p.repo_url)}" target="_blank" rel="noopener">Code</a>` : ""}
        ${p.live_url ? `<a class="btn btn-primary" href="${escapeHtml(p.live_url)}" target="_blank" rel="noopener">Démo</a>` : ""}
      </div>
    </article>
  `
    )
    .join("");
}

async function init() {
  document.getElementById("year").textContent = new Date().getFullYear();

  const res = await fetch("manifest.json", { cache: "no-store" });
  const data = await res.json();

  renderProfile(data.profile);

  // "En cours" only shows up when there is something in flight.
  const wip = data.wip || [];
  document.getElementById("wip").hidden = wip.length === 0;
  renderProjects(wip, "wip-grid");

  renderProjects(data.projects, "projects-grid");
  await renderCvs(data.cvs);
}

init();
