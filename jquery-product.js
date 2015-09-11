/* 
#
File:	jquery-product.js
Auth:	MBerger
#
#
establish jQuery behavior 
*/
$(function() {
  if ( costcoUploadImage == 'y' ) {
    $('#admintabs').tabs({
      active:2,
      beforeLoad: function(event, ui) {
        if ( /qq-sample-survey/i.test(ui.ajaxSettings.url) ) {
          $('#qqLoader').show();
          $('#getQQ').hide();
        } else if ( /pre-sample-survey/i.test(ui.ajaxSettings.url) ) {
          $('#preLoader').show();
          $('#getPre').hide();
        } else if ( /post-sample-survey/i.test(ui.ajaxSettings.url) ) {
          $('#postLoader').show();
          $('#getPost').hide();
        }
        /* if ajax call to retrieve tab content failed */
        ui.jqXHR.error(function() {
          $('#qqLoader').hide();
          $('#preLoader').hide();
          $('#postLoader').hide();
          ui.panel.html("An error occured while loading survey tab");
        });
      },
      /* Called when tab is loaded */
      load: function(event, ui) {
        $('#qqLoader').hide();
        $('#getQQ').show();
        $('#preLoader').hide();
        $('#getPre').show();
        $('#postLoader').hide();
        $('#getPost').show();
      }
    });
  } else if ( retailerUploadImage == 'y' ) {
    $('#admintabs').tabs({
      active:2,
      beforeLoad: function(event, ui) {
        if ( /qq-sample-survey/i.test(ui.ajaxSettings.url) ) {
          $('#qqLoader').show();
          $('#getQQ').hide();
        } else if ( /pre-sample-survey/i.test(ui.ajaxSettings.url) ) {
          $('#preLoader').show();
          $('#getPre').hide();
        } else if ( /post-sample-survey/i.test(ui.ajaxSettings.url) ) {
          $('#postLoader').show();
          $('#getPost').hide();
        }
        /* if ajax call to retrieve tab content failed */
        ui.jqXHR.error(function() {
          $('#qqLoader').hide();
          ui.panel.html("An error occured while loading survey tab");
        });
      },
      /* Called when tab is loaded */
      load: function(event, ui) {
        $('#qqLoader').hide();
        $('#getQQ').show();
        $('#preLoader').hide();
        $('#getPre').show();
        $('#postLoader').hide();
        $('#getPost').show();
      }
    });
  } else {
    $('#admintabs').tabs({
      active:0,
      /*get tab id*/
      beforeActivate: function (event, ui) {
        /*console.log(ui.newTab.attr("aria-controls"));*/
        /*console.log(ui.newPanel.attr('id'));*/
      },
      beforeLoad: function(event, ui) {
        if ( /qq-sample-survey/i.test(ui.ajaxSettings.url) ) {
          $('#qqLoader').show();
          $('#getQQ').hide();
	} else if ( /pre-sample-survey/i.test(ui.ajaxSettings.url) ) {
	  $('#preLoader').show();
	  $('#getPre').hide();
	} else if ( /post-sample-survey/i.test(ui.ajaxSettings.url) ) {
	  $('#postLoader').show();
	  $('#getPost').hide();
	}
        /* if ajax call to retrieve tab content failed */
        ui.jqXHR.error(function() {
          $('#qqLoader').hide();
          ui.panel.html("An error occured while loading survey tab");
        });
      },
      /* Called when tab is loaded */
      load: function(event, ui) {
        $('#qqLoader').hide();
        $('#getQQ').show();
	$('#preLoader').hide();
	$('#getPre').show();
	$('#postLoader').hide();
	$('#getPost').show();
      }
    });
    //$('#admintabs').tabs({
      //selected:'0',
      ///* spinner:"<img src='../images/indicator.gif'>"*/
      //spinner:"Loading...",
      //cache: false,
      //ajaxOptions: {cache: false}
    //});
  }
  /*
  * build members table
  */
  $('#buildTableMembers').click( function() {
    $.post('adminUpdateAjax.iphtml', {
	item: item,
	type: 'sm_members',
	buildMembersTable: 1 }, function(response) {
      $('#build_table_smMembers').html(response); 
      setAnimation('build_table_smMembers');
    }, 'html' );
  });
  /*
  * init dialog box
  */
  var $dialog = $('<div></div>').dialog({
                    autoOpen: false,
                    title: 'Admin Documentation',
                    width: 300,
                    position: ['right','bottom']
                  });
  /*
  * init archive button
  */
  if ( status == 'archive' ) {
    $('#status-form').hide();
    $('#cancelArch').show()
      .css({ 
	'border': '2px solid', 
	'borderColor': '#FF0000', 
	'backgroundColor': '#FFFFCC',
	'padding': '10px',
	'width': '75%'
	});
    $('#cancel-archiving').mouseover(function(){
      $.get('archive-buttons.html', function(response) {
        $dialog.html(response).dialog('open');
      });
    });
    $('#restoreArch').hide();
    $('#pendingArch').hide();
  } else if ( status == 'archived' ) {
    $('#status-form').hide();
    $('#cancelArch').hide();
    $('#restoreArch').show();
    $('#pendingArch').hide();
    $('#restore').mouseover(function(){
      $.get('restore-buttons.html', function(response) {
        $dialog.html(response).dialog('open');
      });
    });
  } else if ( status == 'pending' ) {
    $('#status-form').hide();
    $('#cancelArch').hide();
    $('#restoreArch').hide();
    $('#pendingArch').show()
      .css({
        'border': '2px solid',
        'borderColor': '#FF0000',
        'backgroundColor': '#FFFFCC',
        'padding': '10px',
        'width': '75%'
        });
    $('#pending').mouseover(function(){
      $.get('restore-buttons.html', function(response) {
        $dialog.html(response).dialog('open');
      });
    });
  } else {
    $('#arch-form').hide();
    if ( status == 'inactive' ) {
      $('#archSpan').show()
      .mouseover(function(){
        $.get('archive-buttons.html', function(response) {
          $dialog.html(response).dialog('open');
        });
      });
    }
  }
  status == 'inactive' ? $('#archSpan').show() : $('#archSpan').hide();
  status == 'test' ? $('#removeSpan').show() : $('#removeSpan').hide();
  /*
  Setup button styling
  */
  $('#archive').button({ 
    text: true, icons: {primary: '', secondary: 'ui-icon-info'} 
  }); 
  $('#cancel-archiving').button({ 
    text: true, icons: {primary: '', secondary: 'ui-icon-info'} 
  });
  $('#restore').button({ 
    text: true, icons: {primary: '', secondary: 'ui-icon-info'} 
  });
  $('#pending').button({ 
    text: true, icons: {primary: 'ui-icon-clock', secondary: 'ui-icon-info'} 
  });
  $('#remove').button({ 
    text: true, icons: {primary: '', secondary: ''} 
  });
  /*
  * delete button
  */
  //console.log('adminUrl = '+adminUrl);
  $('#remove').click(function() {
    var dwarn = confirm('Delete '+item+'?');
    if ( dwarn == true ) {
      $.ajax ({
        'type': 'post',
        'url': 'adminUpdateAjax.iphtml',
	'data': { item: item, do_delete: 1 },
        'dataType': "json"
      }).done( function ( msg ) {
         if ( msg.errstr == item+' removed' ) {
	   $('#container').replaceWith("<div id='removed' style='background:#f00;min-height=50%;font-size:50px;text-align=center'><p>"+item+" REMOVED</p>");
         }
      }).fail ( function( jqXHR, status, errorThrown ) {
        alert('unable to delete item '+item+' (' + status + ': ' + errorThrown + ') - please see a developer for assistance.' );
      });
    } else {
      return false;
    }
  });
  /*
  * setup click behavior
  */
  $("#active").click(function(){
    $.ajax ({
      'type': 'post',
      'url': 'adminUpdateAjax.iphtml',
      'data': { item: item, do_status: 1, user: user, IP: IP, status: $(this).val() },
      'beforeSend': function() {
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
        $('#mask').fadeTo('slow',0.8)
          .css({
            'background': '#000',
            'position': 'absolute',
            'left': '0',
            'top': '0',
            'width': maskWidth,
            'height': maskHeight,
            'z-index': '999'
          });
        $('#bgWindow').fadeIn('fast')
          .css({
            'background': '#fff',
            'padding': '20px',
            'border': '20px solid #ddd',
            'float': 'left',
            'position': 'absolute',
            'top': '200px',
            'left': '400px',
            'margin': '0 0 0 0',
            'z-index': '9999',
            '-webkit-box-shadow': '0px 0px 20px #000',
            'moz-box-shadow': '0px 0px 20px #000',
            'box-shadow': '0px 0px 20px #000',
            '-webkit-border-radius': '10px',
            '-border-radius': '10px'
          });
      },
      'dataType': "json"
    }).done( function( data ) {
      if ( data.STATUS == 'active' ) {
        $('#testSpan').removeClass('highlight');
        $('#inactiveSpan').removeClass('highlight');
        $(this).prop('checked',true);
        $('#activeSpan').addClass('highlight');
        $('#arch-form').hide();
        $dialog.html(data).dialog('close');
        $('#archSpan').hide();
        $('#removeSpan').hide();
      } else if( data.STATUS == 'error' ) {
        alert(data.DESCRIPTION);
        $("#" + data.CURRENT_STATUS).prop('checked',true);
      }
    }).fail ( function( jqXHR, status, errorThrown ) {
      alert('unable to activate '+item+' (' + status + ': ' + errorThrown + ')' );
    }).always ( function() {
        $('#mask').hide();
        $('#bgWindow').hide();
        $("#atOn").text('Deactivate');
    });
  });
  $('#test').click(function(){
    $.ajax ({
          'type': 'post',
          'url': 'adminUpdateAjax.iphtml',
          'data': { item: item, do_status: 1, user: user, IP: IP, status: $(this).val() },
  	  'beforeSend': function() {
    	    var maskHeight = $(document).height();
    	    var maskWidth = $(window).width();
    	    $('#mask').fadeTo('slow',0.8)
      	    .css({
            	    'background': '#000',
            	    'position': 'absolute',
            	    'left': '0',
            	    'top': '0',
            	    'width': maskWidth,
            	    'height': maskHeight,
            	    'z-index': '999'
      	    });
    	    $('#bgWindow').fadeIn('fast')
      	    .css({
            	    'background': '#fff',
            	    'padding': '20px',
            	    'border': '20px solid #ddd',
            	    'float': 'left',
            	    'position': 'absolute',
            	    'top': '200px',
            	    'left': '400px',
            	    'margin': '0 0 0 0',
            	    'z-index': '9999',
            	    '-webkit-box-shadow': '0px 0px 20px #000',
            	    'moz-box-shadow': '0px 0px 20px #000',
            	    'box-shadow': '0px 0px 20px #000',
            	    '-webkit-border-radius': '10px',
            	    '-border-radius': '10px'
      	    });
  	  },
          'dataType': "json"
    }).done( function( data ) {
      if ( data.STATUS == 'test' ) {
        $('#activeSpan').removeClass('highlight');
        $('#inactiveSpan').removeClass('highlight');
        $(this).prop('checked',true);
        $('#testSpan').addClass('highlight');
        $('#arch-form').hide();
        $('#archSpan').hide();
        $('#removeSpan').show();
        $dialog.html(data).dialog('close');
      }
    }).fail( function( jqXHR, status, errorThrown ) {
      alert('unable to change '+item+' status to test (' + status + ': ' + errorThrown + ')' );
    }).always( function() {
      $('#mask').hide();
      $('#bgWindow').hide();
    });
  });
  $('#inactive').click(function(){
    $.post('adminUpdateAjax.iphtml', { 
	item: item, 
	do_status: 1, 
	user: user, 
	IP: IP,
	status: $(this).val() }, function(response) {
      if ( response.STATUS == 'inactive' ) {
        $(this).prop('checked',true);
        $('#testSpan').removeClass('highlight');
        $('#activeSpan').removeClass('highlight');
        $('#inactiveSpan').addClass('highlight');
        $('#removeSpan').hide();
        $('#archSpan').show()
        .mouseover(function(){
          $.get('archive-buttons.html', function(response) {
            $dialog.html(response).dialog('open');
          });
        });
        $('#arch-form').hide();
      }
    }, 'json' );
    $("#atOn").text('Activate');
  });
  $('#archive').click(function(){
    $.post('adminUpdateAjax.iphtml', { 
	item: item, 
	do_status: 1, 
	status: $(this).val() }, function(response) {
      if ( response.STATUS == 'archive' ) {
        $(this).prop('checked',true);
        $('#status-form').hide();
        $('#arch-form').show();
        $('#restoreArch').hide();
        $('#pendingArch').hide();
        $('#cancelArch').show()
          .css({ 
	    'border': '2px solid', 
	    'borderColor': '#FF0000', 
	    'backgroundColor': '#FFFFCC',
	    'padding': '10px',
	    'width': '75%'
	    });
      }
    }, 'json' );
    $('#cancel-archiving').mouseover(function(){
      $.get('archive-buttons.html', function(response) {
        $dialog.html(response).dialog('open');
      });
    });
  });
  $('#cancel-archiving').click(function(){
    $.post('adminUpdateAjax.iphtml', { 
	item: item, 
	do_status: 1, 
	status: 'inactive' }, function(response) {
      if ( response.STATUS == 'inactive' ) {
        $('#inactive').prop('checked',true);
        $('#arch-form').hide();
        $('#status-form').show();
        $('#archSpan').show();
      }
    }, 'json' );
    $("#archive").mouseover(function(){
      $.get('archive-buttons.html', function(response) {
        $dialog.html(response).dialog('open');
      });
    });
  });
  $('#restore').click(function(){
    $.post('adminUpdateAjax.iphtml', { 
	item: item, 
	do_status: 1, 
	status: 'pending' }, function(response) {
      if ( response.STATUS == 'pending' ) {
        $('#inactive').prop('checked',true);
        $('#status-form').hide();
        $('#arch-form').show();
        $('#cancelArch').hide();
        $('#restoreArch').hide();
        $('#pendingArch').show()
          .css({
            'border': '2px solid',
            'borderColor': '#FF0000',
            'backgroundColor': '#FFFFCC',
            'padding': '10px',
            'width': '75%'
            });
      }
    }, 'json' );
    $('#pending').mouseover(function(){
      $.get('restore-buttons.html', function(response) {
        $dialog.html(response).dialog('open');
      });
    });
  });
  /*
  admin config tab
  */
  /* schedule status change */
  $('#schedYear').click(function() { $(this).val('') });
  $('#hh24').change(function() { $('#schedErr').hide() });
  $('#schedMonth').change(function() { $('#schedErr').hide() });
  $('#schedDay').change(function() { $('#schedErr').hide() });
  $('#schedYear').change(function() { $('#schedErr').hide() });
  $('#schedStatus').on('click', function() {
    var status = (function () {
      var status = null;
      $.ajax ({
          'async': false,
          'global': false,
          'url': 'adminUpdateAjax.iphtml',
          'dataType': "json",
          'data': { item: item, get_status: 1 },
          'success': function (data) { status = data; }
      });
      return status;
    })();
    var action = status['STATUS'] == 'active' ? 'deactivate' : 'activate';
    var $this = $(this);
    if ( $('#hh24 option:selected').val() && $('#schedMonth option:selected').val() && $('#schedDay option:selected').val() && $('#schedYear').val() ) {
      $('#schedErr').hide();
      $.ajax ({
	  type: 'post',
	  url: 'adminUpdateAjax.iphtml',
	  data: {
	    item: item,
	    schedStatus: 1,
	    action: action,
	    hour: $('#hh24 option:selected').val(),
	    schedMonth: $('#schedMonth option:selected').val(),
	    schedDay: $('#schedDay option:selected').val(),
	    schedYear: $('#schedYear').val(),
	  },
	  beforeSend: function() {
    	    $('.indicator-sched').show();
    	    $this.hide();
	  }
      }).done( function( data ) {
        $('.green-tick').show();
        setTimeout(function() {
          $('.green-tick').hide();
        }, 5000);
      }).fail( function( jqXHR, status, errorThrown ) {
        $('#admin-feedback').html( 'An error occured scheduling status change (' + status + ': ' + errorThrown + ') - please consult a developer.' );
      }).always( function() {
        $('.indicator-sched').hide();
        $this.show();
      });
    } else {
      $('#schedErr').show();
    }
  });
  /* setup tab1 admin config */
  $('#admin-button').on('click', function() { 
    var url = $('#program_url').val();
    var fulfill = $("#fulfill:checked").val();
    if ( !fulfill ) {
      if( !urlRegex.test( url ) ) {
        $('#program_url_e').html('Please enter a valid URL')
	  .css({
   	  'font-size': '10px',
          'color': 'red'
          });
        return false;
      } else {
        $('#program_url_e').html('');
      }
    }
    if ( !$("#prod_name").val() ) {
      $('#prod_name_e').html('Please enter a product name')
        .css({
        'font-size': '10px',
        'color': 'red'
        });
      return false;
    } else {
      $('#prod_name_e').html('');
    }
    var formVals = $('#updateForm1').serialize();
    var tab1_container = $('#tab1Div');
    var tab1_detachMe = $('#admin-button-p');
    var tab1_feedback = $('<p id="feedback"><img src="../images/indicator.gif"></p>');
    $.ajax ({
          type: 'post',
          url: 'adminUpdateAjax.iphtml',
	  data: formVals,
  	  beforeSend: function() {
	    tab1_detachMe.detach();
	    tab1_container.append( tab1_feedback );
	  },
          dataType: 'json'
    }).done( function( data ) {
      $("#prod_name").prop("value",data.NAME);
      $("#project_number").prop("value",data.PROJECT_NUMBER);
      $("#prog_agreement_qty").prop("value",data.PROG_AGREEMENT_QTY);
      $("#suffix_name").prop("value",data.SUFFIX_NAME);
      $("#manid").prop("value",data.MANID);
      $("#program_url").prop("value",data.URL).prop("size",url.length+2);
      ( data.FULFILL == 'y' ) ?
      $("#fulfill").prop('checked',true) :
      $("#fulfill").prop('checked',false) ;
      $("a#program_url_link").prop("href",data.URL).html(data.URL)
        .css({
          /*'border': '1px dotted',*/
          'padding': '5px',
          'borderColor': '#808080',
          'backgroundColor': '#FFFFCC'
        });
      $("#csm_user_id").prop("value",data.CSM_USER_ID);
      $("#ser_user_id").prop("value",data.SER_USER_ID);
      $("#country_code").prop("value",data.COUNTRY_CODE);
      $("#language_code").prop("value",data.LANGUAGE_CODE);
      // Update header info with updated data
      $("#header_product_name").html( data.NAME );
      $("#header_project_number").html( data.PROJECT_NUMBER );
      $("#header_prog_agreement_qty").html( data.PROG_AGREEMENT_QTY );
    }).fail( function( jqXHR, status, errorThrown ) {
      $('#real-time-feedback').html( 'An error occured during update - (' + status + ': ' + errorThrown + ') - please consult a developer.' );
    }).always( function() {
      tab1_feedback.remove();
      tab1_container.append( tab1_detachMe );
    });
  });
  $('#configCustReports').click( function() { 
    var containerCr = $('#spinMeCr');
    var detachMeCr = $('#detacheMeCr');
    var feedbackCr = $('<div id="feedback"><img src="../images/indicator.gif"></div>');
    $.ajax ({
          'type': 'get',
          'url': 'customerReportConfigTabs.iphtml',
          'data': { item: item },
          'beforeSend': function() {
            detachMeCr.detach();
            containerCr.append( feedbackCr );
          },
          'dataType': 'html'
    }).done( function( data ) {
      $('#loadCustReport').html(data);
    }).fail ( function( jqXHR, status, errorThrown ) {
      $('#conf-reports-feedback').html( 'An error occured loading reports content - (' + status + ': ' + errorThrown + ') - please consult a developer.' );
    }).always( function () {
      feedbackCr.remove();
      containerCr.append( detachMeCr );
    });
  }); 
  /*
  init seedorder
  */
  $('.seeds-form').find('input[type=checkbox]:checked').parent().css('font-weight','bold');
  $('.seed-order').on('click', function () {
    if ( $(this).prop('checked') ) {
      $('.seed-groups').slideDown();
    }
    else {
      $('.seed-groups').slideUp();
      //$('.seed-groups').find('[type=checkbox]').prop('checked',false);
    }
  });
  $('.seeds-form').on('submit', function (e) {
    e.preventDefault();
    var $this = $(this);
    $.ajax({
      url: $this.attr('action'),
      type: $this.attr('method'),
      data: $this.serialize(),
      dataType: 'json',
      beforeSend: function() {
        $this.find('.indicator-gif').show();
        $this.find('[type=submit]').prop('disabled',true);
        $this.find('.seed-groups input[type=checkbox]').each(function() {
          if ( $(this).prop('disabled') ) {
            $(this).attr('data-prev-disabled','true');
          }
          else {
            $(this).attr('data-prev-disabled','false').prop('disabled',true);
          }
        });
      }
    }).done( function( json, status, jqXHR ) {
      if ( !json.alert || /^\s*$/.test(json.alert) ) {
        if ( json.seedorder == '1' ) {
          $this.find('.seed-order').prop('checked',true);
        }
        else {
          $this.find('.seed-order').prop('checked',false);
        }

        $this.find('.seed-groups input[type=checkbox]').each(function() {
          if ( $.inArray($(this).val(),json.groups) > -1 ) {
            $(this).prop('checked',true);
          }
          else {
            $(this).prop('checked',false).prop('disabled',false);
          }
        });
        $this.find('input[type=checkbox]:not(:checked)').parent().css('font-weight','normal');
        $this.find('input[type=checkbox]:checked').parent().css('font-weight','bold');
      }
      else {
        alert(json.alert);
        $this.find('.seed-groups input[type=checkbox][data-prev-disabled=false]').prop('disabled',false);
      }
    }).fail ( function( jqXHR, status, errorThrown ) {
      alert('An Error occurred while updating Seeds. Please contact a Developer.');
      $this.find('.seed-groups input[type=checkbox][data-prev-disabled=false]').prop('disabled',false);
    }).always( function () {
      $this.find('.indicator-gif').hide();
      $this.find('[type=submit], .seed-order').prop('disabled',false);
      $this.effect('highlight','slow');
    });
  });
  //$("*", document.body).each(function () {
    //var parentTag = $(this).parent().get(0).tagName;
    //$(this).prepend(document.createTextNode(parentTag + " > "));
  //});
  /*
  Inventory control tab
  */
  $('#updateForm2').on('click', '#clickForecast', function() {
    var loadContent = $('#loadForecastReport');
    var clickForecast = $('#clickForecast');
    var loadFeedback = $('<p id="feedback"><img src="../images/indicator.gif"></p>');
    $.ajax ({
          'type': 'get',
          'url': 'forcastReportTabs.iphtml',
	  'data': { item: item, load: 1, final_size: $("#final_size").val() },
  	  'beforeSend': function() {
	    clickForecast.after( loadFeedback );
	    clickForecast.detach();
  	  },
          'dataType': 'html'
    }).done( function( data ) {
      loadContent.html(data);
    }).fail( function( jqXHR, status, errorThrown ) {
      alert('An Error occurred while loading the forecast report. Please contact a Developer.');
    }).always( function () {
      if ( $('#hideLoadContainer').length != 0 ) {
        $('#hideLoadContainer').remove();
      }
      loadFeedback.remove();
      loadContent.before( clickForecast );
      clickForecast.after('<div id="hideLoadContainer"><input type="button" name="hideLoadForecast" class="hideLoadForecast" value="Hide Forecasting Tool >>" /></div>');
      $('.hideLoadForecast').on('click', function() {
        $(this).parent().remove();
        $(this).remove();
        $('#loadForecastReport').html('');
      });
    });
  });
  var chkOrigQty = setInterval(function () {
    $.ajax({
        'type': 'get',
        'url': 'adminUpdateAjax.iphtml',
        'data': { item: item, getInventory: 1 },
        'dataType': 'json'
    }).done( function( data ) {
      // progress from 1-100
      if ( data.ORIG_QTY != $('#orig_qty').val() ) {
        alert('The inventory has changed since this page was last loaded.\n\nPlease right-click inside the iFrame and select Reload frame from the context menu.');
        return false;
        //console.log('setButton is YES');
        clearInterval(chkOrigQty);
      }
    }).fail( function( jqXHR, status, errorThrown ) {
      // on error, stop execution
      clearInterval(chkOrigQty);
    });
  }, 60000);
  $('#email_notify').click( function() {
    if ( $("#email_notify:checked").val() == 'y' ) {
      var activateEN = confirm('You are activating email notification - Proceed?');
      if ( !activateEN ) {
        return false;
      }
    } else {
      var deactivateEN = confirm('You are de-activating email notification - Proceed?');
      if ( !deactivateEN ) {
        return false;
      }
    }
  });
  $('input#inventory-button').click( function() { 
    if ( !$("#orig_qty").val() ) {
      $("#orig_qty_e").html('Be sure to enter an original quantity')
        .css({
        'font-size': '10px',
        'color': 'red'
        });
      return false;
    } else {
      $("#orig_qty_e").html('');
    }
    /*
    * check to see if orig quantity has been changed
    */
    var get_orig_qty = (function () {
      var get_orig_qty = null;
      $.ajax ({
            'async': false,
            'global': false,
            'url': 'adminUpdateAjax.iphtml',
            'dataType': 'json',
            'data': { item: item, getInventory: 1 },
            'success': function (data) { get_orig_qty = data; }
      });
      return get_orig_qty;
    })();
    //console.log('update_remain_qty = '+$('#update_remain_qty').val());
    if ( get_orig_qty.ORIG_QTY == orig_qty || $('#update_remain_qty').val() == 1 ) {
      var main_item = total_splitter_orders > 0 ? 1 : 0;
      var formVals2 = $('#updateForm2').serialize()+"&update=1"+"&main_item="+main_item;
      var tab2_container = $('#inventory-p');
      var tab2_detachMe = $('#inventory-button-p');
      var tab2_feedback = $('<p id="feedback"><img src="../images/indicator.gif"></p>');
      $.ajax ({
            'type': 'post',
            'url': 'productInventoryUpdateJSON.iphtml',
	    'data': formVals2,
  	    'beforeSend': function() {
	      tab2_detachMe.detach();
	      tab2_container.append( tab2_feedback );
  	    },
            'dataType': 'json'
      }).done( function( data ) {
       $("#info").html(data.INFO);
         $("#orig_qty").replaceWith('<input class="textbox" type="text" name="orig_qty" id="orig_qty" value="'+data.ORIG_QTY+'" size="7" maxlength="10" />');
         $("#remain_qty").html(data.REMAIN_QTY);
         $("#final_size").html(data.FINAL_SIZE);
         $("#program_size").html(data.PROGRAM_SIZE);
         data.EMAIL_NOTIFY == 'y' ?  $('#email_notify').prop('checked',true) : $('#email_notify').prop('checked',false);
         $("#email_threshold").html(data.EMAIL_THRESHOLD);
         $("#alert_email").html(data.ALERT_EMAIL);
         $('.alert-decrement').prop('checked',(data.ALERT_DECREMENT == 'y'));
         $('.alert-decrement-by').val(data.ALERT_DECREMENT_BY || 50);
      }).fail( function( jqXHR, status, errorThrown ) {
        alert('An Error occurred while updating.\nProduct Info field may have too much data.\nPlease clear old data or contact a Developer.');
      }).always( function () {
        tab2_feedback.remove();
        tab2_container.append( tab2_detachMe );
        orig_qty = $("#orig_qty").val();
      });
    } else {
      alert('The inventory has changed since this page was last loaded.\n\nPlease right-click inside the iFrame and select Reload frame from the context menu.'); 
      return false;
    }
  });
  /* 
  retailer tab
  *
  Sams/walmart behaviors 
  *
  * init page values
  */
  checked_walmart == 'y' ? $("#walmartToggle").prop("checked",true) : $("#walmartToggle").prop("checked",false);
  checked_wm_sample == 'y' ? 
    $("input[type=radio][name='wm_offer'][value='']").prop("checked",true) : 
    $("input[type=radio][name='wm_offer'][value='']").prop("checked",false);
  checked_wm_offer == 'y' ? 
    $("input[type=radio][name='wm_offer'][value='y']").prop("checked",true) : 
    $("input[type=radio][name='wm_offer'][value='n']").prop("checked",true);
  checked_wm_feedback == 'y' ?  $('#wm_feedback_optin').prop("checked",true) : $("#wm_feedback_optin").prop("checked",false);
  checked_walmart_crm == 'y' ?  $('#walmart_crm').prop("checked",true) : $("#walmart_crm").prop("checked",false);
  checked_wm_template == 'y' ? $('#wm_template').prop("checked",true) : $("#wm_template").prop("checked",false); 
  checked_wm_daily_download == 'y' ? $('#wm_daily_download').prop("checked",true) : $("#wm_daily_download").prop("checked",false); 
  //MJB  
  checked_wm_ty_page_custom == 'y' ? $('#wm_ty_page_custom').prop("checked",true) : $("#wm_ty_page_custom").prop("checked",false); 
  checked_wm_ty_page_custom == 'y' ? $('#wm_ty_page_custom_div').show() : $('#wm_ty_page_custom_div').hide();
  checked_sams == 'y' ? $('#sams_template').prop("checked",true) : $("#sams_template").prop("checked",false);
  checked_membercard == 'y' ? 
    $("input[type=checkbox][name='membercard_optional'][value='y']").prop("checked",true) : 
    $("input[type=checkbox][name='membercard_optional'][value='y']").prop("checked",false);
  vc_checked == 'y' ?
    $("#viral_control").prop("checked",true) :
    $("#viral_control").prop("checked",false);
  checked_notify == 'y' ? $('#email_notify').prop('checked',true) : $('#email_notify').prop('checked',false);
  vc_secure_checked == 'y' ?
    $("input[type=checkbox][name='vc_secure']").prop("checked",true) :
    $("input[type=checkbox][name='vc_secure']").prop("checked",false);
  vc_referrer_req_checked == 'y' ?
    $("input[type=checkbox][name='vc_referrer_req']").prop("checked",true) :
    $("input[type=checkbox][name='vc_referrer_req']").prop("checked",false);
  vc_iframe_checked == 'y' ?
    $("input[type=checkbox][name='vc_iframe']").prop("checked",true) :
    $("input[type=checkbox][name='vc_iframe']").prop("checked",false);
  if (vc_referrer_blacklist_checked == 'y'){
    $("input[type=checkbox][name='vc_referrer_blacklist']").prop("checked",true);
    $("#vc_referrers_label").addClass("highlight");
    $("#vc_whitelisted_referrers_label").hide();
    $("#vc_blacklisted_referrers_label").show();
  } else {
    $("input[type=checkbox][name='vc_referrer_blacklist']").prop("checked",false);
    $("#vc_referrers_label").removeClass("highlight");
    $("#vc_blacklisted_referrers_label").hide();
    $("#vc_whitelisted_referrers_label").show();
  }
  vc_logging_checked == 'y' ?
    $("input[type=checkbox][name='vc_logging']").prop("checked",true) :
    $("input[type=checkbox][name='vc_logging']").prop("checked",false);
  vc_redirect_url_checked == 'y' ?
    $("#vc_redirect_url").prop("checked",true) :
    $("#vc_redirect_url").prop("checked",false);
  vc_redirect_referer_checked == 'y' ?
    $("#vc_redirect_referer").prop("checked",true) :
    $("#vc_redirect_referer").prop("checked",false);
  vc_redirect_unavailable_checked == 'y' ?
    $("#vc_redirect_unavailable").prop("checked",true) :
    $("#vc_redirect_unavailable").prop("checked",false);
  
  // Set up the log iframe
  $('#vc_log_iframe').contents().find('head').append('<link rel="stylesheet" href="../admin.css" type="text/css" />');
  vc_log_body = $('#vc_log_iframe').contents().find('body');
  vc_log_body.prop( 'id', 'vc_log_body' );
  
  // Queue up request for logging events
  $.ajax ({
    'type': 'post',
    'url': 'adminUpdateAjax.iphtml',
    'data': { item: item, getVCLog: 1 },
    'beforeSend': function(){
      vc_log_body.append( '<div id="vc_log_working" class="vc_log_entry vc_last_log_entry"><span class="busy">Checking for logging events...</span></div>' );
    },
    'dataType': 'json',
    'timeout': 15000
  }).done( function( data, status, jqXHR ) {
       if ( data.ERROR ) {
        // A successful return saying 'ERROR' which will have an error message suitable for display
        vc_log_body.find('#vc_log_working').remove();
        vc_log_body.append( '<div id="vc_log_error" class="vc_log_entry vc_last_log_entry alert">' + data.ERROR + '</span></div>' );
        $('#order_item_feedback').removeClass().addClass('alert');
        $('#order_item_feedback').html( data.ERROR );
      } else {
        // Populate the log
        for( var i = 0; i < data.length; i++ ){
          // 0 is timestamp
          // 1 is error text
          // 2 is IP
          // 3 is dns name
          var entry_date = new Date( data[i][0] );
          var entry = $( '<div class="vc_log_entry" />' );
          entry.append( $( '<div class="vc_log_timesamp">' + entry_date.toLocaleString() + '</div>' ));
          entry.append( $( '<div class="vc_log_error">' + data[i][1] + '</div>' ));
          entry.append( $( '<div class="vc_log_address" title="' + escape(data[i][3]) + '">' + data[i][2] + '</div>' ));
          
          if( i == data.length - 1 ){
            entry.addClass( 'vc_last_log_entry' );
          }
          
          vc_log_body.append( entry );
          vc_log_body.find('#vc_log_working').remove();
        }
      }   
  }).fail( function( jqXHR, status, errorThrown ) {
      vc_log_body.find('#vc_log_working').remove();
      vc_log_body.append( '<div id="vc_log_error" class="vc_log_entry vc_last_log_entry alert">An unexpected error occured (' + status + ': ' + errorThrown + ')</span></div>' );
      //$( '#vc_feedback' ).html( 'An unexpected error occured (' + status + ': ' + errorThrown + ')' );
  });

  checked_seedorder == 'y' ?
    $("input[type=checkbox][name='seedorder']").prop("checked",true) :
    $("input[type=checkbox][name='seedorder']").prop("checked",false);
  fcheck == 'y' ?
    $("input[type=checkbox][name='fulfill']").prop("checked",true) :
    $("input[type=checkbox][name='fulfill']").prop("checked",false);

  if ( $("#walmartToggle:checked").val()  == 'y' ) {
    $("div#walmart-detail").show();
  } else {
    $("div#walmart-detail").hide();
  }
  if ( $("#sams_template:checked").val() == 'y' ) {
    $('#sams_meta_url_r').show();
    $('#sams_meta_time_r').show();
  } else {
    $('#sams_meta_url_r').hide();
    $('#sams_meta_time_r').hide();
  }
  if ( $("#wm_feedback_optin:checked").val()  == 'y' ) {
    $("div#walmart-feedback-detail").show();
  } else {
    $("div#walmart-feedback-detail").hide();
  }
  if ( $("#walmart_crm:checked").val()  == 'y' ) {
    $("div#walmart-crm-detail").show();
  } else {
    $("div#walmart-crm-detail").hide();
  }
  if ( $("#viral_control:checked").val() == 'y' ) {
    $("div#vc_options").show();
  } else {
    $("div#vc_options").hide();
  }
  $("#walmartToggle").click( function() { 
    if ( $("#costco:checked").val() == 'y' ) {
      alert('Please uncheck Costco before proceeding');
      return false;
    }
    if ( $("#walmartToggle:checked").val() == 'y' ) {
      var activateWM = confirm('You are activating Wal-Mart - Proceed?');
      if ( !activateWM ) { 
        return false;
      }
    } else {
      var deactivateWM = confirm('You are de-activating Wal-Mart - Proceed?');
      if ( !deactivateWM ) {
        return false;
      }
    }
    var container0 = $('#spinMe0');
    var detachMe0 = $('#detacheMe0');
    var feedback0 = $('<div id="feedback"><img src="../images/indicator.gif"></div>');
    $.ajax ({
          'type': 'post',
          'url': 'adminUpdateAjax.iphtml',
          'data': { item: item, updateWalmart: 1, walmart: $('#walmartToggle:checked').val() },
          'beforeSend': function() {
            detachMe0.detach();
            container0.append( feedback0 );
          },
          'dataType': 'json'
    }).done( function( data ) {
      data.WALMART == 'y' ?  $(this).prop('checked',true) : $(this).prop('checked',false);
    }).fail( function( jqXHR, status, errorThrown ) {
      alert('Wal-Mart checkbox failed - Contact a Developer.'); 
    }).always( function () {
      feedback0.remove();
      container0.append( detachMe0 );
    });
    $('div#walmart-detail').toggle('slow');
  });
  $("#wm_feedback_optin").click(function(){
    $('div#walmart-feedback-detail').toggle('slow');
  });
  $("#walmart_crm").click(function(){
    $('div#walmart-crm-detail').toggle('slow');
  });
  $("#wm_template").click(function(){
    $("#sams_template").prop("checked",false);
    $('#sams_meta_url_r').hide('slow');
    $('#sams_meta_time_r').hide('slow');
    $.post('adminUpdateAjax.iphtml', { 
	item: item, 
	updateWmTemplate: 1, 
	wm_template: $('#wm_template:checked').val() }, function(response) {
      response.WM_TEMPLATE == 'y' ?
      $(this).prop('checked',true) :
      $(this).prop('checked',false);
      response.DOWNLOAD_ORDERS == 'y' ?
      $('#wm_daily_download').prop('checked',true) :
      $('#wm_daily_download').prop('checked',false);
    }, 'json' );
    $.post('adminUpdateAjax.iphtml', { 
	item: item, 
	updateSams: 1, 
	sams_template: 'n'}, function(response) {
      response.SAMS_TEMPLATE == 'y' ?
      $("#sams_template").prop('checked',true) :
      $("#sams_template").prop('checked',false);
    }, 'json' );
  });
  $('#wm_daily_download').click(function(){
    $.post('adminUpdateAjax.iphtml', { 
	item: item, 
	updateWmDailyDL: 1, 
	wm_daily_download: $('#wm_daily_download:checked').val() }, function(response) {
      response.DOWNLOAD_ORDERS == 'y' ?  $(this).prop('checked',true) : $(this).prop('checked',false);
    }, 'json' );
  });
  $('#wm_show_shop_now_image').click(function(){
    $('#wm_track_shop_now').prop('checked',true);
  });
  $('#wm_show_brand_page_image').click(function(){
    $('#wm_track_brand_page').prop('checked',true);
  });
  // show/hide custom ty elements
  $('#wm_ty_page_custom').click( function (){
    $.post('adminUpdateAjax.iphtml', { 
	item: item, 
	updateWmTyCustom: 1, 
	wm_ty_page_custom: $('#wm_ty_page_custom:checked').val() }, function(response) {
    });
    $('#wm_ty_page_custom_div').toggle('slow');
  });
  $("#sams_template").click(function(){
    $("#wm_template").prop("checked",false);
    $('#sams_meta_url_r').toggle('slow');
    $('#sams_meta_time_r').toggle('slow');
    $.post('adminUpdateAjax.iphtml', { 
	item: item, 
	updateSams: 1, 
	sams_template: $('#sams_template:checked').val() }, function(response) {
      response.SAMS_TEMPLATE == 'y' ?
      $(this).prop('checked',true) :
      $(this).prop('checked',false);
    }, 'json' );
    $.post('adminUpdateAjax.iphtml', { 
	item: item, 
	updateWmTemplate: 1, 
	wm_template: 'n' }, function(response) {
      response.WM_TEMPLATE == 'y' ?
      $("#wm_template").prop('checked',true) :
      $("#wm_template").prop('checked',false);
    }, 'json' );
  });
  $("#sams_meta_url").blur(function(){
    if ( $(this).val() ) {
      if ( !urlRegex.test($(this).val()) ) {
        $("#sams_meta_url_e").html('<p>Please enter a proper Sams URL - hint:dont forget the http://</p>')
          .css({
          'font-size': '10px',
          'color': 'red'
          });
        return false;
      } else {
        $("#sams_meta_url_e").html('');
      }
    }
  });
  $('#sendMeWm1').click( function() { 
    var containerWm1 = $('#sendMeWm1_d');
    var detachWm1 = $('#submitWm1');
    var feedbackWm1 = $('<div id="feedback"><img src="../images/indicator.gif"></div>');
    $.ajax ({
    	'type': 'post',
    	'url': 'adminUpdateAjax.iphtml',
    	'data': { item: item, 
		wm_ty_page_custom: $('#wm_ty_page_custom:checked').val(), 
		wm_shopnow_redir: $('#wm_shopnow_redir').val(), 
		wm_goToBrandPage_redir: $('#wm_goToBrandPage_redir').val(),
		wm_track_shop_now: $('#wm_track_shop_now:checked').val(), 
		wm_track_brand_page: $('#wm_track_brand_page:checked').val(),
		wm_show_shop_now_image: $('#wm_show_shop_now_image:checked').val(),
		wm_show_brand_page_image: $('#wm_show_brand_page_image:checked').val(),
		sams_meta_url: $('#sams_meta_url').val(),
		sams_meta_time: $('#sams_meta_time').val(),
		wm_offer:  $("input.wm_offer:checked").val(),
		product_name: $('#product_name').val(), 
		min_age: $('#min_age').val(), 
		delivery_time: $('#delivery_time').val(), 
		wm_custom_intro: $('#wm_custom_intro').val(), 
		sams_sample_title: $('#sams_sample_title').val(), 
		wm_options: 1 },
    	'beforeSend': function() {
    	  detachWm1.detach();
    	  containerWm1.append( feedbackWm1 );
    	},
    	'success': function(data) {
    	  $('#sams_meta_url').attr('value', data.SAMS_META_URL);
    	  $('#sams_meta_time').attr('value', data.SAMS_META_TIME);
    	  $('#product_name').attr('value', data.PRODUCT_NAME);
    	  $('#min_age').attr('value', data.MIN_AGE);
    	  $('#delivery_time').attr('value', data.DELIVERY_TIME);
    	  $('#wm_custom_intro').attr('value', data.WM_CUSTOM_INTRO);
    	},
    	'complete': function(){
    	  feedbackWm1.remove();
    	  containerWm1.append( detachWm1 );
    	},
    	'dataType': 'json'
    })
  }); 
  $('#wm_feedback_optin').click(function(){
    $.post('adminUpdateAjax.iphtml', { 
	item: item, 
	do_wm_feedback_optin: 1, 
	wm_feedback_optin: $("#wm_feedback_optin:checked").val() }, function(response) {
      response.WM_FEEDBACK_OPTIN == 'y' ? $(this).prop('checked',true) : $(this).prop('checked',false);
    }, 'json' );
  });
  $('#sendMeWm2').click( function() { 
    var containerWm2 = $('#sendMeWm2_d');
    var detachWm2 = $('#sendMeWm2');
    var feedbackWm2 = $('<div id="feedback"><img src="../images/indicator.gif"></div>');
    $.ajax ({
    	'type': 'post',
    	'url': 'adminUpdateAjax.iphtml',
    	'data': { item: item, 
		wm_feedback_question: $('#wm_feedback_question').val(), 
		wm_feedback_answer: $('#wm_feedback_answer').val(), 
		wm_feedback_options: 1 },
    	'beforeSend': function() {
    	  detachWm2.detach();
    	  containerWm2.append( feedbackWm2 );
    	},
    	'success': function(data) {
    	  $('#wm_feedback_question').prop('value', data.WM_FEEDBACK_QUESTION);
    	  $('#wm_feedback_answer').prop('value', data.WM_FEEDBACK_ANSWER);
    	},
    	'complete': function(){
    	  feedbackWm2.remove();
    	  containerWm2.append( detachWm2 );
    	},
    	'dataType': 'json'
    })
  });
  $('#walmart_crm').click(function(){
    $.post('adminUpdateAjax.iphtml', { 
	item: item, 
	do_walmart_crm: 1, 
	walmart_crm: $("#walmart_crm:checked").val() }, function(response) {
      response.WALMART_CRM == 'y' ? $(this).prop('checked',true) : $(this).prop('checked',false);
    }, 'json' );
  });
  $('#sendMeWm3').click( function() { 
    var containerWm3 = $('#sendMeWm3_d');
    var detachWm3 = $('#sendMeWm3');
    var feedbackWm3 = $('<div id="feedback"><img src="../images/indicator.gif"></div>');
    $.ajax ({
    	'type': 'post',
    	'url': 'adminUpdateAjax.iphtml',
    	'data': { item: item, 
		crm_item: $('#crm_item').val(), 
		crm_checkbox_wording: $('#crm_checkbox_wording').val(), 
		crm_wording: $('#crm_wording').val(), 
		wm_crm_options: 1 },
    	'beforeSend': function() {
    	  detachWm3.detach();
    	  containerWm3.append( feedbackWm3 );
    	},
    	'success': function(data) {
    	  $('#crm_item').prop('value', data.CRM_ITEM);
    	  $('#crm_checkbox_wording').prop('value', data.CRM_CHECKBOX_WORDING);
    	  $('#crm_wording').prop('value', data.CRM_WORDING);
    	},
    	'complete': function(){
    	  feedbackWm3.remove();
    	  containerWm3.append( detachWm3 );
    	},
    	'dataType': 'json'
    })
  });
  $('#membercard_optional').click(function(){
    var container_s = $('#spinMe_r');
    var detachMe_s = $('#membercard_r');
    var feedback_s = $('<div id="feedback"><img src="../images/indicator.gif"></div>');
    $.ajax ({
          'type': 'post',
          'url': 'adminUpdateAjax.iphtml',
          'data': { item: item, do_membercard_optional: 1, membercard_optional: $('#membercard_optional:checked').val() },
          'beforeSend': function() {
            detachMe_s.detach();
            container_s.append( feedback_s );
          },
          'success': function(data) {
            if ( data.MEMBERCARD_OPTIONAL == 'y' ) {
              $('#membercard_optional').prop('checked', true);
            } else if ( data.MEMBERCARD_OPTIONAL == 'n' || data.MEMBERCARD_OPTIONAL == '' ) {
              $('#membercard_optional').prop('checked', false);
            }
          },
          'complete': function(){
            feedback_s.remove();
            container_s.append( detachMe_s );
          },
          'dataType': 'json'
    })
  });
  /* 
  * Costco
  * startoff init the checkbox
  */
  $(function(){
    if ( costco_chk == 'y' ) {
      $('#costco').prop('checked', true);
      $('#costco-detail').show();
    } else {
      $('#costco').prop('checked', false);
      $('#costco-detail').hide();
    }
    $('#costco').click( function() {
      if ( $("#walmartToggle:checked").val() == 'y' ) {
        alert('Please uncheck Wal-Mart before proceeding');
        return false;
      }
      if ( $("#costco:checked").val() == 'y' ) {
        var activateCC = confirm('You are activating Costco - Proceed?');
        if ( !activateCC ) {
          return false;
        }
      } else {
        var deactivateCC = confirm('You are de-activating Costco - Proceed?');
        if ( !deactivateCC ) {
          return false;
        }
      }
      $('#costco-detail').toggle('slow');
      var container1 = $('#spinMe1');
      var detachMe1 = $('#detacheMe1');
      var feedback1 = $('<div id="feedback"><img src="../images/indicator.gif"></div>');
      //console.log('feedback1 = '+$('#feedback1'));
      $.ajax ({
            'type': 'post',
            'url': 'adminUpdateAjax.iphtml',
            'data': { item: item, updateCostco: 1, costco: $('#costco:checked').val() },
            'beforeSend': function() {
              detachMe1.detach();
              container1.append( feedback1 );
            },
            'success': function(data) {
              if ( data.COSTCO == 'y' ) {
	        $('#costco').prop('checked', true);
              } else if ( data.COSTCO == 'n' || data.COSTCO == '' ) {
	        $('#costco').prop('checked', false);
	      }
            },
            'complete': function(){
              feedback1.remove();
              container1.append( detachMe1 );
            },
            'dataType': 'json'
      })
    });
    $('#sendMeC').click( function() {
      var container2 = $('#client_name_d');
      var detachMe2 = $('#submitD');
      var feedback2 = $('<div id="feedback"><img src="../images/indicator.gif"></div>');
      //console.log('feedback1 = '+$('#feedback1'));
      $.ajax ({
            'type': 'post',
            'url': 'adminUpdateAjax.iphtml',
            'data': { item: item, 
		  updateCostco2: 1, 
		  header_text: $('#header_text').val(), 
		  footer_text: $('#footer_text').val(), 
                  costco_optin: $('#costco_optin:checked').val(),
		  capturetable: $('#capturetable').val(),
		  client_name: $('#client_name').val() ,
		  client_prod:  $('#client_prod').val()
	    },
            'beforeSend': function() {
              detachMe2.detach();
              container2.append( feedback2 );
            },
            'success': function(data) {
	      $('#header_text').html(data.COSTCO_NAME);
	      $('#bg_color').html(data.BACKGROUND_COLOR);
	      $('#footer_text').html(data.FOOTER_TEXT);
	      $('#client_name').html(data.CLIENT_NAME);
	      $('#client_prod').html(data.CLIENT_PROD);
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
  access control
  */
  $("#viral_control").click(function(){
    if ( $("#viral_control:checked").val() == 'y' ) {
      var activateVC = confirm('You are activating Access control - Proceed?');
      if ( !activateVC ) { 
        return false;
      }
    } else {
      var deactivateVC = confirm('You are de-activating Access control - Proceed?');
      if ( !deactivateVC ) {
        return false;
      }
    }
    var containerVc = $('#spinVc');
    var detachMeVc = $('#detacheVc');
    var feedbackVc = $('<div id="feedback"><img src="../images/indicator.gif"></div>');
    $.ajax ({
          'type': 'post',
          'url': 'adminUpdateAjax.iphtml',
          'data': { item: item, do_viral_control: 1, viral_control: $("#viral_control:checked").val() },
          'beforeSend': function() {
            detachMeVc.detach();
            containerVc.append( feedbackVc );
          },
          'success': function(data) {
             data.VIRAL_CONTROL == 'y' ? $(this).prop('checked',true) : $(this).prop('checked',false);
          },
          'complete': function(){
            feedbackVc.remove();
            containerVc.append( detachMeVc );
          },
          'dataType': 'json'
    })
    $('#vc_options').toggle('slow');
  });
  $('#vc_advanced_options_fold').on('click', function (){
    // the order in setting and removing the class is to keep the dotted border for the open state active when opening/closing
    if( $('#vc_advanced_options').is(':hidden')){
      $('#vc_show_advanced_label').hide();
      $('#vc_hide_advanced_label').show();
      $('#vc_advanced_options_fold').addClass('fold_open');
      $('#vc_advanced_options').slideToggle( 500 );
    } else {
      $('#vc_advanced_options').slideToggle( 500, function(){
        $('#vc_show_advanced_label').show();
        $('#vc_hide_advanced_label').hide();
        $('#vc_advanced_options_fold').removeClass('fold_open');
      });
    }
  });
  $("#vc-button").click(function(){
    var integerRegex = /^\d+$/;
    if ( $("#viral_control:checked").val() ) {
      /* 
      Make sure that an integer number has been entered for throttling
      */
      if( $('#vc_throttle').val() ){
        if( !integerRegex.test( $('#vc_throttle').val() )){
          $("#vc_throttle_e").html('<p>The throttle value appears to be invalid.  Please re-enter.</p>')
            .css({
            'font-size': '10px',
            'color': 'red'
            });
          return false;
        } else {
          $("#vc_throttle_e").html('');
        }
      }
      /*
      Make sure that an integer number has been entered for key life
      */
      if( $('#vc_keylife').val() ){
        if( !integerRegex.test( $('#vc_keylife').val() )){
          var vcFlag = 1;
          $("#vc_keylife_e").html('<p>The throttle value needs to be an integer.  Please re-enter.</p>')
            .css({
            'font-size': '10px',
            'color': 'red'
            });
        } else {
          $("#vc_keylife_e").html('');
        }
      }
    }
    /* 
    setup url check for Valid Referrer and Valid Sources
    */
    var vc_valid_refer = trimstring($('textarea#vc_referrer_urls').val());
    console.log("trimmed referrers string: *" + vc_valid_refer + "*");
    //var vc_valid_refer_t = vc_valid_refer.split(/\s+,\s+/);
    var vc_valid_refer_t = vc_valid_refer.split(/\s*,\s*/);
    var vrArray = [];
    if ( vc_valid_refer ) {
      $(vc_valid_refer_t).each(function() {
        if ( !urlRegex.test(this) ) {
          vrArray.push(this);
        }
      });
      var vrErrors = vrArray.join( ', ' );
      if ( vrArray.join( ', ' ) ) {
        $('#vc_referrer_urls_e').html('<strong>'+vrErrors+'</strong>'+' is/are not proper Valid Referrer URL(s) - hint:dont forget the http://')
          .css({
          'font-size': '10px',
          'color': 'red'
          });
      } else {
        $("#vc_referrer_urls_e").html('');
        // Replace the text with a cleaned join of the array
        vc_valid_refer = vc_valid_refer_t.join(",\n");
        console.log("processed referrers string: *" + vc_valid_refer + "*");
        $('textarea#vc_referrer_urls').val( vc_valid_refer );
      }
    }
    /*
    Valid Sources
    */
    /*var vc_valid_sources = $('textarea#vc_valid_sources').val();
    var vc_valid_sources_t = vc_valid_sources.split( /\s{0,1},\s{0,1}/ );
    var vsArray = [];
    if ( vc_valid_sources ) {
      $(vc_valid_sources_t).each(function() {
        if ( !urlRegex.test(this) ) {
          vsArray.push(this);
        }
      });
      var vsErrors = vsArray.join( ', ' );
      if ( vsErrors ) {
        $('#vc_valid_sources_e').html('<strong>'+vsErrors+'</strong>'+' is/are not proper Valid Source URL(s) - hint:dont forget the http://')
          .css({
          'font-size': '10px',
          'color': 'red'
          });
      } else {
        $('#vc_valid_sources_e').html(''); 
      }
    }*/
    /*
    Make sure that an option for redirecting has been selected
    */
    if( !$("input[name='vc_redirect']:checked").val() ){
      var vc_check_redirectFlag = 1;
      $('#vc_check_redirect').html('Please select a redirect option for viral control...')
        .css({
        'font-size': '12px',
        'color': 'red'
        });
    } else {
      $('#vc_check_redirect').html('');
    }
    if ( $('#vc_redirect_url:checked').val() == 'url' ){
      if ( !urlRegex.test($('#vc_redirect_url_text').val()) ) {
        var vcuFlag = 1;
        $("#vc_redirect_url_e").html('Please enter a proper redirect URL - hint:dont forget the http://')
          .css({
          'font-size': '10px',
          'color': 'red'
          });
      } else {
        $("#vc_redirect_url_e").html('');
      }
    } else {
      $('#vc_redirect_url_text').prop('value','');
      $("#vc_redirect_url_e").html('');
    }
    /*if ( vcFlag || vrErrors || vsErrors || vcuFlag || vc_check_redirectFlag ) { return false; }*/
    if ( vcFlag || vrErrors || vcuFlag || vc_check_redirectFlag ) { return false; }
    /*
    update fields
    */
    var vcFormVals = $('#updateVC').serialize();
    vcFormVals += "&updateVC=1";
    var tab4_container = $('#updateVC');
    var tab4_detachMe = $('#vc-button-p');
    var tab4_feedback = $('<p id="feedback"><img src="../images/indicator.gif"></p>');
    $.ajax ({
          'type': 'post',
          'url': 'adminUpdateAjax.iphtml',
	  'data': vcFormVals,
  	  'beforeSend': function() {
	    tab4_detachMe.detach();
	    tab4_container.append( tab4_feedback );
  	  },
          'success': function(data) {
            data.VC_SECURE == 'y' ? $("#vc_secure").prop("checked",true) : $("#vc_secure").prop("checked",false);
            if (data.VC_THROTTLE) { $("#vc_throttle").attr("value",data.VC_THROTTLE); }
            if (data.VC_KEYLIFE) { $("#vc_keylife").attr("value",data.VC_KEYLIFE); }
            if (data.VC_REFERRER_URLS) { $("#vc_referrer_urls").attr("value",data.VC_REFERRER_URLS); }
            data.VC_REFERRER_REQ == 'y' ? $("#vc_referrer_req").prop("checked",true) : $("#vc_referrer_req").prop("checked",false);
            if (data.VC_REFERRER_BLACKLIST == 'y'){
              $("#vc_referrer_blacklist").prop("checked",true);
              $("#vc_referrers_label").addClass("highlight");
              $("#vc_whitelisted_referrers_label").hide();
              $("#vc_blacklisted_referrers_label").show();
            } else {
              $("#vc_referrer_blacklist").prop("checked",false);
              $("#vc_referrers_label").removeClass("highlight");
              $("#vc_whitelisted_referrers_label").show();
              $("#vc_blacklisted_referrers_label").hide();
            }
            data.VC_REFERRER_LOGGING == 'y' ? $("#vc_referrer_logging").prop("checked",true) : $("#vc_referrer_logging").prop("checked",false);
            //$("#vc_valid_sources").attr("value",data.VC_VALID_SOURCES);
            if ( urlRegex.test(data.VC_REDIRECT) ) {
              $("#vc_redirect_url").prop("checked",true);
              $("#vc_redirect_url_text").attr("value",data.VC_REDIRECT).attr("size",data.VC_REDIRECT.length+2);
            } else if ( data.VC_REDIRECT == 'referer' ) {
              $("#vc_redirect_referer").prop("checked",true);
            } else if ( data.VC_REDIRECT == 'unavailable' ) {
              $("#vc_redirect_unavailable").prop("checked",true);
            }
	  },
	  'complete': function(){
	    tab4_feedback.remove();
	    tab4_container.append( tab4_detachMe );
	  },
          'dataType': 'json'
    })
  });
  /*
  order counts tab
  */
  $('#order_button').click(function() {
    console.log('date1=', $('#date1').val());
    console.log('date2=', $('#date2').val());
    if ( $('#date1').val() && $('#date2').val() ) {
      $.ajax ({
          'type': 'post',
          'url': 'adminUpdateAjax.iphtml',
          'data': 
	  { 
		item: item, 
		getOrderCount: 1, 
		source: $('#source1').val(), 
		start: $('#date1').val(), 
		end: $('#date2').val() 
	  },
          'dataType': 'html'
      }).done( function ( data ) {
        $('#order_count_ph1').html(data);
      });
    }
  });

  $('.alert-decrement').click(function() {
    if ( $(this).prop('checked') ) {
      $('.alert-decrement-container').removeClass('disabled');
      $('.alert-decrement-by').prop('readonly',false);
    }
    else {
      $('.alert-decrement-container').addClass('disabled');
      $('.alert-decrement-by').prop('readonly',true);
    }
  });
});
function setAnimation(divID) {
  $('#'+divID+'').animate( { backgroundColor: 'rgb(255,255,153)' }, 'fast')
      .delay(500)
      .animate( { backgroundColor: 'white' }, 'slow');
}
function trimstring (str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
/* eof */
