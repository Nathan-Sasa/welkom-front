import { Directive, ElementRef, Input, AfterViewInit, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[wlkEntryAnim]'
})
export class EntryAnimDirective implements AfterViewInit, OnDestroy {
    @Input() delay = 200
    @Input() threshold = 0.5
    @Input() translateY = 5
    @Input() speed = 300

    private hasAnimated = false

    private el: HTMLElement;
    private observer!: IntersectionObserver
    
    constructor(
        ref: ElementRef<HTMLElement>,
        // ref: ElementRef,
        private render: Renderer2
    ) { 
        this.el = ref.nativeElement
    }

    ngAfterViewInit(): void {
        this.observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !this.hasAnimated){
                    // this.el.style.animationDelay = `${this.delay}`
                    
                    // this.el.style. 
				    // card.style.setProperty('--mouse-x', `${x}px`);

                    
                    // this.el.style.animation = `fadeIn 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`
                    this.el.style.setProperty(`--entryDelay`, `${this.delay}ms`)
                    this.el.style.setProperty('--entryTranslate', `${this.translateY}%`)
                    this.el.style.setProperty('--entrySpeed', `${this.speed}ms`)
                    this.render.addClass(this.el, 'elVisible')
                    
                    this.hasAnimated = true
					this.observer.disconnect()
                } 
                // else {
                //     // this.el.style.opacity ='0'
                //     this.render.removeClass(this.el, 'elVisible')
                // }
            },
            {
                threshold: this.threshold
            }
        )
        this.observer.observe(this.el)
    }

    ngOnDestroy(): void {
        if(this.observer) {
			this.observer.disconnect()
		}
    }




}