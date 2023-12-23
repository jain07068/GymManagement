$(document).ready(function(){

    $('#create_project_form').validate({
        rules:{

            "client_id" : {
                required : true
            },
            "budget": {
                required: true,
                customBudgetFormat: true
            },

            "billing_primary_contact":{
                number : true,
                validMobileNumber: true,
            },
            "billing_secondary_contact":{
                number : true,
                validMobileNumber: true,
            },
            "shipping_primary_contact":{
                number : true,
                validMobileNumber: true,
            },
            "shipping_secondary_contact":{
                number : true,
                validMobileNumber: true,
            },
            "quantity":{
                customBudgetFormat: true
            }
        },
        messages: {
            "budget": {
                customBudgetFormat: "Enter valid budget format (e.g., 100/200/300)"
            },
            "quantity": {
                customBudgetFormat: "Enter valid quantity format (e.g., 100/200/300)"
            }
            // other messages...
        },
        submitHandler: function(){

            let project_url = $('#create_project_form').attr('action');
            var project_data = new FormData($('#create_project_form')[0]);
            project_data = appendImageDataFromFancyDrop(project_data);
            $.ajax({
                url : project_url,
                type : 'POST',
                dataType : 'json',
                data : project_data,
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function() {
                    // setting a timeout
                    $('.loading').show();
                },
                success : function(data){
                    bootbox.alert(data.msg);
                    if(data.error == 0){

                        setTimeout(function(){
                            let project_id = data.detail.id
                            location.replace('/project/detail/'+project_id);
                        }, 3000);
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

    // Define a custom validation method for budget format
    $.validator.addMethod("customBudgetFormat", function(value, element) {
        return /^\d+(\/\d+)*$/.test(value);
    }, "Enter valid budget format (e.g., 100/200/300)");

    $('.select2, #additional_project_lead').select2({"width":"100%"});
    $('#dimension_unit').select2({"width":"25%"});
    $('body').on('click', '#add_project_button', function(){

        

        // $("#create_project_form").submit();
    }).on('click', '.project_detail_next', function(){
        
        if($("#create_project_form").valid()){

            $('#client_detail_tab, #address_detail_tab, #client, #address').removeClass('active');
            $('#product_detail_tab, #product').addClass('active');
            $(window).scrollTop(0);
        }
    }).on('click', '.project_detail_back', function(){

        $('#client_detail_tab, #address_detail_tab, #client, #address').removeClass('active');
        $('#product_detail_tab, #product').addClass('active');
        $(window).scrollTop(0);
    }).on('click', '.client_detail_back', function(){
        
        $('#product_detail_tab, #address_detail_tab, #product, #address').removeClass('active');
        $('#client_detail_tab, #client').addClass('active');
        $(window).scrollTop(0);
    }).on('click', '.address_detail_next', function(){
        
        if($("#create_project_form").valid()){

            $('#product_detail_tab, #client_detail_tab, #product, #client').removeClass('active');
            $('#address_detail_tab, #address').addClass('active');
            $(window).scrollTop(0);
        }
    }).on('change', '#client_id', function(){

        let client_id = $(this).val();
        let list_client = '<option value="">Select Contact</option>';
        $.ajax({

            url : '/user/sub-user/'+client_id,
            dataType : 'json',
            success : function(data){

                if(data.error == 0){

                    let client_list = data.client_list;
                    $.each(client_list, function(i, v){

                        list_client += '<option value="'+v.id+'">'+v.full_name+'</option>';
                    });
                    $('#manager_id').html(list_client).select2({"width":"100%"});
                }
            }
        });

        if(client_id){

            brand_option = '<option value="">Select Brand</option>';
            $.ajax({

                url : '/user/brand-list/'+client_id,
                type : 'get',
                dataType : 'json',
                success : function(data){
                    
                    if(data.error == 0){

                        let brand_list = data.brand_list;
                        $.each(brand_list, function(i, v){

                            brand_option += '<option value="'+v.id+'">'+v.brand_name+'</option>';
                        });
                    }
                    $('#brand_id').prop('disabled', false);
                    $('#brand_id').html(brand_option).select2({'width':'100%'});
                }                 
            });
        }else {
            // Disable brand_id select and reset its value
            $('#brand_id').prop('disabled', true).val('');
        }
    }).on('click', '#same_billing_address', function(){

        if($(this).prop('checked') == true){

            $('#billing_address').val($('#shipping_address').val());
            $('#billing_zip_code').val($('#shipping_zip_code').val());
            $('#billing_primary_contact').val($('#shipping_primary_contact').val());
            $('#billing_secondary_contact').val($('#shipping_secondary_contact').val());
            $('#billing_additional_information').val($('#shipping_additional_information').val());
            $('#billing_city').val($('#shipping_city').val());
            $('#billing_country_id').val($('#shipping_country_id').val()).select2({"width":"100%"});
            $('#billing_state_id').html($('#shipping_state_id').html()).val($('#shipping_state_id').val()).select2({"width":"100%"});
        }
    });

    $('body').on('change', '#billing_country_id', function(){

        let country_id = $(this).val();
        let state_id = $("#billing_state_edit_id").val();
        stateListByCountryId(country_id, 'billing_state_id', state_id);
    }).on('change', '#shipping_country_id', function(){

        let country_id = $(this).val();
        let state_id = $("#shipping_state_edit_id").val();
        stateListByCountryId(country_id, 'shipping_state_id', state_id);
    });

    $("#idea_required, #market_date, #deadline_date, #shipping_date").datetimepicker({
        format : "Y-m-d",
        timepicker:false,
    });

    $('#product_images').FancyFileUpload({
        
    });

    let uploaded_img_html = $("#product_uploaded_file").html();
    $(".ff_fileupload_uploads").append(uploaded_img_html);
    $("#billing_country_id").change();
    $("#shipping_country_id").change();

    $('#additional_product_lead_id').multiselect({
        includeSelectAllOption: true,
    });
});

function stateListByCountryId(country_id, state_index, state_id='', state_name=''){

    if(country_id){

        let state_option = '';
        $.ajax({

            url : '/user/state/'+country_id,
            type : 'get',
            dataType : 'json',
            success : function(data){
                
                if(data.error == 0){

                    let state_list = data.state_list;
                    $.each(state_list, function(i, v){

                        if(v.id == state_id){

                            state_option += '<option value="'+v.id+'" selected>'+v.state_name+'</option>';
                        }else{

                            if(v.state_name == state_name){

                                state_option += '<option value="'+v.id+'" selected>'+v.state_name+'</option>';
                            }else{

                                state_option += '<option value="'+v.id+'">'+v.state_name+'</option>';
                            }
                        }
                    });
                }
                $('#'+state_index).html(state_option).select2({'width':'100%'});
            }
        });
    }
}