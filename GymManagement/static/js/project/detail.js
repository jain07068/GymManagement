$(document).ready(function(){

    $("body").on('click', '.assigne_design_button', function(event) {
        let product_id = $(this).data('product_id');
        let designer_id = $(this).data('designer_id');
        let deadline_date = $(this).parents('.assign_designe_section_detail').find('.assign_designe_deadline_date').val();
        let errorMessage = $(this).parents('.assign_designe_section_detail').find('.error-message');

        if ($.trim(deadline_date) === "") {
            event.preventDefault(); // Prevent form submission
            errorMessage.text("Please select a deadline date.");
        } else {
            errorMessage.text("");
            // The rest of your AJAX code for assigning designer...
        }
    });

    $("body").on('click', '.assign_vendor_button', function(event) {
        let deadline_date = $(this).parents('.assign_vendor_section_detail').find('.assign_vendor_deadline_date').val();
        let errorMessage = $(this).parents('.assign_vendor_section_detail').find('.error-message');

        if ($.trim(deadline_date) === "") {
            event.preventDefault(); // Prevent form submission
            errorMessage.text("Please select a deadline date.");
        } else {
            errorMessage.text("");
            // The rest of your AJAX code for assigning designer...
        }
    });



    $(".select2").select2({"width":"100%"});
    
    $("body").on('click', '#assign_designer_popup', function(){
        
        let product_id = $(this).data('product_id');
        if($('#assigndesignerSection').length > 0){

            $("#assigndesignerSection").remove();
        }
        $.ajax({

            url : '/project/assign-designer-popup/'+product_id,
            // dataType : 'json',
            success : function(data){

                $("body").append(data);
                $("#assigndesignerSection").modal('show');
                $(".assign_designe_deadline_date").datetimepicker({
                    format : "m-d-Y",
                    timepicker:false,
                });
            }
        });
    }).on('click', '.assigne_design_button', function(){

        let product_id = $(this).data('product_id');
        let designer_id = $(this).data('designer_id');
        let deadline_date = $(this).parents('.assign_designe_section_detail').find('.assign_designe_deadline_date').val();
        console.log(product_id+' '+deadline_date);
        $.ajax({

            url : '/project/assign-desinge/',
            dataType : 'json',
            type : "POST",
            data : {
                "product_id" : product_id,
                "deadline_date" : deadline_date,
                "designer_id" : designer_id
            },
            success : function(data){

                if(data.error == 0){

                    bootbox.alert(data.msg);
                    $("#assigndesignerSection").modal('hide');
                    // $('#assign_designer_popup').click();
                    assignDesignerSection(product_id);
                }
            }
        });
    }).on('click', '#assign_vendor_popup', function(){

        let product_id = $(this).data('product_id');
        if($('#assigndevendorsection').length > 0){

            $("#assigndevendorsection").remove();
        }
        $.ajax({

            url : '/project/assign-vendor-popup/'+product_id,
            // dataType : 'json',
            success : function(data){

                $("body").append(data);
                $("#assigndevendorsection").modal('show');
                $(".assign_vendor_deadline_date").datetimepicker({
                    format : "m-d-Y",
                    timepicker:false,
                });
            }
        });
    }).on('click', '.assign_vendor_button', function(){

        let product_id = $(this).data('product_id');
        let vendor_id = $(this).data('vendor_id');
        let deadline_date = $(this).parents('.assign_vendor_section_detail').find('.assign_vendor_deadline_date').val();
        console.log(product_id+' '+deadline_date);
        $.ajax({

            url : '/project/assign-vendor/',
            dataType : 'json',
            type : "POST",
            data : {
                "product_id" : product_id,
                "deadline_date" : deadline_date,
                "vendor_id" : vendor_id
            },
            success : function(data){

                if(data.error == 0){

                    $("#assigndevendorsection").modal('hide');
                    // $('#assign_vendor_popup').click();
                    assignVendorSection(product_id);
                }
            }
        });
    }).on('click', '.add_product_quote_popup', function(){

        let product_id = $(this).data('product_id');
        let quote_type = $(this).data('quote_type');
        let id = $(this).data('id');
        if($('#addproductquotesection').length > 0){

            $("#addproductquotesection").remove();
        }
        $.ajax({

            url : '/project/product-quote-popup/'+id,
            // dataType : 'json',
            data : {
                product_id : product_id,
                quote_type : quote_type
            },
            success : function(data){

                $("body").append(data);
                $("#addproductquotesection").modal('show');
            }
        });
    }).on('click', '#add_sample_quote_popup', function(){

        let product_id = $(this).data('product_id');
        if($('#addsamplequotesection').length > 0){

            $("#addsamplequotesection").remove();
        }
        $.ajax({

            url : '/project/sample-quote-popup/'+product_id,
            // dataType : 'json',
            success : function(data){

                $("body").append(data);
                $("#addsamplequotesection").modal('show');
            }
        });
    }).on('click', '#add_tooling_cost_popup', function(){

        let product_id = $(this).data('product_id');
        if($('#addtoolingcostsection').length > 0){

            $("#addtoolingcostsection").remove();
        }
        $.ajax({

            url : '/project/tooling-cost-popup/',
            // dataType : 'json',
            data : {
                product_id : product_id
            },
            success : function(data){

                $("body").append(data);
                $("#addtoolingcostsection").modal('show');
            }
        });
    }).on('click', '#add_product_quote_button',function(){
        let url = $("#add_product_quote_form").attr('action');

        $('#add_product_quote_form').validate({
            rules:{
                product_qty : {
                    number : true
                },
                production_days : {
                    number : true
                },
                fob_unit : {
                    number : true
                },
                ddp_unit : {
                    number : true
                }
            },
            submitHandler: function(){

                $.ajax({

                    url : url,
                    dataType : 'json',
                    type : "POST",
                    data : $('#add_product_quote_form').serialize(),
                    beforeSend: function() {
                        // setting a timeout
                        $('.loading').show();
                    },
                    success : function(data){
        
                        if(data.error == 0){
        
                            bootbox.alert(data.msg);
                            $("#addproductquotesection").modal('hide');
                            let product_quote_section = $('#product_quote_section').html();
                            let product_quote_count = parseInt(product_quote_section) + 1;
                            $('#product_quote_section').html(product_quote_count);
                            productQuotationList(data.detail.product, data.detail.quote_type, data.detail.quote_for);
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
    }).on('click', '#tooling_cost_button', function(){

        let url = $("#add_tooling_cost").attr('action');

        $('#add_tooling_cost').validate({
            rules:{
                tooling_cost : {

                    "required" : true,
                    "number" : true
                },
                production_days : {

                    "required" : true,
                    "number" : true
                }
            },
            submitHandler: function(){

                $.ajax({

                    url : url,
                    dataType : 'json',
                    type : "POST",
                    data : $('#add_tooling_cost').serialize(),
                    beforeSend: function() {
                        // setting a timeout
                        $('.loading').show();
                    },
                    success : function(data){
        
                        if(data.error == 0){
        
                            bootbox.alert(data.msg);
                            $("#addtoolingcostsection").modal('hide');
                            toolingList(data.detail.product, data.detail.tooling_for);
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
                            productDesigneList(data.detail.product);
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
    }).on('click', '#shared_to_client', function(){

        let id = $(this).data('id');
        bootbox.confirm('Are You Sure you want to share this design with client', function(status){

            if(status){

                $.ajax({

                    url : '/project/share-design-to-client/'+id,
                    dataType : 'json',
                    beforeSend: function() {
                        // setting a timeout
                        $('.loading').show();
                    },
                    success : function(data) {
                        
                        if(data.error == 0){

                            bootbox.alert(data.msg);
                            $('#shared_to_client').html('Shared');
                            $('#shared_to_client').attr('id', '');
                            $('#shared_to_client').attr('data-id', '');
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
    }).on('click', '#design_approve_button', function(){

        let id = $(this).data('id');
        bootbox.confirm('Are You Sure you want to Approve this design', function(status){

            if(status){

                $.ajax({

                    url : '/project/approve-product-design/'+id,
                    dataType : 'json',
                    beforeSend: function() {
                        // setting a timeout
                        $('.loading').show();
                    },
                    success : function(data) {
                        
                        if(data.error == 0){

                            bootbox.alert(data.msg);
                            $('#desing_popup_button_section').html('<button href="javascript:void(0)" class="btn btn-success btn-sm">Approved</button>');
                            productDesigneList(data.detail.product_id);
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
    }).on('click', '#design_reject_button', function(){

        let id = $(this).data('id');
        bootbox.confirm('Are You Sure you want to Reject this design', function(status){

            if(status){

                $.ajax({

                    url : '/project/reject-product-design/'+id,
                    dataType : 'json',
                    beforeSend: function() {
                        // setting a timeout
                        $('.loading').show();
                    },
                    success : function(data) {
                        
                        if(data.error == 0){

                            bootbox.alert(data.msg);
                            $('#desing_popup_button_section').html('<button href="javascript:void(0)" class="btn btn-danger btn-sm">Rejected</button>');
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
    }).on('click', '.share_quotation_detail', function(){

        let id = $(this).data('id');
        bootbox.confirm('Are You Sure you want to share this quatation with client ?', function(status){

            if(status){

                $.ajax({

                    url : '/project/share-quotation-client/'+id,
                    dataType : 'json',
                    success : function(data){

                        if(data.error == 0){

                            bootbox.alert(data.msg);
                        }
                    }
                });
            }
        });
    
    }).on('click', '.approve-quote-button', function(){

        let id = $(this).data('id');
        bootbox.confirm('Are You Sure You Want To Approve All The Quotation?', function(status){

            if(status){

                $('.approve_quotation_detail').each(function(){

                    let quote_type = $(this).data('quote_type');
                    let quote_for = $(this).data('quote_for');
                    let id = $(this).data('id');
                    if(quote_type == '1' && quote_for == '2'){
    
                        $.ajax({
    
                            url : '/project/approve-quotation-client/'+id,
                            dataType : 'json',
                            success : function(data){

                                productQuotationList(data.detail.product, data.detail.quote_type, data.detail.quote_for);
                            }
                        });
                    }
                });
            }
        });

    }).on('click', '.share-all-quote-button', function(){

        bootbox.confirm('Are You Sure You Want To Share All The Quotes?', function(status){

            if(status){

                $('.share_quotation_detail').each(function(){

                    let quote_type = $(this).data('quote_type');
                    let quote_for = $(this).data('quote_for');
                    let id = $(this).data('id');
                    let product_id = $(this).data('product_id');
                    if(quote_type == '1' && quote_for == '2'){
    
                        $.ajax({
    
                            url : '/project/share-quotation-client/'+id,
                            dataType : 'json',
                            success : function(data){

                                productQuotationList(product_id, quote_type, quote_for);
                            }
                        });
                    }
                });
            }
        });
    }).on('click', '.approve_quotation_detail', function(){

        let id = $(this).data('id');
        bootbox.confirm('Are You Sure you want to approve this quotation ?', function(status){

            if(status){

                $.ajax({

                    url : '/project/approve-quotation-client/'+id,
                    dataType : 'json',
                    success : function(data){

                        if(data.error == 0){

                            bootbox.alert(data.msg);
                            productQuotationList(data.detail.product, data.detail.quote_type, data.detail.quote_for);
                        }
                    }
                });
            }
        });
    }).on('change', '#project_detail_status', function(){

        let project_status = $(this).val();
        let project_id = $("#project_id_hidden").val();

        $.ajax({

            url : '/project/change-project-status/'+project_id,
            dataType : 'json',
            data : {
                project_status : project_status
            },
            success : function(data){

                if(data.error == 0){

                    bootbox.alert(data.msg);
                }
            }
        });
    }).on('change', '.change_product_vendor_status', function(){

        let project_status = $(this).val();
        let vendor_id = $(this).data('vendor_id');
        let vendor_index = $(this);
        $.ajax({

            url : '/project/change-project-vendor-status/'+vendor_id,
            dataType : 'json',
            data : {
                project_status : project_status
            },
            success : function(data){

                if(data.error == 0){

                    bootbox.alert(data.msg);
                    vendor_index.html(data.option_list).select2({"width":"100%"});
                    main_product_status = $('#project_detail_status').val();
                    if((project_status == '1' && main_product_status == '1') || (project_status == '2' && main_product_status == '2')){

                        $('#project_detail_status').html(data.product_option).select2({"width":"100%"});
                    }
                }
            }
        });
    }).on('change', '.change-project-designer-status', function(){

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
                    main_product_status = $('#project_detail_status').val();
                    if(project_status == '1' && main_product_status == '0'){

                        $('#project_detail_status').html(data.product_option).select2({"width":"100%"});
                    }
                }
            }
        });
    }).on('click', '#compare_all_quote', function(){

        let product_id = $(this).data('product_id');
        $.ajax({

            url : '/project/compare-quotation-list/',
            data : {
                "product_id" : product_id
            },
            success : function(data){
    
                if($('#vendor_compare_popup').length > 0){

                    $('#vendor_compare_popup').remove();
                }

                $('body').append(data);
                $('#vendor_compare_popup').modal('show');
            }
        });
    }).on('click', '.downlode-all-quotation', function(){

        // Get the product ID from the button's data attribute
        var productId = $(this).data('product_id');
    
        // Make an AJAX request to the server to generate and download the PDF
        $.ajax({
            url: '/project/pdf-compare-quotation/'+productId,  // Update the URL if needed
            type: 'GET',
            beforeSend: function() {
                // setting a timeout
                $('.loading').show();
            },
            //data: { product_id: productId },
            success: function (data) {
                $('.loading').hide();
                // Create a Blob from the PDF data
                var blob = new Blob([data], { type: 'application/pdf' });

                // Create a link element to trigger the download
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'quote.pdf';

                // Append the link to the body and trigger the click event
                document.body.appendChild(link);
                link.click();

                // Remove the link from the body
                document.body.removeChild(link);
            },
            error: function (error) {
                console.error('Error:', error);
                $('.loading').hide();
                // Handle the error if needed
            }
        });
    });

    let product_id = $('#product_item_id').val();
    
    logList(product_id);

    lightGallery(document.getElementById('project-images-section'), {
        selector: 'a' 
    });
});

function productQuotationList(product_id, quote_type, quote_for){

    $.ajax({

        url : '/project/quotation-list/',
        type : 'POST',
        data : {
            "product_id" : product_id,
            "quote_type" : quote_type,
            "quote_for" : quote_for
        },
        success : function(data){

            if(quote_type == '1'){

                $('#product_quotation_section').html(data)
            }else{

                $('#sample_quotation_section').html(data)
            }

        }
    });
}

function toolingList(product_id, tool_for){

    $.ajax({

        url : '/project/tooling-cost-list/',
        data : {
            "product_id" : product_id,
            "tool_for" : tool_for
        },
        success : function(data){

            $('#tooling_cost_section').html(data);
        }
    });
}

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

function productDesigneList(product_id, designer_id=''){

    $.ajax({

        url : '/project/uploaded-design-list/',
        data : {
            "product_id" : product_id,
            "designer_id" : designer_id
        },
        success : function(data){

            $('#client-desing-list-section').html(data);
        }
    });
}

function assignDesignerSection(id){

    $.ajax({

        url : '/project/assign-designer-section/'+id,
        success : function(data){

            $('#product-design').html(data);
            $('.deisgner_status_drop').select2({"width":"100%"});
        }
    });
}

function assignVendorSection(id){

    $.ajax({

        url : '/project/assign-vendor-section/'+id,
        success : function(data){

            $('#product-vendor').html(data);
            $('.vendor_status_detail').select2({"width":"100%"});
        }
    });
}

function logList(product_id){
    $.ajax({

        url : '/project/log-list/',
        data : {
            "product_id":product_id
        },
        success : function(data_g){
            $('#admin_history').html(data_g);
        }
    });
}