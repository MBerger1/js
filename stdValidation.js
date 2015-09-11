// save list of fields and whether they are in error state or not
var errors = {};
var validation = {
  filename: {
    test: /\w+/,
    pass: function(){
      $("#filename_label,#filename").removeClass("error");
      errors["filename"] = 0;
    },
    fail: function(){
      $("#filename_label,#filename").addClass("error");
      errors["filename"] = 1;
    }
  },
  prodid: {
    test: /\w+/,
    pass: function(){
      $("#filename_label,#prodid").removeClass("error");
      errors["prodid"] = 0;
    },
    fail: function(){
      $("#filename_label,#prodid").addClass("error");
      errors["prodid"] = 1;
    }
  },
  mailtype: {
    test: /\w+/,
    pass: function(){
      $("#filename_label,#mailtype").removeClass("error");
      errors["mailtype"] = 0;
    },
    fail: function(){
      $("#filename_label,#mailtype").addClass("error");
      errors["mailtype"] = 1;
    }
  },
  length: {
    test: /\w+/,
    pass: function(){
      $("#filename_label,#length").removeClass("error");
      errors["length"] = 0;
    },
    fail: function(){
      $("#filename_label,#length").addClass("error");
      errors["length"] = 1;
    }
  },
  height: {
    test: /\w+/,
    pass: function(){
      $("#filename_label,#height").removeClass("error");
      errors["height"] = 0;
    },
    fail: function(){
      $("#filename_label,#height").addClass("error");
      errors["height"] = 1;
    }
  },
  width: {
    test: /\w+/,
    pass: function(){
      $("#filename_label,#width").removeClass("error");
      errors["width"] = 0;
    },
    fail: function(){
      $("#filename_label,#width").addClass("error");
      errors["width"] = 1;
    }
  },
  weight: {
    test: /\w+/,
    pass: function(){
      $("#filename_label,#weight").removeClass("error");
      errors["weight"] = 0;
    },
    fail: function(){
      $("#filename_label,#weight").addClass("error");
      errors["weight"] = 1;
    }
  },
  firstname: {
    test: /\w+/,
    pass: function(){
      $("#firstname_label,#firstname").removeClass("error");
      errors["firstname"] = 0;
    },
    fail: function(){
      $("#firstname_label,#firstname").addClass("error");
      errors["firstname"] = 1;
    }
  },
  lastname: {
    test: /\w+/,
    pass: function(){
      $("#lastname_label,#lastname").removeClass("error");
      errors["lastname"] = 0;
    },
    fail: function(){
      $("#lastname_label,#lastname").addClass("error");
      errors["lastname"] = 1;
    }
  },
  street: {
    test: /\w+/,
    pass: function(){
      $("#street_label,#street").removeClass("error");
      errors["street"] = 0;
    },
    fail: function(){
      $("#street_label,#street").addClass("error");
      errors["street"] = 1;
    }
  },
  city: {
    test: /[a-zA-z\-\.\']+/,
    pass: function(){
      $("#city_label,#city").removeClass("error");
      errors["city"] = 0;
    },
    fail: function(){
      $("#city_label,#city").addClass("error");
      errors["city"] = 1;
    }
  },
  state: {
    test: function(){
      return $("#state option:selected").val().length > 0;
    },
    pass: function(){
      $("#state_label,#state").removeClass("error");
      //$("#state_alert").hide();
      errors["state"] = 0;
    },
    fail: function(){
      $("#state_label,#state").addClass("error");
      //$("#state_alert").show();
      errors["state"] = 1;
    }
  },
  country: {
    test: function(){
      return $("#country option:selected").val().length > 0;
    },
    pass: function(){
      $("#country_label,#country").removeClass("error");
      //$("#country_alert").hide();
      errors["country"] = 0;
    },
    fail: function(){
      $("#country_label,#country").addClass("error");
      //$("#country_alert").show();
      errors["country"] = 1;
    }
  },
  zip: {
    test: /\d{5}/,
    pass: function(){
      $("#zip_label,#zip").removeClass("error");
      errors["zip"] = 0;
    },
    fail: function(){
      $("#zip_label,#zip").addClass("error");
      errors["zip"] = 1;
    }
  },
  email: {
    test: function(){
      var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return emailRegex.test($("#email").val());
    },
    pass: function(){
      $("#email_label,#email").removeClass("error");
      errors["email"] = 0;
    },
    fail: function(){
      $("#email_label,#email").addClass("error");
      errors["email"] = 1;
    }
  },
  rafemail1: {
    test: function(){
      var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return emailRegex.test($("#rafemail1").val()) || $("#rafemail1").val() == "";
    },
    pass: function(){
      $("#rafemail1_label,#rafemail1").removeClass("error");
      errors["rafemail1"] = 0;
    },
    fail: function(){
      $("#rafemail1_label,#rafemail1").addClass("error");
      errors["rafemail1"] = 1;
    }
  },
  rafemail2: {
    test: function(){
      var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return emailRegex.test($("#rafemail2").val()) || $("#rafemail2").val() == "";
    },
    pass: function(){
      $("#rafemail2_label,#rafemail2").removeClass("error");
      errors["rafemail2"] = 0;
    },
    fail: function(){
      $("#rafemail2_label,#rafemail2").addClass("error");
      errors["rafemail2"] = 1;
    }
  },
  rafemail3: {
    test: function(){
      var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return emailRegex.test($("#rafemail3").val()) || $("#rafemail3").val() == "";
    },
    pass: function(){
      $("#rafemail3_label,#rafemail3").removeClass("error");
      errors["rafemail3"] = 0;
    },
    fail: function(){
      $("#rafemail3_label,#rafemail3").addClass("error");
      errors["rafemail3"] = 1;
    }
  },
  rafemail4: {
    test: function(){
      var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return emailRegex.test($("#rafemail4").val()) || $("#rafemail4").val() == "";
    },
    pass: function(){
      $("#rafemail4_label,#rafemail4").removeClass("error");
      errors["rafemail4"] = 0;
    },
    fail: function(){
      $("#rafemail4_label,#rafemail4").addClass("error");
      errors["rafemail4"] = 1;
    }
  },
  email2: {
    test: function(){
      var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return emailRegex.test($("#email2").val()) && $("#email").val() == $("#email2").val();
    },
    pass: function(){
      $("#email2_label,#email2").removeClass("error");
      errors["email"] = 0;
    },
    fail: function(){
      $("#email2_label,#email2").addClass("error");
      errors["email"] = 1;
    }
  },
  friendemail1: {
    test: function(){
      var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return $("#friendemail1").val().length == 0 || emailRegex.test($("#friendemail1").val());
    },
    pass: function(){
      $("#friendemail1").removeClass("error");
      errors["friendemail1"] = 0;
    },
    fail: function(){
      $("#friendemail1").addClass("error");
      errors["friendemail1"] = 1;
    }
  },
  friendemail2: {
    test: function(){
      var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return $("#friendemail2").val().length == 0 || emailRegex.test($("#friendemail2").val());
    },
    pass: function(){
      $("#friendemail2").removeClass("error");
      errors["friendemail2"] = 0;
    },
    fail: function(){
      $("#friendemail2").addClass("error");
      errors["friendemail2"] = 1;
    }
  },
  friendemail3: {
    test: function(){
      var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return $("#friendemail3").val().length == 0 || emailRegex.test($("#friendemail3").val());
    },
    pass: function(){
      $("#friendemail3").removeClass("error");
      errors["friendemail3"] = 0;
    },
    fail: function(){
      $("#friendemail3").addClass("error");
      errors["friendemail3"] = 1;
    }
  },
  friendemail4: {
    test: function(){
      var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return $("#friendemail4").val().length == 0 || emailRegex.test($("#friendemail4").val());
    },
    pass: function(){
      $("#friendemail4").removeClass("error");
      errors["friendemail4"] = 0;
    },
    fail: function(){
      $("#friendemail4").addClass("error");
      errors["friendemail4"] = 1;
    }
  },
  birthmonth: {
    test: function(){
      return $("#birthmonth option:selected").val().length > 0;
    },
    pass: function(){
      $("#birthmonth").removeClass("error");
      errors["birthmonth"] = 0;
      if( validation["birthday"]["test"].call() &&
          validation["birthyear"]["test"].call() ){
        //$("#birth_alert").hide();
        $("#birth_label").removeClass("error");
      }
    },
    fail: function(){
      $("#birth_label,#birthmonth").addClass("error");
      //$("#birth_alert").show();
      errors["birthmonth"] = 1;
    }
  },
  birthday: {
    test: function(){
      return $("#birthday option:selected").val().length > 0;
    },
    pass: function(){
      $("#birthday").removeClass("error");
      errors["birthday"] = 0;
      if( validation["birthmonth"]["test"].call() &&
          validation["birthyear"]["test"].call() ){
        //$("#birth_alert").hide();
        $("#birth_label").removeClass("error");
      }
    },
    fail: function(){
      $("#birth_label,#birthday").addClass("error");
      //$("#birth_alert").show();
      errors["birthday"] = 1;
    }
  },
  birthyear: {
    test: function(){
      return $("#birthyear option:selected").val().length > 0;
    },
    pass: function(){
      $("#birthyear").removeClass("error");
      errors["birthyear"] = 0;
      if( validation["birthday"]["test"].call() &&
          validation["birthmonth"]["test"].call() ){
        //$("#birth_alert").hide();
        $("#birth_label").removeClass("error");
      }
    },
    fail: function(){
      $("#birth_label,#birthyear").addClass("error");
      //$("#birth_alert").show();
      errors["birthyear"] = 1;
    }
  },
  age: {
    test: function(){
      return $("#age").is(":checked");
    },
    pass: function(){
      $("#age,#age_label").removeClass("error");
      errors["age"] = 0;
    },
    fail: function(){
      $("#age,#age_label").addClass("error");
      errors["age"] = 1;
    }
  },
  phonearea: {
    test: /\d{3}/,
    pass: function(){
      $("#phonearea").removeClass("error");
      errors["phonearea"] = 0;
      if( validation["phoneprefix"]["test"].test( $("#phoneprefix").val() ) &&
          validation["phonesuffix"]["test"].test( $("#phonesuffix").val() ) ){
        $("#phone_label").removeClass("error");
      }
    },
    fail: function(){
      $("#phone_label,#phonearea").addClass("error");
      errors["phonearea"] = 1;
    }
  },
  phoneprefix: {
    test: /\d{3}/,
    pass: function(){
      $("#phoneprefix").removeClass("error");
      errors["phoneprefix"] = 0;
      if( validation["phonearea"]["test"].test( $("#phonearea").val() ) &&
          validation["phonesuffix"]["test"].test( $("#phonesuffix").val() ) ){
        $("#phone_label").removeClass("error");
      }
    },
    fail: function(){
      $("#phone_label,#phoneprefix").addClass("error");
      errors["phoneprefix"] = 1;
    }
  },
  phonesuffix: {
    test: /\d{4}/,
    pass: function(){
      $("#phonesuffix").removeClass("error");
      errors["phonesuffix"] = 0;
      if( validation["phoneprefix"]["test"].test( $("#phoneprefix").val() ) &&
          validation["phonearea"]["test"].test( $("#phonearea").val() ) ){
        $("#phone_label").removeClass("error");
      }
    },
    fail: function(){
      $("#phone_label,#phonesuffix").addClass("error");
      errors["phonesuffix"] = 1;
    }
  },
  q1: {
    test: function(){
      return $("#q1 option:selected").val().length > 0;
    },
    pass: function(){
      $("#q1_label,#q1").removeClass("error");
      errors["q1"] = 0;
    },
    fail: function(){
      $("#q1_label,#q1").addClass("error");
      errors["q1"] = 1;
    }
  }
};

$(document).ready(function(){
  // Set up form validation
  setupValidation();
  // Go to the first form field
  $("#filename").focus();
});

function setupValidation(){
  $("input[type=text],input[type=radio],select").blur( inputChanged ).change( inputChanged );
  $("input[type=checkbox]").blur( inputChanged ).click( inputChanged );
  $("#zip,#phonearea,#phoneprefix,#phonesuffix").keypress( isNumberKey );
  $("#process_file").submit( validateForm );
  $("#phonearea,#phoneprefix,#phonesuffix").keyup( handlePhoneInput );
}

function validateForm(){
  $("input[type=text],input[type=checkbox],input[type=radio],select").each( inputChanged );
  
  var errorCount = 0;
  for( var i in errors ){
    errorCount += errors[i];
  }
  
  if( errorCount == 1 ){
    return true;
  } else if( errorCount == 0 ){
    return true;
  } else {
    $("input[type=text].error,input[type=checkbox].error,input[type=radio].error,select.error")[0].focus();
    //if( errors["process"] ){
      //return false;
      //console.log('process NOT checked!');
    //}
    var container = $("html, body");
    var scrollTo = $("#filename");
    
    return false;
  }
}

function inputChanged(){
  var element = $(this);
  element.val( $.trim( element.val() ));
  
  if( validation[element.attr("id")] && validation[element.attr("id")]["test"] ){
    if( typeof validation[element.attr("id")]["test"] == "object" ){
      if( validation[element.attr("id")]["test"].test( element.val() ) ){
        validation[element.attr("id")]["pass"].call();
      } else {
        validation[element.attr("id")]["fail"].call();
      }
    } else {
      if( validation[element.attr("id")]["test"].call() ){
        validation[element.attr("id")]["pass"].call();
      } else {
        validation[element.attr("id")]["fail"].call();
      }
    }
  }
  
  var errorCount = 0;
  for( var i in errors ){
    errorCount += errors[i];
  }
  
  if( errorCount == 0 ){
    $("#error_message").hide();
  }
}

function handlePhoneInput(event){
  if( event.which >= 48 && event.which <= 57 ){
    if( event.target.id == "phonearea" && $(event.target).val().length == 3 ){
      $("#phoneprefix").focus();
    } else if( event.target.id == "phoneprefix" && $(event.target).val().length == 3 ){
      $("#phonesuffix").focus();
    } else if( event.target.id == "phonesuffix" && $(event.target).val().length == 4 ){
      $("#birthmonth").focus();
    }
    return true;
  } else {
    return false;
  }
}

function isNumberKey(event){
  // which should normalize all the different numbers and Firefox registers tab as 0
  // (others don't register tab at all)
  if( (event.which >= 48 && event.which <= 57) || event.which == 0 ){
    return true;
  } else {
    return false;
  }
}
