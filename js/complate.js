// 
// Written by Seongtaek Lim
// 
(function(){
  $('a').click(function(e) {
    // 
    // Animated scroll when clicked an anchor link to a bookmark
    // 

    var href = $(this).attr('href');
    var bookmarkRegex = /#.+/g;
    if(href == '#') {
      e.preventDefault();
      return;
    }
    else if(bookmarkRegex.test(href)) {
      // Anchor link to a bookmark on the page
      e.preventDefault();
      var target = $(href);
      var targetExists = target.length == 1;

      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 700);

    }
    else {
      // Links to other URLs
      // Do nothing
    }
  });

  var isScrolledIntoView = function(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  };

  $(window).scroll(function(e) {
    // 
    // Be aware of scroll position
    //   and reflect it on the sidebar if it exists
    // 
    var nav = $('ul.nav.nav-pills');
    var navExists = nav.length == 1;
    
    if(!navExists) {
      return;
    }

    var navPillsLi = nav.find('li');
    var navPillsExist = navPillsLi.length > 0;

    if(navPillsExist) {

      navPillsLi.each(function(e) {
        var navPill = $(this).find('a');
        var targetId = $(navPill).attr('href');
        var bookmarkRegex = /#.+/g;
        if(bookmarkRegex.test(targetId) && $(targetId).length == 1) {
          if(isScrolledIntoView($(targetId))) {
            nav.find('li a').removeClass('hover');
            $(navPill).addClass('hover');
          }
        }
      });
    }
  });
})();
