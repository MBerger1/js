/* 
#
File:	jquery-prodDetail.js
Auth:	MBerger
Notes:	jQuery port of prototype on prodDetail.iphtml.  Edit away.
#
#
establish jQuery behavior 
*/
var $j = jQuery;

$j(function(){
  /* $j.fx.off = true;
  alert(checked_sams);
  */

  checked_walmart == 'y' ? 
    $j("input[type=checkbox][name='walmart']").prop("checked",true) : 
    $j("input[type=checkbox][name='walmart']").prop("checked",false);
  checked_wm_sample == 'y' ? 
    $j("input[type=radio][name='wm_offer'][value='']").prop("checked",true) : 
    $j("input[type=radio][name='wm_offer'][value='']").prop("checked",false);
  checked_wm_offer == 'y' ? 
    $j("input[type=radio][name='wm_offer'][value='y']").prop("checked",true) : 
    $j("input[type=radio][name='wm_offer'][value='y']").prop("checked",false);
  checked_wm_feedback == 'y' ? 
    $j("input[type=checkbox][name='wm_feedback_optin'][value='y']").prop("checked",true) :
    $j("input[type=checkbox][name='wm_feedback_optin'][value='y']").prop("checked",false);
  checked_wm_template == 'y' ? 
    $j("input[type=checkbox][name='wm_template'][value='y']").prop("checked",true) :
    $j("input[type=checkbox][name='wm_template'][value='y']").prop("checked",false); 
  if ( checked_sams == 'y' ) { 
    $j("input[type=checkbox][name='sams_template'][value='y']").prop("checked",true);
    $j('table#program_type').removeClass("program_type");
    $j('table#program_type').addClass("program_type_full");
  } else {
    $j("input[type=checkbox][name='sams_template'][value='y']").prop("checked",false);
  }
  checked_membercard == 'y' ? 
    $j("input[type=checkbox][name='membercard_optional'][value='y']").prop("checked",true) : 
    $j("input[type=checkbox][name='membercard_optional'][value='y']").prop("checked",false);
  checked_crm == 'y' ?
    $j("input[type=checkbox][name='walmart_crm'][value='y']").prop("checked",true) :
    $j("input[type=checkbox][name='walmart_crm'][value='y']").prop("checked",false);
  vc_checked == 'y' ?
    $j("input[type=checkbox][name='viral_control']").prop("checked",true) :
    $j("input[type=checkbox][name='viral_control']").prop("checked",false);
  checked_notify == 'y' ?
    $j("input[type=checkbox][name='email_notify']").prop("checked",true) :
    $j("input[type=checkbox][name='email_notify']").prop("checked",false);
  vc_secure_checked == 'y' ?
    $j("input[type=checkbox][name='vc_secure']").prop("checked",true) :
    $j("input[type=checkbox][name='vc_secure']").prop("checked",false);
  vc_referrer_req_checked == 'y' ?
    $j("input[type=checkbox][name='vc_referrer_req']").prop("checked",true) :
    $j("input[type=checkbox][name='vc_referrer_req']").prop("checked",false);

  $('input[name="vc_redirect"]').prop('checked', false);

  if (vc_redirect_url_checked == 'y') {
    $('#vc_redirect_url').prop('checked', true);
  }
  else if (vc_redirect_referer_checked == 'y') {
    $('#vc_redirect_referer').prop('checked', true);
  }
  else if (vc_redirect_unavailable_checked == 'y') {
    $('#vc_redirect_unavailable').prop('checked', true);
  }

  checked_seedorder == 'y' ?
    $j("input[type=checkbox][name='seedorder']").prop("checked",true) :
    $j("input[type=checkbox][name='seedorder']").prop("checked",false);
  fcheck == 'y' ?
    $j("input[type=checkbox][name='fulfill']").prop("checked",true) :
    $j("input[type=checkbox][name='fulfill']").prop("checked",false);

  var CHECKED = $j("input[name='walmart'][value='y']:checked").val();
  if ( CHECKED  == 'y' ) {
    $j("div#walmart-detail").show();
  } else {
    $j("div#walmart-detail").hide();
  }

  var sams_checked = $j("input[name='sams_template'][value='y']:checked").val();
  if ( sams_checked  == 'y' ) {
    $j("table#program_type td:eq(4)").show();
    $j("table#program_type td:eq(5)").show();
    $j("table#program_type td:eq(6)").show();
    $j("table#program_type td:eq(7)").show();
    $j("table#program_type td:eq(8)").show();
    $j("table#program_type td:eq(9)").show();
    $j("table#program_type td:last").show();
    $j('table#program_type').removeClass("program_type");
    $j('table#program_type').addClass("program_type_full");
  } else {
    $j("table#program_type td:eq(4)").hide();
    $j("table#program_type td:eq(5)").hide();
    $j("table#program_type td:eq(6)").hide();
    $j("table#program_type td:eq(7)").hide();
    $j("table#program_type td:eq(8)").hide();
    $j("table#program_type td:eq(9)").hide();
    $j("table#program_type td:last").hide();
  }

  var CHECKED2 = $j("input[name='wm_feedback_optin'][value='y']:checked").val();
  if ( CHECKED2  == 'y' ) {
    $j("div#walmart-feedback-detail").show();
  } else {
    $j("div#walmart-feedback-detail").hide();
  }

  var CHECKED3 = $j("input[name='walmart_crm'][value='y']:checked").val();
  if ( CHECKED3  == 'y' ) {
    $j("div#walmart-crm-detail").show();
  } else {
    $j("div#walmart-crm-detail").hide();
  }

  var VC_CHECK = $j("input[name='viral_control'][value='y']:checked").val();
  if ( VC_CHECK  == 'y' ) {
    $j("div#vc_options").show();
  } else {
    $j("div#vc_options").hide();
  }
});
/* 
Sams/walmart behaviors 
*/
$j(function(){
  $j("input[name='walmart'][value='y']").click(function(){
    $j(this).closest('div#walmart').find('div#walmart-detail').toggle('slow');
  });
  $j("input[name='wm_feedback_optin'][value='y']").click(function(){
    $j(this).closest('div#walmart-feedback-optin').find('div#walmart-feedback-detail').toggle('slow');
  });
  $j("input[name='walmart_crm'][value='y']").click(function(){
    $j(this).closest('div#walmart-crm').find('div#walmart-crm-detail').toggle('slow');
  });
  $j("input[name='viral_control'][value='y']").click(function(){
    $j(this).closest('div#viral_control').find('div#vc_options').toggle('slow');
  });
  $j("input[name='wm_template'][value='y']").click(function(){
    $j(this).closest('div#walmart-detail').find('table#program_type td:eq(4)').hide('slow');
    $j(this).closest('div#walmart-detail').find('table#program_type td:eq(5)').hide('slow');
    $j(this).closest('div#walmart-detail').find('table#program_type td:eq(6)').hide('slow');
    $j(this).closest('div#walmart-detail').find('table#program_type td:eq(7)').hide('slow');
    $j(this).closest('div#walmart-detail').find('table#program_type td:eq(8)').hide('slow');
    $j(this).closest('div#walmart-detail').find('table#program_type td:eq(9)').hide('slow');
    $j(this).closest('div#walmart-detail').find('table#program_type td:last').hide('slow');
    $j("input[type=checkbox][name='sams_template'][value='y']").prop("checked",false);
    if ( $('table#program_type').hasClass("program_type_full") ) {
      $j('table#program_type').removeClass("program_type_full");
      $j('table#program_type').addClass("program_type");
    }
  });
  $j("input[name='sams_template'][value='y']").click(function(){
    $j(this).closest('div#walmart-detail').find('table#program_type td:eq(4)').toggle('slow');
    $j(this).closest('div#walmart-detail').find('table#program_type td:eq(5)').toggle('slow');
    $j(this).closest('div#walmart-detail').find('table#program_type td:eq(6)').toggle('slow');
    $j(this).closest('div#walmart-detail').find('table#program_type td:eq(7)').toggle('slow');
    $j(this).closest('div#walmart-detail').find('table#program_type td:eq(8)').toggle('slow');
    $j(this).closest('div#walmart-detail').find('table#program_type td:eq(9)').toggle('slow');
    $j(this).closest('div#walmart-detail').find('table#program_type td:last').toggle('slow');
    $j("input[type=checkbox][name='wm_template'][value='y']").prop("checked",false);
    if ( $('table#program_type').hasClass("program_type") ) {
      $j('table#program_type').removeClass("program_type");
      $j('table#program_type').addClass("program_type_full");
    } else if ( $('table#program_type').hasClass("program_type_full") ) {
      $j('table#program_type').removeClass("program_type_full");
      $j('table#program_type').addClass("program_type");
    }
  });
});
/* 
validation moved here 
*/
$j(function(){
  $j("input[type='submit'][name='Submit2']").click(function(){
   /* 
   setup vars
   */
    var fulfill = $j("input[name='fulfill'][value='y']:checked").val();
    var url = $j(':text#program_url').val();
    var integerRegex = /^\d+$/;
    var VC_CHECK = $j("input[name='viral_control'][value='y']:checked").val();
    var prod_name = $j(':text#prod_name').val();
    var orig_qty = $j(':text#orig_qty').val();

    if ( !fulfill ) {
      if( !urlRegex.test( url )){
        $j('table#mainTable td:eq(11)').addClass('field-with-errors');
        alert('The program URL must be set - do not forget the http://');
        return false;
      }
    }
    if ( !prod_name ) {
      alert('Please enter the Product Name...');
      return false;
    }
    if ( !orig_qty ) {
      alert('Please enter an Initial Quantity...');
      return false;
    }

    if ( VC_CHECK  == 'y' ) {
      /* 
      Make sure that an integer number has been entered for throttling
      */
      var vc_throttle = $j(':text#vc_throttle').val();
      if( vc_throttle ){
        if( !integerRegex.test( vc_throttle )){
          alert('The throttle value appears to be invalid.  Please re-enter.');
          return false;
        }
      }
      /* 
      Make sure that an integer number has been entered for key life
      */
      var vc_keylife = $(':text#vc_keylife').val();
      if( vc_keylife ){
        if( !integerRegex.test( vc_keylife )){
          alert('The Key Life value needs to be a number. Please reenter.');
          return false;
        }
      }
      /*
      setup url check for Valid Referrer and Valid Sources
      */
      var vc_valid_refer = $j('textarea#vc_referrer_urls').val();
      var vc_valid_refer_t = vc_valid_refer.split(/\s{0,1},\s{0,1}/);
      var vrArray = new Array();
      if ( vc_valid_refer ) {
        $j(vc_valid_refer_t).each(function() {
          if ( !urlRegex.test(this) ) {
            vrArray.push(this);
          }
        });
        var vrErrors = vrArray.join( ', ' );
        if ( vrArray.join( ', ' ) ) {
          $j('#vrErrors').html(vrErrors +  ' url is/are not proper Valid Source URL(s) - hint:dont forget the http://');
        } else {
          $j('#vrErrors').html(''); 
        }
      }
      var vc_valid_sources = $j('textarea#vc_valid_sources').val();
      var vc_valid_sources_t = vc_valid_sources.split( /\s{0,1},\s{0,1}/ );
      var vsArray = new Array();
      if ( vc_valid_sources ) {
        // $j(vc_valid_sources_t).each(function() {
        //   if ( !urlRegex.test(this) ) {
        //     vsArray.push(this);
        //   }
        // });
        var vsErrors = vsArray.join( ', ' );
        if ( vsErrors ) {
          $j('#vsErrors').html(vsErrors +  ' url is/are not proper Valid Source URL(s) - hint:dont forget the http://');
        } else {
          $j('#vsErrors').html(''); 
        }
      }
      if ( vrErrors || vsErrors ) { return false; }
      /* 
      Make sure that an option for redirecting has been selected
      */
      var vc_redirect_has_selection = $j("input[name='vc_redirect']:checked").val();
      if( !vc_redirect_has_selection ){
        $j('#vcrError').html('Please select a redirect option for viral control...');
        return false;
      } else {
        $j('#vcrError').html('');
      }
      /* 
      Make sure that if the redirect to URL option is selected, that a URL has been entered
      */
      var vc_redirect_url = $j(':text#vc_redirect_url_address').val();
      if( $j("input[name='vc_redirect'][value='url']:checked").val() ){
        if( !urlRegex.test( vc_redirect_url )) {
          $j('#vcuError').html('The URL for viral control redirect appears to be invalid - do not forget the http://.');
          return false;
        } else {
          $j('#vcuError').html('');
        }
      }
    }
    return true;
  });
});
/* 
* Costco
* startoff init the checkbox
*/
$j(function(){
  /*
  * init dialog box
  */
  var $dialog = $j('<div></div>').dialog({
	autoOpen: false,
	closeOnEscape:true,
	draggable:true,
	resizable:true,
	height:'auto',
	show:'slide',
	closeText:'press escape to exit',
	title:'Costco Notes'
  });
  if ( costco_chk == 'y' ) {
    $j('#costco').prop('checked', true);
    $j('#costco-detail').show();
  } else {
    $j('#costco').prop('checked', false);
    $j('#costco-detail').hide();
  }
  $j('#costco').click( function() {
    //$dialog.dialog('open');
    $j('#costco-detail').toggle('slow');
    var container1 = $j('#spinMe1');
    var detachMe1 = $j('#detacheMe1');
    var feedback1 = $j('<div id="feedback"><img src="../images/indicator.gif"></div>');
    $.ajax ({
          'type': 'post',
          'url': 'adminUpdateAjax.iphtml',
          'data': { 
		item: item, 
		updateCostco: 1, 
		costco: $j('#costco:checked').val() 
	  },
          'beforeSend': function() {
            detachMe1.detach();
            container1.append( feedback1 );
          },
          'success': function(data) {
            if ( data.COSTCO == 'y' ) {
	      $j('#costco').prop('checked', true);
            } else if ( data.COSTCO == 'n' || data.COSTCO == '' ) {
	      $j('#costco').prop('checked', false);
	    }
          },
          'complete': function(){
            feedback1.remove();
            container1.append( detachMe1 );
          },
          'dataType': 'json'
    })
  });
  $j('#sendMeC').click( function() {
    var container2 = $j('#client_name_d');
    var detachMe2 = $j('#submitD');
    var feedback2 = $j('<div id="feedback"><img src="../images/indicator.gif"></div>');
    //console.log('costco_optin = '+$j('#costco_optin:checked').val());
    $.ajax ({
          'type': 'post',
          'url': 'adminUpdateAjax.iphtml',
          'data': { item: item, 
		updateCostco2: 1, 
		header_text: $j('#header_text').val(), 
		footer_text: $j('#footer_text').val(), 
		membercard_optional: $j('#costco_membercard_optional:checked').val(), 
		costco_optin: $j('#costco_optin:checked').val(), 
		capturetable: $j('#capturetable').val(),
		client_name: $j('#client_name').val(),
		client_prod:  $j('#client_prod').val()
	  },
          'beforeSend': function() {
            detachMe2.detach();
            container2.append( feedback2 );
          },
          'success': function(data) {
	    $j('#header_text').prop('value', data.COSTCO_NAME);
	    $j('#bg_color').prop('value', data.BACKGROUND_COLOR);
          },
          'complete': function(){
            feedback2.remove();
            container2.append( detachMe2 );
          },
          'dataType': 'json'
    })
  });
});
/* 
* Mikes archive code
*/
$j(function(){
  var url = $j(':text#program_url').val();
  $j("input[type='button'][name='status'][step='1']").click(function(){
    if ( !urlRegex.test( url ) ) {
      $j('table#mainTable td:eq(11)').addClass('field-with-errors');
      alert('The URL for this program appears to be invalid - do not forget the http://.');
      return false;
    }
    else {
      location.href='scheduleArchive.iphtml?item=' + item + '&url=' + url;
    }
    return true;
  });
  $j("input[type='button'][name='status'][step='2']").click(function(){
    location.href='scheduleArchive.iphtml?item=' + item + '&action=cancel';
  });
  $j("input[type='button'][name='status'][step='3']").click(function(){
    location.href='scheduleArchive.iphtml?item=' + item + '&action=cancel';
  });
  $j("input[type='button'][name='status'][step='4']").click(function(){
    location.href='scheduleArchive.iphtml?item=' + item + '&action=restore';
  });
});
