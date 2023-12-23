(function($) {
	//fancyfileuplod
	$('.demo').FancyFileUpload({
	params : {
		 action : 'fileuploader'
		},
		maxfilesize : 1000000
	});
})(jQuery);

// Function to convert data URL to File object
function dataURLtoFile(dataURL, fileName) {
	var arr = dataURL.split(',');
	var mime = arr[0].match(/:(.*?);/)[1];
	var bstr = atob(arr[1]);
	var n = bstr.length;
	var u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], fileName, { type: mime });
}

function appendImageDataFromFancyDrop(form_data){

	$('.ff_file_data_info_drop').each(function(i, v){

		let preloadedData = $(this).attr('file_data');
		if(preloadedData){
			let file_name = $(this).attr('file_name');
			let input_name = $(this).attr('input_name')
			// Create a new File object from the preloaded data
			let file = dataURLtoFile(preloadedData, file_name);

			// Create a FormData object and append the file
			form_data.append(input_name, file);
		}
	});
	return form_data;
}