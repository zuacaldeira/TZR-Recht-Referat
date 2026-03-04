import { trigger, transition, style, animate, query, stagger, keyframes } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms ease', style({ opacity: 1 }))
  ])
]);

export const slideUp = trigger('slideUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('500ms ease', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

export const cardFlip = trigger('cardFlip', [
  transition('front => back', [
    animate('600ms ease', style({ transform: 'rotateY(180deg)' }))
  ]),
  transition('back => front', [
    animate('600ms ease', style({ transform: 'rotateY(0)' }))
  ])
]);

export const shake = trigger('shake', [
  transition('* => wrong', [
    animate('500ms ease', keyframes([
      style({ transform: 'translateX(0)', offset: 0 }),
      style({ transform: 'translateX(-5px)', offset: 0.1 }),
      style({ transform: 'translateX(5px)', offset: 0.2 }),
      style({ transform: 'translateX(-5px)', offset: 0.3 }),
      style({ transform: 'translateX(5px)', offset: 0.4 }),
      style({ transform: 'translateX(-5px)', offset: 0.5 }),
      style({ transform: 'translateX(5px)', offset: 0.6 }),
      style({ transform: 'translateX(-5px)', offset: 0.7 }),
      style({ transform: 'translateX(5px)', offset: 0.8 }),
      style({ transform: 'translateX(-5px)', offset: 0.9 }),
      style({ transform: 'translateX(0)', offset: 1 }),
    ]))
  ])
]);

export const pop = trigger('pop', [
  transition('* => correct', [
    animate('400ms ease', keyframes([
      style({ transform: 'scale(0.8)', opacity: 0, offset: 0 }),
      style({ transform: 'scale(1.1)', offset: 0.5 }),
      style({ transform: 'scale(1)', opacity: 1, offset: 1 }),
    ]))
  ])
]);
