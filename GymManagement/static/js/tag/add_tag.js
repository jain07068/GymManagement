$(document).ready(function(){
    $('#add_tag_form').validate({
        rules:{

        },
        submitHandler: function(){

            let tag_url = $('#add_tag_form').attr('action');
            $.ajax({
                url : tag_url,
                type : 'POST',
                dataType : 'json',
                data : $('#add_tag_form').serialize(),
                beforeSend: function() {
                    // setting a timeout
                    $('.loading').show();
                },
                success : function(data){
                    $("#global-loader").hide();
                    bootbox.alert(data.msg);
                    if(data.error == 0){

                        setTimeout(function(){

                            location.replace('/master/tag');
                        }, 3000);
                    }
                },
                complete: function() {
                    $('.loading').hide();
                },
            });
        }
    });

    $(".select2").select2({"width":"100%"});
});