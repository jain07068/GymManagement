$(document).ready(function() {

  // Hide the global loader when the page finishes loading
  $('#global-loader').hide();

  // Toggling the password visibility
  $('#showBtn').click(function() {
    var passwordField = $('#passwordElement');
    var eyeOpenIcon = $('#eyeOpen');
    var eyeCloseIcon = $('#eyeClose');

    if (passwordField.attr('type') === 'password') {
      passwordField.attr('type', 'text');
      eyeOpenIcon.addClass('d-none');
      eyeCloseIcon.removeClass('d-none');
    } else {
      passwordField.attr('type', 'password');
      eyeOpenIcon.removeClass('d-none');
      eyeCloseIcon.addClass('d-none');
    }
  });

  // Toggle the 'sidenav-toggled' class on the body element
  $('.app-sidebar__toggle').on('click', function() {
    $('body').toggleClass('sidenav-toggled');
  });

  // Toggle the 'sidenav-toggled' class on mouse hover added on- 18-11-2023
  $('.app-sidebar__toggle').hover(function () {
    $('body').removeClass('sidenav-toggled');
  }, function () {
      $('body').addClass('sidenav-toggled');
  });

  // Hover event handler for elements with class "angle"
  $('.angle').hover(
    function() {
      // Remove the "is-expanded" class from other slide elements on hover
      $('.slide.is-expanded').not($(this).closest('.slide')).removeClass('is-expanded');

      // When mouse hovers, add the "is-expanded" class to the parent submenu if it's not already expanded
      if (!$(this).closest('.slide').hasClass('is-expanded')) {
        $(this).closest('.slide').addClass('is-expanded');
      }
    },
    function() {
      // When mouse moves away, remove the "is-expanded" class from the parent submenu if it's not already expanded
      if (!$(this).children().find('.slide-item').hasClass('active')) {
        $(this).closest('.slide').removeClass('is-expanded');
      }
    }
  );

  // Click event handler for elements with class "angle"
  $('.angle').on('click', function() {
    // Close all open submenus except the one being clicked
    $('.slide.is-expanded').not($(this).closest('.slide')).removeClass('is-expanded');

    // Toggle the "is-expanded" class on the clicked angle icon's parent submenu
    $(this).closest('.slide').toggleClass('is-expanded');
  });


 
 // Add a hover event to elements with class 'side-menu__item'
 $('.app-sidebar .side-menu__item').hover(
  function() {
    // When hovering over, add the 'sidenav-toggled' class to the body element
    $('body').removeClass('sidenav-toggled');
  },
);
$('.app-sidebar .side-menu__logout').hover(
  function() {
    // When hovering over, add the 'sidenav-toggled' class to the body element
    $('body').removeClass('sidenav-toggled');
  },
);

});
