/* ==========================================================================
   YUPC events — the ONLY place you need to edit to add or change an event.

   Each entry:  { date: 'YYYY-MM-DD', name: 'Event name', meta: 'optional detail', link: 'optional URL' }

   Upcoming vs. past is worked out automatically from today's date, so you
   never have to move an event between lists. Order in this file doesn't matter.
   ========================================================================== */
window.YUPC_EVENTS = [

  /* ---- 2026–27 ---- */
  { date: '2026-12-05', name: 'Masterclass with Michelle Cann', meta: 'Performers to be announced' },
  { date: '2026-12-03', name: 'Fall 2026 Duos Concert' },
  { date: '2026-11-07', name: 'Masterclass with Jeffrey Cohen', meta: 'Performers to be announced' },
  { date: '2026-10-29', name: 'First-Year Showcase' },

  /* ---- 2025–26 ---- */
  { date: '2026-04-28', name: 'Spring 2026 Duos Concert', meta: 'Parker Recital Hall, Hendrie Hall' },
  { date: '2026-04-11', name: 'Masterclass with Jose Ramon Mendez', meta: 'Silliman College Common Room' },
  { date: '2026-03-28', name: 'Masterclass with Melvin Chen', meta: 'Silliman College Common Room' },
  { date: '2026-02-14', name: 'Masterclass with Keiko Sekino', meta: 'Silliman College Common Room' },
  { date: '2025-11-15', name: 'Masterclass with Young Kim', meta: 'Silliman College Common Room' },
  { date: '2025-11-01', name: 'Masterclass with Anne-Marie McDermott', meta: 'Silliman College Common Room' },
  { date: '2025-10-12', name: '2025–26 New Member Showcase', meta: 'Sudler Recital Hall' },
  { date: '2025-10-04', name: 'Masterclass with Boris Berman', meta: 'Silliman College Common Room' }
];

/* ---- Rendering (no need to edit below) ---- */
(function () {
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function parse(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function row(ev) {
    var d = parse(ev.date);
    var html = '<div class="ev">' +
      '<div class="ev__date">' + DAYS[d.getDay()] + ' · ' + d.getFullYear() +
        '<b>' + MONTHS[d.getMonth()] + ' ' + d.getDate() + '</b></div>' +
      '<div class="ev__name">' + esc(ev.name) +
        (ev.meta ? '<span class="ev__meta">' + esc(ev.meta) + '</span>' : '') + '</div>' +
      (ev.link ? '<a class="ev__link" href="' + esc(ev.link) + '" target="_blank" rel="noopener">Details →</a>' : '<span></span>') +
      '</div>';
    return html;
  }

  function render(el, list, emptyText) {
    if (!el) return;
    el.innerHTML = list.length ? list.map(row).join('') : '<p class="events-empty">' + emptyText + '</p>';
  }

  var today = new Date(); today.setHours(0, 0, 0, 0);
  var all = window.YUPC_EVENTS.slice().sort(function (a, b) { return parse(a.date) - parse(b.date); });
  var upcoming = all.filter(function (e) { return parse(e.date) >= today; });
  var past = all.filter(function (e) { return parse(e.date) < today; }).reverse();

  render(document.getElementById('upcoming-list'), upcoming, 'More events coming soon — check back shortly.');
  render(document.getElementById('past-list'), past, 'Nothing here yet.');

  var home = document.getElementById('home-upcoming');
  if (home) {
    var limit = +home.getAttribute('data-limit') || 4;
    render(home, upcoming.slice(0, limit), 'More events coming soon.');
  }
})();
