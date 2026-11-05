(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  var header = document.querySelector('.site-header');

  function closeSubs(except) {
    document.querySelectorAll('.has-sub.open').forEach(function (li) {
      if (li !== except) {
        li.classList.remove('open');
        li.querySelector('.sub-toggle').setAttribute('aria-expanded', 'false');
      }
    });
  }

  toggle.addEventListener('click', function () {
    var open = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('.sub-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentElement;
      var open = !li.classList.contains('open');
      closeSubs(li);
      li.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeSubs();
    if (header.classList.contains('nav-open')) {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-sub')) closeSubs();
  });

  // Submenu links navigate within the page: close the mobile menu afterwards.
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
