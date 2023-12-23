$(document).ready(function(){

    $('body').on('click', '.add-new-items', function(){

        let event_id = $('#event_section_id').val();
        let item_category = $(this).data('item_category');
        let item_id = $(this).data('item_id');
        if($('#add-items-popup').length > 0){

            $("#add-items-popup").remove();
        }
        $.ajax({

            url : '/event/add-item-popup/',
            data : {event_id:event_id, item_category:item_category},
            // dataType : 'json',
            success : function(data){

                $("body").append(data);
                $("#add-items-popup").modal('show');
                $('#category_id, #assigned_user').select2({"width":"100%", dropdownParent:$('#add-items-popup')});
                $('#final_deliverables_upload').FancyFileUpload({
        
                });
            
                $('#supporting_resources_upload').FancyFileUpload({
                    
                });

                $('#due_date').datetimepicker({
                    format : "m-d-Y",
                    timepicker:false,
                });
            }
        });
    }).on('click', '#add-items-button', function(){

        $('#add-items-form').validate({
            rules:{
    
            },
            submitHandler: function(){
    
                let url = $('#add-items-form').attr('action');
                var item_data = new FormData($('#add-items-form')[0]);
                item_data = appendImageDataFromFancyDrop(item_data);
                $.ajax({
                    url : url,
                    type : 'POST',
                    dataType : 'json',
                    data : item_data,
                    contentType: false,
                    cache: false,
                    processData: false,
                    beforeSend: function() {
                        // setting a timeout
                        $('.loading').show();
                    },
                    success : function(data){
                        
                        if(data.error == 0){
    
                            bootbox.alert(data.msg, function(){

                                get_items_section($('#event_section_id').val());
                                $("#add-items-popup").modal('hide');
                            });
                        }else{

                            bootbox.alert(data.msg);
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
    }).on('click', '.assign_designer', function(){

        let items_id = $(this).data('items');
        let event_id = $('#event_section_id').val();
        get_assign_designer_section(items_id, event_id);
    }).on('click', '#assign_vendor_button', function(){

        $('#assign_vendor_from').validate({
            rules: {

            },
            submitHandler : function(){

                let url = $('#assign_vendor_from').attr('action');
                $.ajax({
                    url : url,
                    type : 'POST',
                    dataType : 'json',
                    data : $('#assign_vendor_from').serialize(),
                    success : function(data){

                        if(data.error == 0){

                            bootbox.alert(data.msg);
                            $("#assigndesignerSection").modal('hide');
                            get_items_section($('#event_section_id').val());
                        }
                    }
                });
            }
        });
    });
    
    $("#event_status").select2({"width":"100%"});
    get_items_section($('#event_section_id').val());
});

function get_items_section(event_id){

    $.ajax({

        url : '/event/get-items-section/',
        data : {event_id:event_id},
        // dataType : 'json',
        success : function(data){

            $("#item").html(data);
            $('#total_item_amount_section').html('$'+ $('#total_cost_section').val());
            $('.select2').select2({"width":"100%"});
        }
    });
}

function get_assign_designer_section(items_id, event_id){

    if($('#assigndesignerSection').length > 0){

        $("#assigndesignerSection").remove();
    }
    $.ajax({

        url : '/event/assign-designer-popup/'+items_id,
        data : {'event_id':event_id},
        // dataType : 'json',
        success : function(data){

            $("body").append(data);
            $("#assigndesignerSection").modal('show');
            $('#assign_vendor_user').select2({"width":"100%", dropdownParent:$("#assigndesignerSection")});
        }
    });
}