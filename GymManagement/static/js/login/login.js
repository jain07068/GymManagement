$(document).ready(function(){

    $('#elevate-login-form').validate({

        rules : {
            email : {
                required : true
            },
            user_password : {
                required : true
            }
        },
        submitHandler: function(){

            let login_url = $("#elevate-login-form").attr('action');
            $.ajax({
                url : login_url,
                type : 'POST',
                dataType: 'json',
                data : $('#elevate-login-form').serialize(),
                beforeSend: function() {
                    // setting a timeout
                    $('.loading').show();
                },            
                success : function(data){
                    
                    if(data.error == 0){

                        location.reload();
                    }else{

                        bootbox.alert(data.msg);
                    }
                },
                error: function(xhr) { // if error occured
                    $('.loading').hide();
                },
                complete: function() {
                    $('.loading').hide();
                },
            });
        }
    });

    $('body').on('click', '#login-form-button', function(){

        $('#elevate-login-form').submit();
    });
});