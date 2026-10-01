import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef,
  NgZone, OnDestroy, PLATFORM_ID, ViewChild, inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { buildWelkomTimeline } from '../timeline';
import { buildQrModules } from '../qr-matrix';

@Component({
    selector: 'wlk-motion-hero',
    imports: [

	],
    templateUrl: './motion-hero.component.html',
    styleUrl: './motion-hero.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MotionHeroComponent implements AfterViewInit, OnDestroy {

	@ViewChild('stage', { static: true }) stage!: ElementRef<HTMLElement>;

  readonly qr = buildQrModules();
  readonly guests = [
    { initials: 'AM', tone: 1 }, { initials: 'JK', tone: 2 },
    { initials: 'SL', tone: 3 }, { initials: 'PN', tone: 4 },
    { initials: 'CB', tone: 5 }, { initials: 'TM', tone: 6 },
  ];
  readonly sparks = Array.from({ length: 10 }, (_, i) => i);
  readonly letters = 'Welkom'.split('');

  private zone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);
  private ctx?: gsap.Context;
  private tl?: gsap.core.Timeline;
  private observer?: IntersectionObserver;
  private destroyed = false;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; // état statique

    const el = this.stage.nativeElement;
    el.classList.add('is-animated');

    this.zone.runOutsideAngular(async () => {
      await document.fonts.ready;
      if (this.destroyed) return;

      this.ctx = gsap.context(() => {
        this.tl = buildWelkomTimeline(el);
      }, el);

      this.observer = new IntersectionObserver(
        ([e]) => (e.isIntersecting ? this.tl?.play() : this.tl?.pause()),
        { threshold: 0.25 },
      );
      this.observer.observe(el);
    });
  }

  ngOnDestroy() {
    this.destroyed = true;
    this.observer?.disconnect();
    this.ctx?.revert();
  }
}
