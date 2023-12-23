$(function() {
  // select2 dropdown
  $('.select2').select2({
    minimumResultsForSearch: Infinity,
    width: '100%'
  });

  // Select2 by showing the search
  $('.select2-show-search').select2({
    minimumResultsForSearch: '',
    width: '100%'
  });

  // select2 style-01
  function select2Style1(data) {
    if (!data.id) {
      return data.text;
    }
    var $data = $(
      '<span><img src="https://laravelui.spruko.com/noa/assets/images/users/' +
        data.element.value.toLowerCase() +
        '.jpg" class="rounded-circle avatar-sm" /> ' +
        data.text +
        '</span>'
    );
    return $data;
  }

  $(".select2-style1").select2({
    templateResult: select2Style1,
    templateSelection: select2Style1
  });
  // select2 style-01 ends
  
});

// DatePicker
$(function () {
  $(".datepicker").datepicker({ 
        autoclose: true, 
        todayHighlight: false
  })
});


// Editor
(function (e) {
  'use strict';
  $('.summernote').summernote({
    height: 120
  });
})();
