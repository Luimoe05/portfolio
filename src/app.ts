const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const headCanvas = document.querySelector<HTMLCanvasElement>('[data-head-study]');
const headControl = document.querySelector<HTMLButtonElement>('[data-head-control]');
if(headCanvas && headControl) {
  import('./head-study.ts').then(({mountHeadStudy}) => mountHeadStudy(headCanvas,headControl)).catch(() => {
    const study = headCanvas.closest<HTMLElement>('.head-study');
    if(study) study.hidden = true;
    document.querySelector('.introduction')?.classList.add('head-unavailable');
  });
}

const navToggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const siteHeader = document.querySelector<HTMLElement>('.site-header');
if(navToggle && siteHeader) {
  const compactNavigation = window.matchMedia('(max-width: 720px)');
  const setMenu = (open: boolean) => {
    navToggle.setAttribute('aria-expanded',String(open));
    siteHeader.classList.toggle('is-menu-open',open);
  };
  const syncNavigation = () => {
    setMenu(false);
    navToggle.hidden = !compactNavigation.matches;
  };
  siteHeader.classList.add('nav-enhanced');
  syncNavigation();
  compactNavigation.addEventListener('change',syncNavigation);
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    setMenu(open);
    if(open) siteHeader.querySelector<HTMLAnchorElement>('nav a')?.focus();
  });
  document.addEventListener('keydown', event => {
    if(event.key !== 'Escape' || navToggle.getAttribute('aria-expanded') !== 'true') return;
    setMenu(false);
    navToggle.focus();
  });
  document.addEventListener('click', event => {
    if(event.target instanceof Node && !siteHeader.contains(event.target)) setMenu(false);
  });
  siteHeader.addEventListener('focusout', event => {
    if(event.relatedTarget instanceof Node && !siteHeader.contains(event.relatedTarget)) setMenu(false);
  });
}

