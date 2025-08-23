/* ========= Preloader (jQuery DOM control) ========= */
$(window).on('load', function () {
  setTimeout(() => {
    $('#preloader').addClass('hidden');
    // Remove after transition for better perf
    setTimeout(() => $('#preloader').remove(), 400);
    // Show WhatsApp icon after preloader
    $('.whatsapp-float').removeClass('preloader-hidden');
  }, 400);
});

/* ========= Smooth scroll with navbar offset ========= */
$('a[href^="#"]').on('click', function (e) {
  const href = $(this).attr('href');
  if (!href || href === '#') return;
  const $target = $(href);
  if (!$target.length) return;

  e.preventDefault();
  const headerHeight = $('#mainNav').outerHeight() || 70;
  const offsetTop = $target.offset().top - (headerHeight + 6);

  window.scrollTo({ top: offsetTop, behavior: 'smooth' });

  // Close mobile menu after click
  const collapse = bootstrap.Collapse.getOrCreateInstance($('#navMenu')[0]);
  collapse.hide();
});

/* ========= Packages: filter buttons ========= */
$('.filter-btn').on('click', function () {
  $('.filter-btn').removeClass('active');
  $(this).addClass('active');

  const filter = $(this).data('filter');
  if (filter === 'all') {
    $('.package').show();
  } else {
    $('.package').each(function () {
      $(this).toggle($(this).data('difficulty') === filter);
    });
  }
});

/* ========= Recommendations: collapse triggers ========= */
$('.more-btn').on('click', function () {
  const targetSel = $(this).data('target');
  const $target = $(targetSel);
  const c = bootstrap.Collapse.getOrCreateInstance($target[0]);
  c.toggle();
});

/* ========= Contact form: Bootstrap validation + REAL submit to Web3Forms ========= */
(() => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  // Prefill package if user clicks "Book"
  document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sel = document.getElementById('pkg');
      const wanted = btn.dataset.package;
      if (!sel) return;
      [...sel.options].forEach(o => {
        if (o.textContent.includes(wanted)) sel.value = o.value || o.textContent;
      });
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Bootstrap validation
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    status.textContent = 'Sending…';

    try {
      // Build payload exactly as Web3Forms expects (multipart/form-data)
      const data = new FormData(form);

      // Optional but recommended extras:
      // data.append('subject', 'New Inquiry — BroTravels AFG');
      // data.append('from_name', 'BroTravels AFG Website');

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      const result = await res.json();

      if (res.ok) {
        status.textContent = 'Thanks! We’ll email you shortly with next steps.';
        form.reset();
        form.classList.remove('was-validated');
      } else {
        // Web3Forms returns a helpful message when something’s misconfigured
        status.textContent = result.message || 'Submission failed. Please try again.';
      }
    } catch (err) {
      status.textContent = 'Network error. Please try again.';
    }
  });
})();

/* ========= Footer year ========= */
document.getElementById('year').textContent = new Date().getFullYear();


