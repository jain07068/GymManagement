$(document).ready(function(){

    $('.item_start_date, .item_due_date').datetimepicker({
        format : "m-d-Y",
        timepicker:false,
    });

    $('#add_items_list').validate({

        rules:{

        },
        submitHandler : function(){

            let items_url = $('#add_items_list').attr('action');
            $.ajax({
                url : items_url,
                type : 'POST',
                dataType : 'json',
                data : $('#add_items_list').serialize(),
                beforeSend: function() {
                    // setting a timeout
                    $('.loading').show();
                },
                success : function(data){
                    $('.loading').hide();
                    bootbox.alert(data.msg);
                    if(data.error == 0){

                        product_items_list($('#product_item_id').val());
                        $('.remove_items_class').remove();
                        $('#add_items_list')[0].reset();
                    }
                }
            });
        }
    });

    $('body').on('click', '#add_more_items', function(){

        var add_items_html = $('.row_items_section:first').clone();
        add_items_html.children().find('.items_name').val('');
        add_items_html.children().find('.item_start_date').val('').datetimepicker({
            format : "m-d-Y",
            timepicker:false,
        });
        add_items_html.children().find('.item_due_date').val('').datetimepicker({
            format : "m-d-Y",
            timepicker:false,
        });
        add_items_html.addClass('remove_items_class');
        $('#items_section').append(add_items_html);
    }).on('click', '.items_delete_section', function(){

        let id = $(this).data('id');
        bootbox.confirm('Are You Sure you want to delete item ?', function(status){

            if(status){

                $.ajax({

                    url : '/project/delete-product-items/'+id,
                    dataType : 'json',
                    beforeSend: function() {
                        // setting a timeout
                        $('.loading').show();
                    },
                    success : function(data){
                        $('.loading').hide();
                        if(data.error == 0){

                            bootbox.alert(data.msg);
                            let items_product_id = $('#product_item_id').val();
                            product_items_list(items_product_id);
                        }
                    }
                });
            }
        });
    }).on('click', '.items_edit_section', function(){

        let id = $(this).data('id');
        product_items_details(id);
    }).on('click', '#edit_product_items_data', function(){

        $('#edit_items_detail').validate({

            rules:{
    
            },
            submitHandler : function(){
    
                let items_url = $('#edit_items_detail').attr('action');
                $.ajax({
                    url : items_url,
                    type : 'POST',
                    dataType : 'json',
                    data : $('#edit_items_detail').serialize(),
                    beforeSend: function() {
                        // setting a timeout
                        $('.loading').show();
                    },
                    success : function(data){
                        $('.loading').hide();
                        bootbox.alert(data.msg);
                        if(data.error == 0){
    
                            product_items_list($('#product_item_id').val());
                            $('#editItemsSection').modal('hide');
                        }
                    }
                });
            }
        });
    });

    let items_product_id = $('#product_item_id').val();
    product_items_list(items_product_id);
});

function product_items_list(product_id){

    $.ajax({

        url : '/project/items-list-section/'+product_id,
        success : function(data){

            $('#timelines_milestone_section').html(data);
        }
    });
}

function product_items_details(id){

    $.ajax({

        url : '/project/items-edit-section/'+id,
        success : function(data){

            if($('#editItemsSection').length > 0){

                $('#editItemsSection').remove();
            }
            $('body').append(data);
            $('#editItemsSection').modal('show');
            $('.item_start_date, .item_due_date').datetimepicker({
                format : "m-d-Y",
                timepicker:false,
            });
        }
    });
}