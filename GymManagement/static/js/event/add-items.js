$(document).ready(function() {

    $('body').on('click', '.create_category', function(){


        let url = $(this).data('url');

        if($('#crateCategorySection').length > 0){

            $("#crateCategorySection").remove();
        }
        $.ajax({

            url : url,
            // dataType : 'json',
            success : function(data){

                $("body").append(data);
                $("#crateCategorySection").modal('show');
                $('#status').select2({"width":"100%", dropdownParent:$('#crateCategorySection')});
            }
        });
    }).on('click', '#create_category_button', function(){

        let url = $("#category_form").attr('action');

        $('#category_form').validate({
            rules:{

            },
            submitHandler: function(){

                $.ajax({

                    url : url,
                    dataType : 'json',
                    type : "POST",
                    data : $('#category_form').serialize(),
                    beforeSend: function() {
                        // setting a timeout
                        $('.loading').show();
                    },
                    success : function(data){
        
                        if(data.error == 0){
        
                            bootbox.alert(data.msg, function(){

                                location.reload();
                            });
                        }else{

                            bootbox.alert(data.msg);
                        }
                    },
                    error: function(xhr) { // if error occured
                        $('.loading').hide();
                    },
                    complete: function() {
                        $('.loading').hide();
                    }
                });
            }
        });
    });
});