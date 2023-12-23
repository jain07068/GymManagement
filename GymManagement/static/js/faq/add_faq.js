$(document).ready(function(){
    $('#add_faq_form').validate({
        rules:{
            faq_question : {
                required : true
            }
        },
        submitHandler: function(){

            let faq_url = $('#add_faq_form').attr('action');
            $.ajax({
                url : faq_url,
                type : 'POST',
                dataType : 'json',
                data : $('#add_faq_form').serialize(),
                beforeSend: function() {
                    // setting a timeout
                    $('.loading').show();
                },
                success : function(data){
                    $("#global-loader").hide();
                    bootbox.alert(data.msg);
                    if(data.error == 0){

                        setTimeout(function(){

                            location.replace('/faq');
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