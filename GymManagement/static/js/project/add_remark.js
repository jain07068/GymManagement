$(document).ready(function(){

    $('#elevate_remark_form').validate({

        rules: {

        },
        submitHandler : function(){

            let url = $('#elevate_remark_form').attr('action');
            let form_data = $('#elevate_remark_form').serialize();
            let remark_id_index = 'elevate_remark_id';
            add_project_remark(url, form_data, remark_id_index);
        }
    });
});

function add_project_remark(url, form_data, remark_id_index){

    $.ajax({
        url : url,
        type : 'POST',
        dataType : 'json',
        data : form_data,
        beforeSend: function() {
            // setting a timeout
            $('.loading').show();
        },
        success : function(data){

            $('.loading').hide();
            if(data.error == 0){

                bootbox.alert(data.msg);
                $('#'+remark_id_index).val(data.remark_data.id);
            }
        }
    });
}