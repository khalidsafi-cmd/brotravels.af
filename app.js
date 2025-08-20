/* ========= Preloader (jQuery DOM control) ========= */
$(window).on('load', function () {
  setTimeout(() => {
    $('#preloader').addClass('hidden');
    // Remove after transition for better perf
    setTimeout(() => $('#preloader').remove(), 400);
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

/* ========= Contact form: Bootstrap validation + fake submit ========= */
(() => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  // Prefill package if user clicks "Book"
  document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sel = document.getElementById('pkg');
      const wanted = btn.dataset.package;
      [...sel.options].forEach(o => {
        if (o.textContent.includes(wanted)) sel.value = o.value || o.textContent;
      });
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }
    status.textContent = 'Sending…';
    setTimeout(() => {
      status.textContent = 'Thanks! We’ll email you shortly with next steps.';
      form.reset();
      form.classList.remove('was-validated');
    }, 600);
  });
})();

/* ========= Footer year ========= */
document.getElementById('year').textContent = new Date().getFullYear();


