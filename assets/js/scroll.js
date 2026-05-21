(function () {
  const NAV_HEIGHT = 60;
  const DURATION = 950;      // ms — 느릿하게
  const MOBILE_BREAKPOINT = 768;

  let isAnimating = false;

  // easeInOutQuart: 처음엔 천천히 → 중간에 빠르게 → 끝에 다시 천천히
  function ease(t) {
    return t < 0.5
      ? 8 * t * t * t * t
      : 1 - Math.pow(-2 * t + 2, 4) / 2;
  }

  function getSections() {
    return Array.from(document.querySelectorAll('section'));
  }

  function getCurrentIndex(sections) {
    let closest = 0;
    let minDist = Infinity;
    sections.forEach((s, i) => {
      const dist = Math.abs(s.getBoundingClientRect().top - NAV_HEIGHT);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    return closest;
  }

  function animateTo(targetY) {
    if (isAnimating) return;
    isAnimating = true;

    const startY = window.scrollY;
    const delta = targetY - startY;
    let startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      window.scrollTo(0, startY + delta * ease(progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        isAnimating = false;
      }
    }

    requestAnimationFrame(step);
  }

  function scrollToSection(index) {
    const sections = getSections();
    if (index < 0 || index >= sections.length) return;
    const targetY = sections[index].offsetTop - NAV_HEIGHT;
    animateTo(targetY);
  }

  // 휠 이벤트
  window.addEventListener('wheel', function (e) {
    if (window.innerWidth <= MOBILE_BREAKPOINT) return;
    e.preventDefault();
    if (isAnimating) return;

    const sections = getSections();
    const current = getCurrentIndex(sections);
    scrollToSection(e.deltaY > 0 ? current + 1 : current - 1);
  }, { passive: false });

  // 터치 이벤트 (태블릿 대응)
  let touchStartY = 0;
  window.addEventListener('touchstart', function (e) {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', function (e) {
    if (window.innerWidth <= MOBILE_BREAKPOINT) return;
    const diff = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) < 40) return;
    if (isAnimating) return;

    const sections = getSections();
    const current = getCurrentIndex(sections);
    scrollToSection(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  // nav 링크 클릭 → 동일 애니메이션으로 해당 섹션 이동
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const targetY = target.offsetTop - NAV_HEIGHT;
      animateTo(targetY);
    });
  });

  // 키보드 지원 (PageDown / PageUp / 화살표)
  window.addEventListener('keydown', function (e) {
    if (window.innerWidth <= MOBILE_BREAKPOINT) return;
    const sections = getSections();
    const current = getCurrentIndex(sections);
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      scrollToSection(current + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      scrollToSection(current - 1);
    }
  });
})();
