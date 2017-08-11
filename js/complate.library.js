// 
// Written by Seongtaek Lim
// Extends Bootswatch library js
// 
(function(){
  $(window).scroll(function () {
    var top = $(document).scrollTop();
    $('.splash').css({
      'background-position': '0px -'+(top/3).toFixed(2)+'px'
    });
    if(top > 50)
      $('#home > .navbar').removeClass('navbar-transparent');
    else
      $('#home > .navbar').addClass('navbar-transparent');
  });

  $('a[href="#"]').click(function(e) {
    e.preventDefault();
  });

  var $button = $('<div id="source-button" class="btn btn-primary btn-xs">&lt; &gt;</div>').click(function(){
    var html = $(this).parent().html();
    html = cleanSource(html, 'html');
    // Remove script elements if any
    html = _.remove($(html), function(item) {
      return $(item).attr('type') !== 'text/template';
    });
    html = $(html).prop('outerHTML');
    $('#source-modal pre.html').text(html);
    
    var js = $(this).parent().children('script.js');
    if(js.length === 1) {
      js = js.html();
      js = cleanSource(js, 'js');
      $('#source-modal pre.js').text(js);
      $('#source-modal .modal-body.js').addClass('to-be-hidden');
      $('#source-modal .modal-body.js').removeClass('hidden');
    }

    var doc = $(this).parent().children('script.doc');
    if(doc.length === 1) {
      doc = doc.html();
      $('#source-modal div.doc-wrapper').html(doc);
      $('#source-modal .modal-body.doc').addClass('to-be-hidden');
      $('#source-modal .modal-body.doc').removeClass('hidden');
    }

    $('#source-modal').modal();
  });

  $('#source-modal').on('hidden.bs.modal', function(e) {
    // When the modal closes
    $('.to-be-hidden').addClass('hidden');
    $('.to-be-hidden').removeClass('to-be-hidden');
  });

  $('.bs-component [data-toggle="popover"]').popover();
  $('.bs-component [data-toggle="tooltip"]').tooltip();

  $('.bs-component').hover(function(){
    $(this).append($button);
    $button.show();
  }, function(){
    $button.hide();
  });

  function cleanSource(source, mode) {
    if(mode === 'html') {
      source = source.replace(/×/g, '&times;')
                     .replace(/«/g, '&laquo;')
                     .replace(/»/g, '&raquo;')
                     .replace(/←/g, '&larr;')
                     .replace(/→/g, '&rarr;');
    }

    var lines = source.split(/\n/);

    lines.shift();
    lines.splice(-1, 1);

    var indentSize = lines[0].length - lines[0].trim().length,
        re = new RegExp(' {' + indentSize + '}');

    lines = lines.map(function(line){
      if (line.match(re)) {
        line = line.substring(indentSize);
      }

      return line;
    });

    lines = lines.join('\n');

    return lines;
  }

})();
