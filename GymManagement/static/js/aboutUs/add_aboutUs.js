$(document).ready(function(){
    $('#add_aboutUs_form').validate({
        rules:{
            aboutUs_question : {
                required : true
            }
        },
        submitHandler: function(){

            let aboutUs_url = $('#add_aboutUs_form').attr('action');
            $.ajax({
                url : aboutUs_url,
                type : 'POST',
                dataType : 'json',
                data : $('#add_aboutUs_form').serialize(),
                beforeSend: function() {
                    // setting a timeout
                    $('.loading').show();
                },
                success : function(data){
                    $("#global-loader").hide();
                    bootbox.alert(data.msg);
                    if(data.error == 0){

                        setTimeout(function(){

                            location.replace('/aboutUs');
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