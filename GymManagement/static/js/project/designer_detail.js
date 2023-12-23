$(document).ready(function(){

    $(".select2").select2({"width":"100%"});

    $("#designer_project_img").FancyFileUpload({
        
    });

    $('#designer_images_form').validate({

        rules:{

        },
        submitHandler:function(){

            let designe_upload_url = $('#designer_images_form').attr('action');
            var design_data = new FormData($('#designer_images_form')[0]);
            design_data = appendImageDataFromFancyDrop(design_data);
            $.ajax({
                url : designe_upload_url,
                type : 'POST',
                dataType : 'json',
                data : design_data,
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

                        desingerProductImages(data.detail.designer_id, data.detail.product_id)
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

    $('body').on('click', '.design_image_detail_section', function(){

        let designer_image_id = $(this).data('id');
        desingerProductImagesView(designer_image_id);
    });

    $('body').on('click', '#product_img_comment_button', function(){


        $('#comment_product_image_section').validate({

            rules:{
    
            },
            submitHandler:function(){
    
                let designe_comment_url = $('#comment_product_image_section').attr('action');
                var design_data = $('#comment_product_image_section').serialize();
                $.ajax({
                    url : designe_comment_url,
                    type : 'POST',
                    dataType : 'json',
                    data : design_data,
                    beforeSend: function() {
                        // setting a timeout
                        $('.loading').show();
                    },
                    success : function(data){
                        // bootbox.alert(data.msg);
                        if(data.error == 0){
    
                            $('#product_img_comment').val('');
                            $('#designer_images_popup').modal('hide');
                            desingerProductImagesView(data.detail.design);
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
    }).on('change', '#designer_product_status', function(){

        let project_status = $(this).val();
        let designer_id = $(this).data('desinger_id');
        let designer_index = $(this);
        $.ajax({

            url : '/project/change-project-designer-status/'+designer_id,
            dataType : 'json',
            data : {
                project_status : project_status
            },
            success : function(data){

                if(data.error == 0){

                    bootbox.alert(data.msg);
                    designer_index.html(data.option_list).select2({"width":"100%"});
                }
            }
        });
    });

    lightGallery(document.getElementById('project-images-section'), {
        selector: 'a' 
    });
});

function desingerProductImagesView(designer_image_id){

    $.ajax({

        url : '/project/uploaded-design-detail/'+designer_image_id,
        success : function(data){

            if($('#designer_images_popup').length > 0){

                $('#designer_images_popup').remove();
            }
            $('body').append(data);
            $('#designer_images_popup').modal('show');
        }
    });
}

function desingerProductImages(designer_id, product_id){

    $.ajax({

        url : '/project/uploaded-design-list/',
        data : {
            designer_id:designer_id,
            product_id:product_id
        },
        success : function(data){

            $('#desinger_product_images').html(data);
        }
    });
}