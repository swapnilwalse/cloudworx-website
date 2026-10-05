// Mobile menu toggle, footer year, and contact form sent through Web3Forms.
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
      var button = form.querySelector('button[type="submit"]');
      var f = form.elements;
      status.className = 'form-status';
      if (!f.name.value.trim() || !f.email.value.trim() || !f.email.checkValidity() || !f.message.value.trim()) {
        status.classList.add('error');
        status.textContent = 'Please fill in your name, a valid email and a message.';
        return;
      }
      var data = new FormData(form);
      data.append('subject', 'Website enquiry: ' + f.interest.value + (f.company.value ? ' (' + f.company.value + ')' : ''));
      data.append('replyto', f.email.value);
      button.disabled = true;
      status.textContent = 'Sending…';
      fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (res) {
          if (res.success) {
            form.reset();
            status.classList.add('success');
            status.textContent = 'Thank you! Your message has been sent. We will be in touch soon.';
          } else {
            throw new Error(res.message || 'Send failed');
          }
        })
        .catch(function () {
          status.classList.add('error');
          status.innerHTML = 'Sorry, your message could not be sent. Please email us at <a href="mailto:info@cloudworx.in">info@cloudworx.in</a>.';
        })
        .then(function () { button.disabled = false; });
    });
  }
})();
