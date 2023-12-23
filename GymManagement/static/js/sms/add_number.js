
$(document).ready(function(){

    $('#add_sms_number_form').validate({
        rules:{
            email:{
                required: true
            }
            
        },
        submitHandler: function(){
            let user_url = $('#add_sms_number_form').attr('action');

            $.ajax({
                url: user_url,
                type: 'POST',
                dataType: 'json',
                data: $('#add_sms_number_form').serialize(),
                beforeSend: function() {
                    // setting a timeout
                    $('.loading').show();
                },
                success:function(data){

                    if(data.error==0){
                        bootbox.alert(data.msg, function(){

                            window.location.replace('/sms/number/');
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
    $('.add_number_section').hide();
    $('body').on('change', '#provider', function(){

        let provider_id = $(this).val();

        $.ajax({
            url: '/sms/range-list/',
            type: 'GET',
            dataType: 'json',
            data: {"provider_id":provider_id},
            beforeSend: function() {
                // setting a timeout
                $('.loading').show();
            },
            success:function(data){
                range_option = '<option value="">Select</option>';
                if(data.error==0){
                    
                    let range_list = data.range_data
                    $.each(range_list, function(i, v){

                        range_option += '<option value="'+v.id+'">'+v.range_name+'</option>';
                    });
                }
                $("#range").html(range_option);
            },
            complete: function() {

                $('.loading').hide();
            },  
        });     
    }).on('click', '#single_number', function(){

        $('.add_number_section').hide();
        if($(this).prop('checked') == true){

            $('#single_number_section').show();
        }
    }).on('click', '#series_number', function(){

        $('.add_number_section').hide();
        if($(this).prop('checked') == true){

            $('#series_number_section1, #series_number_section2').show();
        }
    }).on('click', '#csv_number', function(){

        $('.add_number_section').hide();
        if($(this).prop('checked') == true){

            $('#number_type_section').show();
        }
    });
});