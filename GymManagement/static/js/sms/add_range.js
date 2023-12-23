
$(document).ready(function(){

    $('#add_range_form').validate({
        rules:{
            email:{
                required: true
            }
            
        },
        submitHandler: function(){
            let user_url = $('#add_range_form').attr('action');

            $.ajax({
                url: user_url,
                type: 'POST',
                dataType: 'json',
                data: $('#add_range_form').serialize(),
                beforeSend: function() {
                    // setting a timeout
                    $('.loading').show();
                },
                success:function(data){

                    if(data.error==0){
                        bootbox.alert(data.msg, function(){

                            window.location.replace('/sms/range/');
                        });
                    }else{
                        bootbox.alert(data.msg);
                        // window.location.replace('/sms/provider/');
                    }
                },
                complete: function() {

                    $('.loading').hide();
                },  
            });                   
        }
    });

    $('.select2').select2({"width":"100%"});
});