// Mobile menu toggle, footer year, and mailto-based contact form.
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      var f = form.elements;
      if (!f.name.value.trim() || !f.email.checkValidity() || !f.email.value.trim() || !f.message.value.trim()) {
        status.textContent = 'Please fill in your name, a valid email and a message.';
        return;
      }
      var subject = 'Website enquiry: ' + f.interest.value + (f.company.value ? ' (' + f.company.value + ')' : '');
      var body = 'Name: ' + f.name.value + '\nEmail: ' + f.email.value + '\nCompany: ' + f.company.value +
        '\nInterested in: ' + f.interest.value + '\n\n' + f.message.value;
      window.location.href = 'mailto:' + form.dataset.email + '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      status.textContent = 'Opening your email app…';
    });
  }
})();
