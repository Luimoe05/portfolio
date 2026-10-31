const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
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

document.querySelectorAll<HTMLAnchorElement>('.hero-key').forEach(buildKey => {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;
  const resetKey = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    buildKey.classList.remove('is-tracking');
    buildKey.style.removeProperty('--key-rx');
    buildKey.style.removeProperty('--key-ry');
  };
  buildKey.addEventListener('pointermove', event => {
    if(reducedMotion.matches || !finePointer.matches) return;
    const bounds = buildKey.getBoundingClientRect();
    pointerX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    pointerY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    if(frame) return;
    frame = requestAnimationFrame(() => {
      buildKey.classList.add('is-tracking');
      buildKey.style.setProperty('--key-rx', `${-pointerY * 8}deg`);
      buildKey.style.setProperty('--key-ry', `${pointerX * 8}deg`);
      frame = 0;
    });
  });
  buildKey.addEventListener('pointerleave', resetKey);
  buildKey.addEventListener('blur', resetKey);
  reducedMotion.addEventListener('change', resetKey);
  finePointer.addEventListener('change', resetKey);
});
// A finite assembly sequence. Every link remains usable while the keys settle.
const keyboard = document.querySelector<HTMLElement>('.hero-keyboard');
if(keyboard) {
  const keys = [...keyboard.querySelectorAll<HTMLElement>('.hero-key')];
  const poses = [
    [-65, 55, -24, 25, -35],
    [20, -85, 20, -40, 25],
    [85, -45, 35, 30, -25],
    [35, 85, -20, -30, 30],
    [90, 65, 28, 35, 20],
    [0, 90, 12, -25, 15],
  ];
  let animations: Animation[] = [];
  const cancelAssembly = () => {
    animations.forEach(animation => animation.cancel());
    animations = [];
  };
  const assemble = () => {
    cancelAssembly();
    if(reducedMotion.matches) return;
    const compact = window.matchMedia('(max-width: 760px)').matches;
    animations = keys.map((key, i) => {
      const [x,y,rz,rx,ry] = poses[i];
      const distance = compact ? .55 : 1;
      return key.animate([
        {transform:`translate3d(${x*distance}px,${y*distance}px,120px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(.82)`,opacity:0,filter:'blur(3px)'},
        {transform:'translate3d(0,0,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)',opacity:1,filter:'blur(0px)'},
      ], {duration:1000,delay:160+i*100,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
    });
  };
  // Focusing a navigation link should immediately reveal its settled position.
  keyboard.addEventListener('focusin', cancelAssembly);
  reducedMotion.addEventListener('change', () => {
    cancelAssembly();
  });
  document.addEventListener('visibilitychange', () => {
    if(document.hidden) cancelAssembly();
  });
  if('IntersectionObserver' in window) {
    const entrance = new IntersectionObserver(entries => {
      if(!entries.some(entry => entry.isIntersecting)) return;
      assemble();
      entrance.disconnect();
    }, {threshold:.25});
    entrance.observe(keyboard);
  } else {
    assemble();
  }
}

const tabList = document.querySelector('.project-tabs');
if(tabList) {
  const tabs = [...tabList.querySelectorAll<HTMLButtonElement>('[data-project]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls') ?? '')!);
  tabList.setAttribute('role','tablist');
  tabList.setAttribute('aria-orientation','horizontal');
  tabs.forEach((tab,i) => {
    tab.setAttribute('role','tab');
    tab.setAttribute('aria-selected',String(i === 0));
    tab.tabIndex = i === 0 ? 0 : -1;
    panels[i].setAttribute('role','tabpanel');
    panels[i].tabIndex = 0;
  });
  let active = 0;
  const select = (index: number,focus = false) => {
    if(focus) tabs[index].focus();
    if(index === active) return;
    panels[active].getAnimations().forEach(animation => animation.cancel());
    tabs.forEach((tab,i) => {
      tab.classList.toggle('is-active',i === index);
      tab.setAttribute('aria-selected',String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    active = index;
    if(!reducedMotion.matches) panels[index].animate([{opacity:0,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,easing:'cubic-bezier(.22,1,.36,1)'});
  };
  tabs.forEach((tab,i) => {
    tab.addEventListener('click',() => select(i));
    tab.addEventListener('keydown',event => {
      let next;
      if(event.key === 'ArrowRight') next = (i+1)%tabs.length;
      if(event.key === 'ArrowLeft') next = (i-1+tabs.length)%tabs.length;
      if(event.key === 'Home') next = 0;
      if(event.key === 'End') next = tabs.length-1;
      if(next !== undefined) { event.preventDefault(); select(next,true); }
    });
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
  button.addEventListener('click',async () => {
    const label = button.querySelector<HTMLElement>('.copy-label')!;
    const status = document.getElementById('copy-status')!;
    clearTimeout(timer);
    try {
      await navigator.clipboard.writeText('luismore200528@gmail.com');
      label.textContent = 'Copied';
      status.textContent = 'Email address copied to clipboard.';
    } catch {
      label.textContent = 'Select to copy';
      status.textContent = 'Copy unavailable. Select the email address beside this button.';
    }
    timer = setTimeout(() => { label.textContent = 'Copy email'; status.textContent = ''; },3500);
  });
});

// Content is visible by default. Motion enhances an already usable document.
if(!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for(const entry of entries) if(entry.isIntersecting) {
      entry.target.animate([{opacity:.6,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:620,easing:'cubic-bezier(.16,1,.3,1)'});
      observer.unobserve(entry.target);
    }
  },{threshold:.08});
  document.querySelectorAll('.case-narrative > section').forEach(section => observer.observe(section));
}

// Native modal semantics keep keyboard focus inside the enlarged-photo viewer.
const photoViewer = document.querySelector<HTMLDialogElement>('[data-photo-viewer]');
const photoTriggers = [...document.querySelectorAll<HTMLAnchorElement>('[data-photo-trigger]')];
if(photoViewer && typeof photoViewer.showModal === 'function' && photoTriggers.length) {
  // Keep the modal outside the page layer that blurs behind it.
  document.body.append(photoViewer);
  const expanded = photoViewer.querySelector<HTMLImageElement>('.photo-viewer-image')!;
  const counter = photoViewer.querySelector<HTMLElement>('.photo-viewer-counter')!;
  const status = photoViewer.querySelector<HTMLElement>('.photo-viewer-status')!;
  let selected = 0;
  let request = 0;
  let opener: HTMLAnchorElement | undefined;
  let openingAnimation: Animation | undefined;
  const displayPhoto = (index: number) => {
    selected = (index + photoTriggers.length) % photoTriggers.length;
    const trigger = photoTriggers[selected];
    const thumbnail = trigger.querySelector<HTMLImageElement>('img')!;
    const token = ++request;
    expanded.src = thumbnail.currentSrc || thumbnail.src;
    expanded.alt = thumbnail.alt;
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
      [{opacity:0,transform:'scale(.98)'},{opacity:1,transform:'scale(1)'}],
      {duration:220,easing:'cubic-bezier(.16,1,.3,1)'}
    );
    });
  });
  photoViewer.querySelector('[data-photo-close]')!.addEventListener('click', () => photoViewer.close());
  photoViewer.querySelector('[data-photo-prev]')!.addEventListener('click', () => displayPhoto(selected - 1));
  photoViewer.querySelector('[data-photo-next]')!.addEventListener('click', () => displayPhoto(selected + 1));
  photoViewer.addEventListener('keydown', event => {
    if(event.key === 'Tab') {
      const controls = [...photoViewer.querySelectorAll<HTMLButtonElement>('button:not([disabled])')];
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
  const isDismissArea = (target: EventTarget | null) => target instanceof Element && !target.closest('.photo-viewer-image,.photo-viewer-control');
  let backdropPressed = false;
  photoViewer.addEventListener('pointerdown', event => {backdropPressed = isDismissArea(event.target);});
  photoViewer.addEventListener('pointercancel', () => {backdropPressed = false;});
  photoViewer.addEventListener('click', event => {
    if(backdropPressed && isDismissArea(event.target)) photoViewer.close();
    backdropPressed = false;
  });
  photoViewer.addEventListener('close', () => {
    request++;
    openingAnimation?.cancel();
    document.documentElement.classList.remove('photo-viewer-open');
    opener?.focus({preventScroll:true});
  });
  reducedMotion.addEventListener('change', () => {
    if(reducedMotion.matches) openingAnimation?.cancel();
  });
}

// Reveal each photograph once it is decoded and enters the viewport.
// Pending visibility is opt-in; the gallery remains visible without JavaScript.
const galleryPhotos = [...document.querySelectorAll<HTMLImageElement>('.photography-grid img')];
if(galleryPhotos.length && !reducedMotion.matches && 'IntersectionObserver' in window) {
  const states = new Map<Element, {ready: boolean; visible: boolean; revealed: boolean; index: number}>();
  const photoAnimations: Animation[] = [];
  const reveal = (figure: HTMLElement) => {
    const state = states.get(figure)!;
    if(!state.ready || !state.visible || state.revealed) return;
    state.revealed = true;
    figure.classList.remove('photo-is-waiting');
    observer.unobserve(figure);
    if(reducedMotion.matches) return;
    photoAnimations.push(figure.animate([
      {opacity:0,transform:'translateY(18px)',filter:'blur(4px)'},
      {opacity:1,transform:'translateY(0)',filter:'blur(0)'},
    ],{duration:850,delay:(state.index % 3)*80,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}));
  };
  const observer = new IntersectionObserver(entries => {
    for(const entry of entries) {
      const state = states.get(entry.target)!;
      state.visible = entry.isIntersecting;
      if(state.visible) reveal(entry.target as HTMLElement);
    }
  },{threshold:.08});
  galleryPhotos.forEach((img,index) => {
    const figure = img.closest<HTMLElement>('figure')!;
    states.set(figure,{ready:false,visible:false,revealed:false,index});
    figure.classList.add('photo-is-waiting');
    // A keyboard user must never land on a transparent, animating photo.
    figure.addEventListener('focusin', () => {
      states.get(figure)!.revealed = true;
      figure.classList.remove('photo-is-waiting');
      figure.getAnimations().forEach(animation => animation.cancel());
      observer.unobserve(figure);
    });
    const loaded = async () => {
      try { await img.decode(); } catch { /* A decoded image can still display after a decode rejection. */ }
      states.get(figure)!.ready = true;
      reveal(figure);
    };
    const failed = () => {
      figure.classList.remove('photo-is-waiting');
      states.get(figure)!.revealed = true;
      observer.unobserve(figure);
    };
    img.addEventListener('load',loaded,{once:true});
    img.addEventListener('error',failed,{once:true});
    observer.observe(figure);
    if(img.complete) {
      if(img.naturalWidth) void loaded();
      else failed();
    }
  });
  reducedMotion.addEventListener('change', () => {
    if(!reducedMotion.matches) return;
    observer.disconnect();
    photoAnimations.forEach(animation => animation.cancel());
    states.forEach((state,figure) => {
      state.revealed = true;
      figure.classList.remove('photo-is-waiting');
    });
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