const themeSwitch = document.querySelector<HTMLButtonElement>('[data-theme-switch]');
if(themeSwitch) {
  const root = document.documentElement;
  let themeTimer: ReturnType<typeof setTimeout> | undefined;
  const setTheme = (theme: 'light' | 'dark', animate = false) => {
    clearTimeout(themeTimer);
    root.classList.toggle('theme-changing',animate && !reducedMotion.matches);
    root.dataset.theme = theme;
    themeSwitch.setAttribute('aria-checked',String(theme === 'dark'));
    themeSwitch.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content',theme === 'light' ? '#f6f3ed' : '#1b1a18');
    if(animate) themeTimer = setTimeout(() => root.classList.remove('theme-changing'),400);
  };
  setTheme(root.dataset.theme === 'light' ? 'light' : 'dark');
  themeSwitch.hidden = false;
  const chooseTheme = (theme: 'light' | 'dark') => {
    if(root.dataset.theme === theme) return;
    setTheme(theme,true);
    try { localStorage.setItem('portfolio-theme',theme); } catch { /* Still works for this page when storage is unavailable. */ }
  };
  themeSwitch.addEventListener('click', () => chooseTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
  themeSwitch.addEventListener('keydown', event => {
    if(event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    chooseTheme(event.key === 'ArrowLeft' ? 'light' : 'dark');
  });
  window.addEventListener('storage', event => {
    if(event.key === 'portfolio-theme' || event.key === null) setTheme(event.newValue === 'light' ? 'light' : 'dark',true);
  });
  reducedMotion.addEventListener('change', () => {
    if(reducedMotion.matches) {
      clearTimeout(themeTimer);
      root.classList.remove('theme-changing');
    }
  });
}

// Sections stay readable throughout; each gets one small arrival as it enters.
if(!reducedMotion.matches && 'IntersectionObserver' in window) {
  const arrivals = new Map<Element, Animation>();
  const observer = new IntersectionObserver(entries => {
    for(const entry of entries) {
      if(!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if(entry.target.contains(document.activeElement)) continue;
      const animation = entry.target.animate(
        [{opacity:.86,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],
        {duration:420,easing:'cubic-bezier(.22,1,.36,1)'}
      );
      arrivals.set(entry.target,animation);
      animation.onfinish = animation.oncancel = () => arrivals.delete(entry.target);
    }
  },{threshold:.06});
  document.querySelectorAll<HTMLElement>('.home-section, .experience-entry, .case-narrative > section, .photography-row').forEach(section => {
    observer.observe(section);
    section.addEventListener('focusin', () => {
      observer.unobserve(section);
      arrivals.get(section)?.cancel();
    });
  });
  reducedMotion.addEventListener('change', () => {
    if(!reducedMotion.matches) return;
    observer.disconnect();
    arrivals.forEach(animation => animation.cancel());
    arrivals.clear();
  });
}

const miamiTime = document.querySelector<HTMLTimeElement>('[data-miami-time]');
if(miamiTime) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone:'America/New_York', hour:'numeric', minute:'2-digit', timeZoneName:'short'
  });
  let clockTimer: ReturnType<typeof setTimeout>;
  const updateClock = () => {
    clearTimeout(clockTimer);
    const now = new Date();
    const label = formatter.format(now);
    miamiTime.textContent = label;
    miamiTime.dateTime = now.toISOString();
    miamiTime.setAttribute('aria-label',`Current time in Miami: ${label}`);
    miamiTime.hidden = false;
    clockTimer = setTimeout(updateClock,60000 - (Date.now() % 60000));
  };
  updateClock();
  document.addEventListener('visibilitychange', () => {
    if(!document.hidden) updateClock();
  });
}

const contactForm = document.querySelector<HTMLFormElement>('[data-contact-form]');
if(contactForm) {
  const submit = contactForm.querySelector<HTMLButtonElement>('[type="submit"]')!;
  const status = contactForm.querySelector<HTMLElement>('.form-status')!;
  const idleLabel = submit.innerHTML;
  contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    if(submit.disabled || !contactForm.reportValidity()) return;
    const data = Object.fromEntries(new FormData(contactForm).entries());
    if(String(data._honey).trim()) return;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    contactForm.setAttribute('aria-busy','true');
    status.textContent = '';
    status.removeAttribute('data-error');
    try {
      const response = await fetch('https://formsubmit.co/ajax/luismore200528@gmail.com', {
        method:'POST', headers:{'Content-Type':'application/json',Accept:'application/json'},
        body:JSON.stringify(data), signal:AbortSignal.timeout(20000),
      });
      const result: {success?: boolean | string} = await response.json();
      if(!response.ok || (result.success !== true && result.success !== 'true')) throw new Error('Submission failed');
      status.textContent = 'Message submitted. Thanks for reaching out!';
      contactForm.reset();
    } catch {
      status.dataset.error = 'true';
      status.textContent = 'Your message couldn’t be sent. Your text is still here. Please try again in a moment.';
    } finally {
      submit.disabled = false;
      submit.innerHTML = idleLabel;
      contactForm.removeAttribute('aria-busy');
    }
  });
}

document.querySelectorAll<HTMLButtonElement>('[data-copy-email]').forEach(button => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let checkAnimation: Animation | undefined;
  button.addEventListener('click',async () => {
    const label = button.querySelector<HTMLElement>('.copy-label')!;
    const status = document.getElementById('copy-status')!;
    clearTimeout(timer);
    checkAnimation?.cancel();
    button.classList.remove('is-copied');
    try {
      await navigator.clipboard.writeText('luismore200528@gmail.com');
      button.classList.add('is-copied');
      const check = button.querySelector<SVGPathElement>('.copy-check path')!;
      if(!reducedMotion.matches) checkAnimation = check.animate(
        [{strokeDashoffset:'1'},{strokeDashoffset:'0'}],
        {duration:320,delay:60,fill:'backwards',easing:'cubic-bezier(.22,1,.36,1)'}
      );
      label.textContent = 'Copied';
      status.textContent = 'Email address copied to clipboard.';
    } catch {
      label.textContent = 'Select to copy';
      status.textContent = 'Copy unavailable. Select the email address beside this button.';
    }
    timer = setTimeout(() => {
      checkAnimation?.cancel();
      button.classList.remove('is-copied');
      label.textContent = 'Copy email';
      status.textContent = '';
    },3500);
  });
  reducedMotion.addEventListener('change', () => {
    if(reducedMotion.matches) checkAnimation?.cancel();
  });
});

