import { gsap } from 'gsap';

const EASE = 'power3.out';

export function buildWelkomTimeline(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ repeat: -1, defaults: { ease: EASE } });

  // Scène 1 — Créer
  tl.addLabel('create', 0)
    .fromTo(q('.form-card'), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.2)
    .fromTo(q('.field'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.35 }, 0.9)
    .fromTo(q('.cta'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 2.2)
    .to(q('.cta'), { scale: 0.97, duration: 0.15, yoyo: true, repeat: 1 }, 2.9)
    .call(() => setStep(root, 0), [], 0.2);

  // Scène 2 — Inviter : la carte formulaire se morphe en invitation
  tl.addLabel('invite', 3.2)
    .to(q('.form-card'), {
      width: 300, height: 420, borderColor: '#C9A45C', duration: 0.9, ease: 'power2.inOut',
    }, 3.2)
    .fromTo(q('.invite-content'), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 3.9)
    .fromTo(q('.guest'), { autoAlpha: 0, scale: 0.85 },
      { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.12 }, 4.9)
    .fromTo(q('.guest-link'), { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.7, stagger: 0.12, ease: 'power1.inOut' }, 5.1)
    .call(() => setStep(root, 1), [], 3.2);

  // Scènes 3, 4, 5 : même logique (labels 'confirm' 7.0, 'welcome' 10.2, 'signature' 13.4)
  // Fin : le logo se réduit vers .seed, qui rejoint le point de départ de la scène 1
  return tl;
}

function setStep(root: HTMLElement, i: number) {
  root.querySelectorAll('.step').forEach((el, k) =>
    el.classList.toggle('is-active', k === i));
}