(function () {
  "use strict";

  var state = { all: [], filtered: [], visible: 12 };
  var labels = { idea: "idea técnica", promo: "promo / oferta", watch: "para revisar", sensitive: "contenido sensible" };

  function repairMojibake(value) {
    var cp1252 = { 0x20ac: 0x80, 0x201a: 0x82, 0x192: 0x83, 0x201e: 0x84, 0x2026: 0x85, 0x2020: 0x86, 0x2021: 0x87, 0x2c6: 0x88, 0x2030: 0x89, 0x160: 0x8a, 0x2039: 0x8b, 0x152: 0x8c, 0x17d: 0x8e, 0x2018: 0x91, 0x2019: 0x92, 0x201c: 0x93, 0x201d: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97, 0x2dc: 0x98, 0x2122: 0x99, 0x161: 0x9a, 0x203a: 0x9b, 0x153: 0x9c, 0x17e: 0x9e, 0x178: 0x9f };
    var bytes = [];
    for (var character of value) {
      var code = character.codePointAt(0);
      if (code > 255 && cp1252[code] === undefined) return value;
      bytes.push(cp1252[code] === undefined ? code : cp1252[code]);
    }
    try {
      var repaired = new TextDecoder("utf-8").decode(new Uint8Array(bytes));
      var mojibakeScore = function (text) { return (text.match(/Ã|Â|ðŸ|å|æ|ç|ï¼|â/g) || []).length; };
      return mojibakeScore(repaired) < mojibakeScore(value) ? repaired : value;
    } catch (error) {
      return value;
    }
  }

  function normalize(value) {
    return repairMojibake(value).toLowerCase();
  }

  function parseLine(line, index) {
    var urlStart = line.lastIndexOf("https://");
    var beforeUrl = urlStart > -1 ? line.slice(2, urlStart).trim() : line.slice(2).trim();
    beforeUrl = beforeUrl.replace(/·\s*$/, "").trim();
    var separator = beforeUrl.lastIndexOf("·");
    var author = separator > -1 ? beforeUrl.slice(separator + 1).trim() : "@sin autor";
    var title = separator > -1 ? beforeUrl.slice(0, separator).trim() : beforeUrl;
    title = title.replace(/\s+·\s+por qué vale:\s*[^·]+$/, "").trim();
    var lower = normalize(line);
    var type = lower.indexOf("[promo]") > -1 ? "promo" : lower.indexOf("[nsfw]") > -1 ? "sensitive" : lower.indexOf("conserva una idea") > -1 ? "idea" : "watch";
    return { id: index, title: title, author: author, url: urlStart > -1 ? line.slice(urlStart).trim() : "#", type: type, search: normalize(title + " " + author) };
  }

  function parseSource(source) {
    return repairMojibake(source).split("\n").filter(function (line) { return line.indexOf("- ") === 0; }).map(parseLine);
  }

  function sampleData() {
    return [
      { title: "SpaceX engineers just spent 9 hours live showing how they actually run Grok Bot.", author: "@unicodef1wn", url: "https://x.com/unicodef1wn/status/2100217011485728852", type: "idea", search: "spacex engineers grok bot unicodef1wn" },
      { title: "I sat down with one of the best AI agent software engineers in the world.", author: "@milesdeutscher", url: "https://x.com/milesdeutscher/status/2100132582012928445", type: "idea", search: "ai agent software engineer milesdeutscher" },
      { title: "The Muse team gave me a token code to share.", author: "@asadjooma1", url: "https://x.com/asadjooma1/status/2099975398121423271", type: "promo", search: "muse token code asadjooma1" }
    ];
  }

  function setText(id, value) { document.getElementById(id).textContent = value; }

  function renderStats() {
    var counts = { idea: 0, promo: 0, watch: 0, sensitive: 0 }, authors = {};
    state.all.forEach(function (item) { counts[item.type] += 1; authors[item.author] = (authors[item.author] || 0) + 1; });
    setText("total-count", state.all.length.toLocaleString("es-ES"));
    setText("promo-count", counts.promo.toLocaleString("es-ES"));
    setText("idea-count", counts.idea.toLocaleString("es-ES"));
    setText("author-count", Object.keys(authors).length.toLocaleString("es-ES"));
    setText("signal-total", state.all.length.toLocaleString("es-ES") + " total");
    document.getElementById("signal-chart").innerHTML = Object.keys(labels).map(function (type) {
      var percentage = state.all.length ? Math.max(2, counts[type] / state.all.length * 100) : 2;
      return '<div class="bar-row"><span class="bar-label">' + labels[type] + '</span><span class="bar-track"><span class="bar-fill" style="width:' + percentage + '%"></span></span><span class="bar-number">' + counts[type] + '</span></div>';
    }).join("");
    var topAuthors = Object.keys(authors).sort(function (a, b) { return authors[b] - authors[a]; }).slice(0, 5);
    document.getElementById("author-list").innerHTML = topAuthors.map(function (author, index) {
      return '<div class="author-row"><span class="author-rank">0' + (index + 1) + '</span><span class="author-name">' + author + '</span><span class="author-count">' + authors[author] + '</span></div>';
    }).join("");
  }

  function renderList() {
    var items = state.filtered.slice(0, state.visible);
    setText("result-count", state.filtered.length.toLocaleString("es-ES") + " encontrados");
    document.getElementById("bookmark-list").innerHTML = items.length ? items.map(function (item, index) {
      return '<article class="bookmark-item is-' + item.type + '" style="animation-delay:' + Math.min(index * 25, 250) + 'ms"><div class="bookmark-meta"><span>#' + String(item.id + 1).padStart(4, "0") + '</span><span class="bookmark-type">' + labels[item.type] + '</span></div><p class="bookmark-copy">' + escapeHtml(item.title) + '</p><div class="bookmark-author"><a href="' + item.url + '" target="_blank" rel="noreferrer">' + escapeHtml(item.author) + ' ↗</a></div></article>';
    }).join("") : '<p class="empty-state">No hay señales que respondan a esa búsqueda.</p>';
    var button = document.getElementById("load-more");
    button.disabled = state.visible >= state.filtered.length;
    button.textContent = button.disabled ? "fin de la cola" : "cargar más registros";
  }

  function escapeHtml(value) { return value.replace(/[&<>"']/g, function (character) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]; }); }
  function applyFilters() {
    var query = normalize(document.getElementById("search-input").value.trim());
    var type = document.getElementById("type-filter").value;
    state.filtered = state.all.filter(function (item) { return (!query || item.search.indexOf(query) > -1) && (type === "all" || item.type === type); });
    state.visible = 12;
    renderList();
  }

  function bindControls() {
    document.getElementById("search-input").addEventListener("input", applyFilters);
    document.getElementById("type-filter").addEventListener("change", applyFilters);
    document.getElementById("load-more").addEventListener("click", function () { state.visible += 12; renderList(); });
    document.getElementById("shuffle-button").addEventListener("click", function () { state.all.sort(function () { return Math.random() - .5; }); applyFilters(); });
  }

  function start(source) {
    state.all = parseSource(source);
    if (!state.all.length) state.all = sampleData();
    state.filtered = state.all.slice();
    renderStats(); renderList(); bindControls();
    setText("load-status", state.all.length + " registros indexados");
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (window.DesignSystem) window.DesignSystem.processAnnotations();
    fetch("bookmarks.md").then(function (response) { if (!response.ok) throw new Error("source unavailable"); return response.text(); }).then(start).catch(function () { start(""); setText("load-status", "muestra local · fuente no disponible"); });
  });
})();