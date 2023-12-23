$(document).ready(function(){

    $('#status, #client_id').select2({"width":"100%"});



    $("body").on('click', '#submit_brand_section', function(){

        $('#brand_form').validate({
            rules:{
                "pri_phone_number" : {
                    number : true,
                    validMobileNumber: true,
                },
                "add_phone_number" : {
                    number : true,
                    validMobileNumber: true,
                }      },
            submitHandler: function(){

                let brand_url = $('#brand_form').attr('action');
                var brand_data = new FormData($('#brand_form')[0]);
                brand_data = appendImageDataFromFancyDrop(brand_data);

                $.ajax({
                    url : brand_url,
                    type : 'POST',
                    dataType : 'json',
                    data : brand_data,
                    mimeType: "multipart/form-data",
                    contentType: false,
                    cache: false,
                    processData: false,
                    beforeSend: function() {
                        // setting a timeout
                        $('.loading').show();
                    },
                    success : function(data){
                        $("#global-loader").hide();
                        
                        if(data.error == 0){

                            bootbox.alert(data.msg, function(){


                                let brand_company_id = $('#brand_company_id').val();
                                if(brand_company_id){
    
                                    setTimeout(function(){
    
                                        location.replace('/brand/'+brand_company_id);
                                    }, 3000);
                                }else{
    
                                    setTimeout(function(){
    
                                        location.replace('/brand');
                                    }, 3000);
                                }
                            });    
                        }else{

                            bootbox.alert(data.msg);
                        }
                    },
                    complete: function() {
                        $('.loading').hide();
                    },                    
                });
            }
        });

    }).on('click', '#cancel_brand_section', function(){

        // location.replace('/brand');
        let brand_company_id = $('#brand_company_id').val();
        if (brand_company_id) {
            location.replace('/brand/' + brand_company_id);
        } else {
            location.replace('/brand');
        }
    });
    
    $('#brandguidelines_images').FancyFileUpload({
        
    });

    let uploaded_img_html = $("#brandguidelines_uploaded_file").html();
    $("#brand_guidelines_section").find(".ff_fileupload_uploads").append(uploaded_img_html); 

    let uploaded_img = $("#brandlogo_uploaded_file").html();
    $("#brandlogo_section").find(".ff_fileupload_uploads").append(uploaded_img); 

});