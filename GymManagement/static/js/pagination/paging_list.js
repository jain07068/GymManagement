$(document).ready(function(){
    $('#search_listing_form').validate({
        rules:{
            faq_question : {
                required : true
            }
        },
        submitHandler: function(){

            let paging_url = $('#search_listing_form').attr('action');
            pageListingForm(paging_url, '', '', 1, 5, 1);
        }
    });

    $('body').on('click', '.page_list_sorting', function(){

        let order_by_field = $(this).data('order_by_field')
        let order_by = $(this).data('order_by')
        let paging_url = $('#search_listing_form').attr('action');
        pageListingForm(paging_url, order_by_field, order_by);
    }).on('click', '.pagination_section', function(){

        let order_by_field = $(this).data('order_by_field')
        let order_by = $(this).data('order_by')
        let paging_url = $('#search_listing_form').attr('action');
        let page = $(this).data('page');
        pageListingForm(paging_url, order_by_field, order_by, page);
    }).on('keyup', '#search_text', function(){

        $('#search_listing_form').submit();
    }).on('blur', '#search_from_date, #search_to_date', function(){

        $('#search_listing_form').submit();
    });
});

function pageListingForm(paging_url, order_by_field='', order_by='', page='', limit=5, search=0){
    let form_data = $('#search_listing_form').serialize();
    form_data = form_data+'&order_by_field='+order_by_field+'&order_by='+order_by+'&page='+page+'&page_size='+limit;
    $.ajax({
        url : paging_url,
        type : 'POST',
        data : form_data,
        beforeSend: function() {
            // setting a timeout
            if(search == 0){
                $('.loading').show();
            }
        },
        success : function(data){
            let page_section = $('#search_listing_form').attr('section');
            $("#global-loader").hide();
            console.log(page_section);
            $('#'+page_section).html(data);
        },
        complete: function() {
            if(search == 0){
                $('.loading').hide();
            }
        },
    });
}