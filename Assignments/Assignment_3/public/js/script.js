$(document).ready(function () {
    $("#checkout-form").on("submit", function (event) {
      event.preventDefault();
  
      let isValidForm = true;
  
      if (!validateName()) {
        isValidForm = false;
      }
      if (!validateAddress()) {
        isValidForm = false;
      }
      if (!validateEmail()) {
        isValidForm = false;
      }
      if (!validatePhone()) {
        isValidForm = false;
      }
      if (!validateCard()) {
        isValidForm = false;
      }
      if (!validateExpiry()) {
        isValidForm = false;
      }
      if (!validateCVV()) {
        isValidForm = false;
      }
  
      if (isValidForm) {
        alert("Form submitted successfully");
        $("#checkout-form")[0].reset(); // Reset form
      } else {
        alert("Form was invalid");
      }
    });
  });
  
  function validateName() {
    let name = $("#name-input").val().trim();
    if (name === "") {
      $("#name-error").text("Full name is required.").show();
      return false;
    }
    $("#name-error").hide();
    return true;
  }
  
  function validateAddress() {
    let address = $("#address-input").val().trim();
    if (address === "") {
      $("#address-error").text("Address is required.").show();
      return false;
    }
    $("#address-error").hide();
    return true;
  }
  
  function validateEmail() {
    let email = $("#email-input").val().trim();
    if (email === "") {
      $("#email-error").text("Email is required.").show();
      return false;
    }
    $("#email-error").hide();
    return true;
  }
  
  function validatePhone() {
    let phone = $("#phone-input").val().trim();
    
    
    if (phone.length >= 10 && phone.length <= 15) {
      $("#phone-error").hide(); 
      return true;
    } else {
      $("#phone-error").text("Phone number must be between 10 and 15 digits.").show(); 
      return false;
    }
  }
  
  function validateCard() {
    let card = $("#card-input").val().trim();
    
    
    if (card.length === 16) {
      $("#card-error").hide(); 
      return true;
    } else {
      $("#card-error").text("Credit card number must be exactly 16 digits.").show(); // Show error if invalid
      return false;
    }
  }
  
  function validateExpiry() {
    let expiry = $("#expiry-input").val().trim();
    if (new Date(expiry) <= new Date()) {
      $("#expiry-error").text("Expiry date must be in the future.").show();
      return false;
    }
    $("#expiry-error").hide();
    return true;
  }
  
  function validateCVV() {
    let cvv = $("#cvv-input").val().trim();
    
    
    if (cvv.length === 3) {
      $("#cvv-error").hide(); 
      return true;
    } else {
      $("#cvv-error").text("CVV must be exactly 3 digits.").show();
      return false;
    }
  }
  