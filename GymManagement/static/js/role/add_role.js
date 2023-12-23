$(document).ready(function(){

    $("body").on('click', '#submit_role_section', function(){

        $('#roles_form').validate({
            rule:{

            },
            submitHandler: function(){

                let role_url = $('#roles_form').attr('action');
                $.ajax({
                    url : role_url,
                    type : 'POST',
                    dataType : 'json',
                    data : $('#roles_form').serialize(),
                    beforeSend: function() {
                        // setting a timeout
                        $('.loading').show();
                    },
                    success : function(data){
                        $("#global-loader").hide();
                        bootbox.alert(data.msg);
                        if(data.error == 0){

                            setTimeout(function(){

                                location.replace('/role');
                            }, 3000);
                        }
                    },
                    complete: function() {
                        $('.loading').hide();
                    },
                });
            }
        });

        $("#roles_form").submit();
    }).on('click', '#view_all', function(){
        if($(this).prop('checked') == true){
            
            $('.role-view').prop('checked', true);
        }else{
            $('.role-view').prop('checked', false);
        }
    }).on('click', '#edit_all', function () {
        if ($(this).prop('checked') == true) {
            $('.role-edit').prop('checked', true);
        } else {
            $('.role-edit').prop('checked', false);
        }
    }).on('click', '.role-view', function () {

        i = 0
        $('.role-view').each(function(){

            if(!($(this).prop('checked'))){
                i = i + 1
            }
        })

        if(i){

            $('#view_all').prop('checked', false);
        }else{

            $('#view_all').prop('checked', true);
        }
    }).on('click', '.role-edit', function () {

        i=0
        $('.role-edit').each(function(){

            if(!($(this).prop('checked'))){
                i = i + 1
            }
        })

        if (i){
            $('#edit_all').prop('checked', false);
        }else{
            $('#edit_all').prop('checked',true);
        }

    });

    $("#cancelSelection").on("click", function () {
        $('#view_all, #edit_all, .role-view, .role-edit').prop('checked', false);
    });

    $(".select2").select2({"width":"100%"});
});