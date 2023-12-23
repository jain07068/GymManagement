$(document).ready(function(){

    $('body').on('click', '.button_comment_section_form', function(){
        let user_id = $(this).data('user_id');
        let data_section = $(this).data('section');
        if(data_section){

            var data_section_2 = '_'+data_section;
        }else{

            var data_section_2 = '';
        }
        $('#comment_section_form_'+user_id+data_section_2).validate({

            rules : {

            },
            submitHandler : function(){

                let url = $('#comment_section_form_'+user_id+data_section_2).attr('action');
                $.ajax({
                    url : url,
                    dataType : 'json',
                    type : 'POST',
                    data : $('#comment_section_form_'+user_id+data_section_2).serialize(),
                    success : function(data){

                        if(data.error == 0){

                            bootbox.alert(data.msg);
                            
                            // Clear the form
                            $('#comment_section_form_'+user_id+data_section_2)[0].reset();

                            showVendorComment(user_id);
                        }
                    }
                });
            }
        });
        // $('#comment_section_form_'+user_id).submit();
    });
    $('.comment_vendor_user_id').each(function(){

        let user_id = $(this).val();
        showVendorComment(user_id);
    });
});

function showVendorComment(user_id) {
    // Start an AJAX request using jQuery's $.ajax() function
    $.ajax({
        // Specify the URL to send the request to
        url: '/project/add-vendor-comment-section/'+user_id,
        success: function(data) {
            // This function is executed when the AJAX request is successful

            // Update the content of the HTML element with the class 'vendor_comment_lists'
            // with the response data received from the server
            $('.vendor_comment_lists_'+user_id).html(data);
            $('.comment_lists_'+user_id+'_admin').html(data);
        }
    });
}
