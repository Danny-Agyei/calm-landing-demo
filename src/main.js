const navToggleButton = document.getElementById( 'js-nav-menu-toggler' );

navToggleButton.addEventListener( 'click', function () {
   const nav = document.getElementById( 'js-nav-main' );
   const hasExpanded = nav.classList.contains( 'has-expanded' );

   nav.classList.toggle( 'has-expanded', !hasExpanded );
   console.log( 'first' );
});