// Native modal semantics keep keyboard focus inside the enlarged-photo viewer.
const photoViewer = document.querySelector<HTMLDialogElement>('[data-photo-viewer]');
const photoTriggers = [...document.querySelectorAll<HTMLAnchorElement>('[data-photo-trigger]')];
if(photoViewer && typeof photoViewer.showModal === 'function' && photoTriggers.length) {
  // Keep the modal outside the page layer that blurs behind it.
  document.body.append(photoViewer);
  const expanded = photoViewer.querySelector<HTMLImageElement>('.photo-viewer-image')!;
  const counter = photoViewer.querySelector<HTMLElement>('.photo-viewer-counter')!;
  const status = photoViewer.querySelector<HTMLElement>('.photo-viewer-status')!;
  const stage = photoViewer.querySelector<HTMLElement>('.photo-viewer-stage')!;
  let zoomAnimation: Animation | undefined;
  const setZoomLabel = (zoomed: boolean) => {
    expanded.setAttribute('aria-pressed', String(zoomed));
    expanded.setAttribute('aria-label', `${expanded.alt}. ${zoomed ? 'Zoom out' : 'Zoom in'}`);
  };
  const animateZoom = (before: DOMRect) => {
    if(reducedMotion.matches) return;
    const after = expanded.getBoundingClientRect();
    if(!after.width || !after.height) return;
    zoomAnimation = expanded.animate([
      {transformOrigin:'0 0', transform:`translate(${before.left - after.left}px, ${before.top - after.top}px) scale(${before.width / after.width}, ${before.height / after.height})`},
      {transformOrigin:'0 0', transform:'none'},
    ], {duration:340, easing:'cubic-bezier(.22,1,.36,1)'});
  };
  const resetZoom = () => {
    zoomAnimation?.cancel();
    stage.classList.remove('is-zoomed');
    stage.style.removeProperty('--photo-zoom-width');
    stage.scrollTo(0, 0);
    setZoomLabel(false);
  };
  const toggleZoom = (event?: MouseEvent) => {
    if(zoomAnimation?.playState === 'running') return;
    const bounds = expanded.getBoundingClientRect();
    if(!bounds.width || !bounds.height) return;
    if(stage.classList.contains('is-zoomed')) {
      resetZoom();
      animateZoom(bounds);
      return;
    }
    const x = event ? (event.clientX - bounds.left) / bounds.width : .5;
    const y = event ? (event.clientY - bounds.top) / bounds.height : .5;
    stage.style.setProperty('--photo-zoom-width', `${bounds.width * 2}px`);
    stage.classList.add('is-zoomed');
    stage.scrollTo({left: x * bounds.width * 2 - stage.clientWidth / 2, top: y * bounds.height * 2 - stage.clientHeight / 2});
    setZoomLabel(true);
    animateZoom(bounds);
  };
  expanded.addEventListener('click', toggleZoom);
  expanded.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleZoom();
    }
  });
  let selected = 0;
  let request = 0;
  let opener: HTMLAnchorElement | undefined;
  let openingAnimation: Animation | undefined;
  const displayPhoto = (index: number) => {
    resetZoom();
    selected = (index + photoTriggers.length) % photoTriggers.length;
    const trigger = photoTriggers[selected];
    const thumbnail = trigger.querySelector<HTMLImageElement>('img')!;
    const token = ++request;
    expanded.src = thumbnail.currentSrc || thumbnail.src;
    expanded.alt = thumbnail.alt;
    setZoomLabel(false);
    counter.textContent = `Photo ${String(selected + 1).padStart(2,'0')} of ${photoTriggers.length}`;
    status.textContent = 'Loading larger image…';
    const full = new Image();
    full.onload = async () => {
      try { await full.decode(); } catch { /* The loaded image can still be displayed. */ }
      if(token !== request || !photoViewer.open) return;
      expanded.src = full.src;
      status.textContent = '';
    };
    full.onerror = () => {
      if(token === request && photoViewer.open) status.textContent = 'Larger image unavailable. Showing the gallery preview.';
    };
    full.src = trigger.href;
  };
  photoTriggers.forEach((trigger,index) => {
    trigger.setAttribute('aria-haspopup','dialog');
    trigger.setAttribute('aria-controls','photo-viewer');
    trigger.addEventListener('click', event => {
    if(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = trigger;
    photoViewer.showModal();
    document.documentElement.classList.add('photo-viewer-open');
    displayPhoto(index);
    if(!reducedMotion.matches) openingAnimation = photoViewer.animate(
      [{opacity:0},{opacity:1}],
      {duration:220,easing:'cubic-bezier(.16,1,.3,1)'}
    );
    });
  });
  photoViewer.querySelector('[data-photo-close]')!.addEventListener('click', () => photoViewer.close());
  photoViewer.querySelector('[data-photo-prev]')!.addEventListener('click', () => displayPhoto(selected - 1));
  photoViewer.querySelector('[data-photo-next]')!.addEventListener('click', () => displayPhoto(selected + 1));
  photoViewer.addEventListener('keydown', event => {
    if(event.key === 'Tab') {
      const controls = [...photoViewer.querySelectorAll<HTMLElement>('button:not([disabled]), [tabindex="0"]')];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if(event.shiftKey && document.activeElement === first) {event.preventDefault(); last.focus();}
      else if(!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus();}
      return;
    }
    if(event.altKey || event.ctrlKey || event.metaKey) return;
    if(event.key === 'ArrowLeft') {event.preventDefault(); displayPhoto(selected - 1);}
    if(event.key === 'ArrowRight') {event.preventDefault(); displayPhoto(selected + 1);}
  });
  const isDismissArea = (target: EventTarget | null) => target instanceof Element && !target.closest('.photo-viewer-image,.photo-viewer-control,.photo-viewer-stage.is-zoomed');
  let backdropPressed = false;
  photoViewer.addEventListener('pointerdown', event => {backdropPressed = isDismissArea(event.target);});
  photoViewer.addEventListener('pointercancel', () => {backdropPressed = false;});
  photoViewer.addEventListener('click', event => {
    if(backdropPressed && isDismissArea(event.target)) photoViewer.close();
    backdropPressed = false;
  });
  photoViewer.addEventListener('close', () => {
    resetZoom();
    request++;
    openingAnimation?.cancel();
    document.documentElement.classList.remove('photo-viewer-open');
    opener?.focus({preventScroll:true});
  });
  reducedMotion.addEventListener('change', () => {
    if(reducedMotion.matches) {
      openingAnimation?.cancel();
      zoomAnimation?.cancel();
    }
  });
}

// A genuine image failure is made explicit, never replaced with an invented UI.
document.querySelectorAll<HTMLImageElement>('.project-image img').forEach(img => {
  const fallback = () => {
    const parent = img.parentElement;
    if(!parent) return;
    if(parent.querySelector('.image-fallback')) return;
    const text = document.createElement('p');
    text.className = 'image-fallback';
    text.textContent = 'Project preview unavailable. Explore the case study for the details.';
    img.hidden = true;
    parent.append(text);
  };
  img.addEventListener('error',fallback);
  if(img.complete && img.naturalWidth === 0) fallback();
});
