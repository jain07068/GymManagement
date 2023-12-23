$(document).ready(function(){

    $.validator.addMethod("validMobileNumber", function(value, element) {
        // Modify this regular expression based on your desired mobile number format
        var pattern = /^[0-9]{10}$/; // Assuming a 10-digit mobile number
        return this.optional(element) || pattern.test(value);
      }, "Please enter a valid 10-digit mobile number.");
});