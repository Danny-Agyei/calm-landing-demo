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

// 
AOS.init({
   duration: 1000,
   once: true
})