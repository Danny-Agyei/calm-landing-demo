const navToggleButton = document.getElementById( 'js-nav-menu-toggler' );
const navLinks = document.querySelectorAll( '.nav__link' );

function navMenuToggler () {
   const nav = document.getElementById( 'js-nav-main' );
   const html = document.querySelector( 'html' );
   const hasExpanded = nav.classList.contains( 'has-expanded' );

   if ( this.classList.contains( 'nav__link' ) || hasExpanded ) {
      html.classList.remove( 'no-scroll' );
      nav.classList.remove( 'has-expanded' );

      return;
   }

   nav.classList.add( 'has-expanded' );
   html.classList.add( 'no-scroll' );
}

navToggleButton.addEventListener( 'click', navMenuToggler );
navLinks.forEach( ( link ) => link.addEventListener( 'click', navMenuToggler ) );

// You can also pass an optional settings object
// below listed default settings
// AOS.init({
//    // Global settings:
//    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
//    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
//    initClassName: 'aos-init', // class applied after initialization
//    animatedClassName: 'aos-animate', // class applied on animation
//    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
//    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
//    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
//    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

//    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
//    offset: 120, // offset (in px) from the original trigger point
//    delay: 0, // values from 0 to 3000, with step 50ms
//    duration: 400, // values from 0 to 3000, with step 50ms
//    easing: 'ease', // default easing for AOS animations
//    once: false, // whether animation should happen only once - while scrolling down
//    mirror: false, // whether elements should animate out while scrolling past them
//    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
// });

// SCROLL REVEAL

const oasis = {
   delay: 0,
   duration: 900,
   disable: false,
   offset: 50,
   easing: 'ease',
   animate: null,
   init ( options ) {
      const itemsToObserve = document.querySelectorAll( '[data-oasis]' );

      // if ( options ) {
      //    const { offset, duration, delay, disable, easing } = options;

      //    this.duration = duration || duration;
      //    this.delay = delay || delay;
      //    this.disable = disable || disable;
      //    this.easing = easing || easing;
      //    this.offset = offset || offset;
      // }

      if ( itemsToObserve.length === 0 ) return;

      const observer = new IntersectionObserver( this.revealHandler.bind( this ), {
         root: null,
         threshold: 0,
         rootMargin: '100px',
      });

      itemsToObserve.forEach( ( item ) => {
         this.generateStyles( item.getAttribute( 'data-oasis' ) );
         Object.assign( item.style, {
            transition: `all ${this.duration}ms ${this.delay}ms ${this.easing}`,
            ...this.animate.from
         });

         item.parentNode.style.overflow = 'hidden';
         observer.observe( item );
      });
   },

   generateStyles ( key ) {
      const CommonData = {
         from: {
            transform: `translateY(${this.offset}px)`,
            opacity: 0,
            visibility: 'hidden',
         },
         to: { transform: `unset`, visibility: 'visible', opacity: 1 },
      };
      let animationData = null;

      switch ( key ) {
      case 'fade-up':
         animationData = CommonData;
         break;

      case 'fade-down':
         animationData = {
            ...CommonData,
            from: { transform: `translateY(-${this.offset}px)` },
         };

         break;

      default:
         throw Error( 'key does not exist' );
      }

      this.animate = animationData;
   },

   revealHandler ( entries, observe ) {
      entries.forEach( ( entry ) => {
         const target = entry.target;

         if ( entry.isIntersecting ) {
            console.log( target )
            Object.assign( target.style, this.animate.to )
         }
      });
   },
};

// oasis.init();
document.addEventListener( 'DOMContentLoaded', () => oasis.init() )