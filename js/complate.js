// 
// Written by Seongtaek Lim
// 
window.complate = Cookies.getJSON('complate');
var complate = window.complate;

(function(){

  // 
  // Animated scroll when clicked an anchor link to a bookmark
  // 
  $('a').click(function(e) {
    var href = $(this).attr('href');
    var bookmarkRegex = /^#.+/g;
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

  // 
  // Be aware of scroll position
  //   and reflect it on the sidebar if it exists
  // 
  $(window).scroll(function(e) {
    var nav = $('ul.nav.nav-pills');
    var navExists = nav.length == 1;
    
    if(!navExists) {
      return;
    }

    var _isScrolledIntoView = function(elem) {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();

      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(elem).height();

      return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    };

    var navPillsLi = nav.find('li');
    var navPillsExist = navPillsLi.length > 0;

    if(navPillsExist) {

      navPillsLi.each(function(e) {
        var navPill = $(this).find('a');
        var targetId = $(navPill).attr('href');
        var bookmarkRegex = /#.+/g;
        if(bookmarkRegex.test(targetId) && $(targetId).length == 1) {
          if(_isScrolledIntoView($(targetId))) {
            nav.find('li a').removeClass('hover');
            $(navPill).addClass('hover');
          }
        }
      });
    }
  });

  // 
  // Supporting Data Forms
  // 
  var _updateData = function(name, value) {
    complate.data[name] = value;
    Cookies.set('complate', complate);
  };

  //
  // Supporting Data Fill-Ins in real-time
  //
  var _fillInData = function(name, value) {
    var target = $('*[data-fill-in="' + name + '"]');
    if(target.length > 0) {
      target.each(function(index) {
        // Fill out the target template with data
        //   according to its datatype
        if(Array.isArray(value)) {
          // Array
          $(this).text(value.join(', '));
        }
        else if(typeof value === 'boolean') {
          // Boolean
          $(this).text(name);
        }
        else {
          // String or number
          $(this).text(value);
        }
      });
    }
  };

  // 
  // Supporting Data Forms
  //
  $('input:text.complate-data, input:password.complate-data, textarea.complate-data').keyup(function(e) {
    var name = $(this).data('name');
    if(!name) return;
    var value = $(this).val();
    _updateData(name, value);
    _fillInData(name, value);
  });

  $('input:radio.complate-data, select.complate-data').change(function(e) {
    var name = $(this).data('name');
    if(!name) return;
    var value = $(this).val();
    _updateData(name, value);
    _fillInData(name, value);
  });

  $('input:checkbox.complate-data').change(function(e) {
    var name = $(this).data('name');
    if(!name) return;
    var value = $(this).prop('checked');
    _updateData(name, value);
    _fillInData(name, value);
  });

  // 
  // Entry point
  // 
  $(document).ready(function() {
    if(typeof complate === 'undefined') {
      // This block should only run on the first page of a project
      complate = {};
      complate.data = {};
      Cookies.set('complate', complate);
    }

    // Supporting Data Fill-Ins when the page is loaded
    $('*[data-fill-in]').each(function(index) {
      var name = $(this).data('fill-in');
      if(name in complate.data) {
        var value = complate.data[name];
        $(this).text(value);
      }
    });
  });

})();
