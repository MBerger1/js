/* 
*
* File:	jquery-product-qq-survey.js
* Auth:	MBerger
*
* surveys
*
* see http://www.appelsiini.net/projects/jeditable or
* http://code.google.com/p/jquery-in-place-editor/
*/
$(function() {
  $.ajaxSetup({ cache: false });
  $('#smAffinity').remove();
  $('#smQBF').remove();
  /*
  ...immediately select a just added tab
  */
  /* removed in 1.9
  var $tabs = $('#admintabs').tabs({
      add: function(event, ui) {
          $tabs.tabs('select', '#' + ui.panel.id);
      }
  });
  var $tabs = $('#admintabs').tabs();
  */
  /*
  * hide survey if inactive or responses table populated
  */
  if ( qq_status == 'inactive' || rowChk > 0 ) {
    $('#smQQ').hide();
  }
  $('#qq_status_active').click(function() {
    $.post('adminUpdateAjax.iphtml', {
	item: item,
	parm: 'status_qq',
	val: $('#qq_status_active:checked').val(),
	updateQQStatus: 1 }, function() { });
    $(this).prop('checked', true);
    $('#qq_active_p').addClass('highlight');
    $('#qq_inactive_p').removeClass('highlight');
    rowChk <= 0 ? $('#smQQ').show('slow') : $('#smQQ').hide();
    setAnimation('qq-sample-survey-status');
  });
  $('#qq_status_inactive').click(function() {
    $.post('adminUpdateAjax.iphtml', {
	item: item,
	parm: 'status_qq',
	val: $('#qq_status_inactive:checked').val(),
	updateQQStatus: 1 }, function() { });
    $(this).prop('checked', true);
    $('#qq_active_p').removeClass('highlight');
    $('#qq_inactive_p').addClass('highlight');
    setAnimation('qq-sample-survey-status');
    $('#smQQ').hide();
  });
  /*
  open survey report tab
  */
  /* removed in 1.9
  $('#openReportTabQQ').click(function () {
    $('#admintabs').tabs('add','getSurveyReport.iphtml?item='+item,'Survey Report',8)
  });
  $('#closeReportTabQQ').click(function () {
    var selected = $tabs.tabs('option', 'selected');
    $('#admintabs').tabs('remove',8);
  });
  */
  /*
  * attribute battery dialog box for CSM's
  */
  var $dialog = $('<div></div>').dialog({
                    autoOpen: false,
                    title: 'Admin Documentation',
                    width: 300,
                    position: ['center','middle'],
                  });
  /*
  * admin notes dialog box
  */
  $('#adminNotes').click( function() {
    $.get('adminNotes.html', function(response) {
      $dialog.html(response).dialog('open');
    });
  });
  var surveyArr = ['smQQ','smQuickQuestion','smQuickQuestion'];

  var qnum = (function () {
    var qnum = null;
    $.ajax ({
          'async': false,
          'global': false,
          'url': 'adminUpdateAjax.iphtml',
          'dataType': "json",
          'data': { item: item, type: 'smQuickQuestion', getQnum: 1 },
          'success': function (data) { qnum = data; }
    });
    return qnum;
  })();
  var qnumArr = [];
  for (var i=1; i <= qnum["QNUM"]; i++) {
    qnumArr.push(i);
  }
  //$("*", document.body).each(function () {
    //var parentTag = $(this).parent().get(0).tagName;
    //$(this).prepend(document.createTextNode(parentTag + " > "));
  //});
  /*
  * Loop thru questions and display appropriate behaviors
  */
  $(qnumArr).each(function(a,i) {
    /*
    * set inline question editing up via editable plug in
    */
    setEditableQnum(i);
    /*
    * set attribute battery column behavior
    */
    setAttributeCol(item,i);
    /*
    * function to set show/hide behaviors for answer attributes
    */
    setAttributes(item,i,'smQuickQuestion');

    $('#surveyContainer').on('mouseover mouseout', '#q_'+i, function(event) {
      if (event.type == 'mouseover') {
        $(this).addClass('surveybg');
      } else {
        $(this).removeClass('surveybg','slow');
      }
    });
    /*
    * requirements radio - unique to QQ
    */
    setRequirement(item,i);
    /*
    * set style
    */
    setStyle(item,i);
    /*
    * rotation, piping, hides, skips and min/max answers
    */
    setAttributesBehavior(item,i,'smQuickQuestion');
    /*
    * add answer button behaviors
    */
    setAnswerButtons(item,i);
    /*
    * delete question
    */
    //$('#delete-question-q'+i).click( function() {
    $('#q'+i).on('click', '#delete-question-q'+i, function() {
      var dwarn = confirm('Delete Question '+i+'?');
      if ( dwarn ) {
	$.ajax ({
	  'type': 'post',
	  'url': 'adminUpdateAjax.iphtml',
	  'data': { item: item, type: 'smQuickQuestion', question_num: i, remQ: 1 },
	  'dataType': 'html'
	}).done( function ( data ) {
          $('#surveyContainer').html(data);
          var qnum = (function () {
            var qnum = null;
            $.ajax ({
		'async': false,
		'global': false,
		'url': 'adminUpdateAjax.iphtml',
		'dataType': "json",
		'data': { item: item, type: 'smQuickQuestion', getQnum: 1 },
		'success': function (data) { qnum = data; }
            });
            return qnum;
          })();
          for (var inc=1; inc <= qnum.QNUM; inc++) {
	    setStyle(item,inc);
	    setAnswerButtons(item,inc);
            setEditableQnum(inc);
            setAttributeCol(item,inc);
            setAttributes(item,inc,'smQuickQuestion');
	    reloadDeleteQuestion(item,inc);
	    reloadCopyQuestion(item,inc);
	    $('#q'+inc).on('mouseover mouseout', '#q_'+inc, function(event) {
              if (event.type == 'mouseover') {
                $(this).addClass('surveybg');
              } else {
                $(this).removeClass('surveybg','slow');
              }
            });
          }
          setAnimation('surveyContainer');
        });
      }
    });
    /*
    * copy question
    */
    $('#q'+i).on('click', '#copy-question-q'+i, function() {
      var cwarn = confirm('Copy Question '+i+'?');
      if ( cwarn ) {
        $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: 'smQuickQuestion', 
		question_num: i, 
		copyQ: 1 }, function(response) {
          $('#surveyContainer').html(response);
          var qnum = (function () {
            var qnum = null;
            $.ajax ({
		'async': false,
		'global': false,
		'url': 'adminUpdateAjax.iphtml',
		'dataType': "json",
		'data': { item: item, type: 'smQuickQuestion', getQnum: 1 },
		'success': function (data) { qnum = data; }
            });
            return qnum;
          })();
          for (var inc=1; inc <= qnum.QNUM; inc++) {
	    setStyle(item,inc);
	    setAnswerButtons(item,inc);
            setEditableQnum(inc);
            setAttributeCol(item,inc);
            setAttributes(item,inc,'smQuickQuestion');
	    reloadDeleteQuestion(item,inc);
	    reloadCopyQuestion(item,inc);
	    $('#q'+inc).on('mouseover mouseout', '#q_'+inc, function(event) {
              if (event.type == 'mouseover') {
                $(this).addClass('surveybg');
              } else {
                $(this).removeClass('surveybg','slow');
              }
            });
          }
        setAnimation('surveyContainer'); 
        }, 'html');
      }
    });
  });
  /*
  Add new question to survey
  */
  $('#add-question-smQuickQuestion').click( function() {
    //console.log('field val for new Q = '+$('#add_question').val());
    if ( $('#add_question').val() ) {
      var qnum = (function () {
        var qnum = null;
        $.ajax ({
              'async': false,
              'global': false,
              'url': 'adminUpdateAjax.iphtml',
              'dataType': "json",
              'data': { item: item, type: 'smQuickQuestion', getQnum: 1 },
              'success': function (data) { qnum = data; }
        });
        return qnum;
      })();
      var qnum$ = Number(qnum.QNUM);
      ++qnum$;
      //console.log('qnum inc = '+qnum$);
      $.ajax ({
        'type': 'post',
        'url': 'adminSurveysUpdate.iphtml',
        'data': { 
		item: item, 
		type: 'smQuickQuestion', 
		wording: $('#add_question').val(), 
		addQuestion: 1 },
	'dataType': 'html'
      }).done( function ( data ) {
        /*
        * add new Question to the dom
        */
        var newQ = $(data);
        newQ.appendTo($('#surveyContainer')).animate( { backgroundColor: 'rgb(255,255,153)' }, 'fast')
	.delay(500)
	.animate( { backgroundColor: 'white' }, 'slow');
        /*
        * set inline question editing up via editable plug in
        */
        setEditableQnum(qnum$);
        $('#add_question').val('');
        /* mouse over styling */
        $('#q'+qnum$).on('mouseover mouseout', '#q_'+qnum$, function(event) {
          if (event.type == 'mouseover') {
            $(this).addClass('surveybg');
          } else {
            $(this).removeClass('surveybg','slow');
          }
        });
        /*
        * requirements radio - unique to QQ
        */
        setRequirement(item,qnum$);
        /*
        * set style
        */
        setStyle(item,qnum$);
	/*
        * rotation, piping, hides, skips and min/max answers
	*/
	setAttributesBehavior(item,qnum$,'smQuickQuestion');
        /*
	* add answer button behaviors
        */
        setAnswerButtons(item,qnum$);
	/*
	* delete question
	*/
	//$('#delete-question-q'+qnum$).live('click', function(event) {
	$('#q'+qnum$).on('click', '#delete-question-q'+qnum$, function() {
          var dwarn = confirm('Delete Question '+qnum$+'?');
          if ( dwarn ) {
	    $.ajax ({
	      'type': 'post',
              'url': 'adminUpdateAjax.iphtml',
              'data': { item: item, type: 'smQuickQuestion', question_num: qnum$, remQ: 1 },
              'dataType': 'html'
	    }).done( function ( data ) {
	      $('#surveyContainer').html(data);
	      var qnum = (function () {
	        var qnum = null;
	        $.ajax ({
	          'async': false,
	          'global': false,
	          'url': 'adminUpdateAjax.iphtml',
	          'dataType': "json",
	          'data': { item: item, type: 'smQuickQuestion', getQnum: 1 },
	          'success': function (data) { qnum = data; }
	        });
	        return qnum;
	      })();
              for (var inc=1; inc <= qnum.QNUM; inc++) {
                setStyle(item,inc);
                setAnswerButtons(item,inc);
                setEditableQnum(inc);
                setAttributeCol(item,inc);
                setAttributes(item,inc,'smQuickQuestion');
                reloadDeleteQuestion(item,inc);
		reloadCopyQuestion(item,inc);
                $('#q'+inc).on('mouseover mouseout', '#q_'+inc, function(event) {
                  if (event.type == 'mouseover') {
                    $(this).addClass('surveybg');
                  } else {
                    $(this).removeClass('surveybg','slow');
                  }
                });
              }
              setAnimation('surveyContainer');
            });
          }
        });
	/*
	* copy question
	*/
        //$('#copy-question-q'+qnum$).live('click', function(event) {
        $('#q'+qnum$).on('click', '#copy-question-q'+qnum$, function() {
          var cwarn = confirm('Copy Question '+qnum$+'?');
          if ( cwarn ) {
            $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: 'smQuickQuestion', 
		question_num: qnum$, 
		copyQ: 1 }, function(response) {
              $('#surveyContainer').html(response);
              var qnum = (function () {
                var qnum = null;
                $.ajax ({
		  'async': false,
		  'global': false,
		  'url': 'adminUpdateAjax.iphtml',
		  'dataType': "json",
		  'data': { item: item, type: 'smQuickQuestion', getQnum: 1 },
		  'success': function (data) { qnum = data; }
                });
                return qnum;
              })();
              for (var inc=1; inc <= qnum.QNUM; inc++) {
                setStyle(item,inc);
                setAnswerButtons(item,inc);
                setEditableQnum(inc);
                setAttributeCol(item,inc);
                setAttributes(item,inc,'smQuickQuestion');
                reloadDeleteQuestion(item,inc);
		reloadCopyQuestion(item,inc);
                $('#q'+inc).on('mouseover mouseout', '#q_'+inc, function(event) {
                  if (event.type == 'mouseover') {
                    $(this).addClass('surveybg');
                  } else {
                    $(this).removeClass('surveybg','slow');
                  }
                });
              }
            setAnimation('surveyContainer'); 
            }, 'html');
          }
        });
      });
    }
  });
});
function setRequirement(item,qnum) {
  $('#surveyContainer').on('click', '#q-'+qnum+'-and', function () {
    $.post('adminUpdateAjax.iphtml', { 
	item: item, 
	type: 'smQuickQuestion', 
	question_num: qnum, 
	requirement: 'AND',
	updateQQReq: 1 
      }
    );
    $('#q\\.'+qnum+'\\.a-requirement').animate( { backgroundColor: 'rgb(255,255,153)' }, 'fast')
	.delay(500)
	.animate( { backgroundColor: 'rgb(255,174,185)' }, 'slow');
  });
  $('#surveyContainer').on('click', '#q-'+qnum+'-or', function () {
    $.post('adminUpdateAjax.iphtml', { 
	item: item, 
	type: 'smQuickQuestion', 
	question_num: qnum, 
	requirement: 'OR',
	updateQQReq: 1 
      }
    );
    $('#q\\.'+qnum+'\\.a-requirement').animate( { backgroundColor: 'rgb(255,255,153)' }, 'fast')
	.delay(500)
	.animate( { backgroundColor: 'rgb(255,174,185)' }, 'slow');
  });
}
function setStyle(item,qnum) {
  $('#q'+qnum).on('change', '#style-q'+qnum, function() {
    $.post('adminSurveysUpdate.iphtml', {
              item: item,
              type: 'smQuickQuestion',
              question_num: qnum,
              style: $('#style-q'+qnum+' option:selected').val(),
              updateStyle: 1 }, function(response) {
      $('#q'+qnum).html(response);
      /*
      * set inline question editing up via editable plug in
      */
      setEditableQnum(qnum);
      /*
      * set attribute battery column behavior
      */
      setAttributeCol(item,qnum);
      /*
      * function to set show/hide behaviors for answer attributes
      */
      setAttributes(item,qnum,'smQuickQuestion');
      /*
      * requirements radio - unique to QQ
      */
      setAnimation('q'+qnum);
    }, 'html' );
  });
}
function setAnswerButtons(item,qnum) {
  $('#q'+qnum).on('click', '#add-answer-q'+qnum, function() {
    var insertAddAns = $('<p id="add-answer-field-'+qnum+'"><input type="text" size="50" id="add_answer_'+qnum+'" name="add_answer_'+qnum+'" class="surveybg">'+
                         '<input type="button" name="ok" value="ok" id="add_answer_'+qnum+'_b">'+
                         '<input type="button" name="cancel" value="cancel" id="cancel_'+qnum+'"></p>');
    insertAddAns.prependTo($('ul#actions-q'+qnum)).css({ 'margin-left': '20px' });
    $(this).hide();
    //http://stackoverflow.com/questions/359887/determine-when-an-user-is-typing
    setTimeout(function() {
      insertAddAns.remove();
      $('#add-answer-q'+qnum).show();
    }, 30000);
    $('#cancel_'+qnum).click( function() {
      insertAddAns.remove();
      $('#add-answer-q'+qnum).show();
    });
    $('#add-answer-field-'+qnum).on('click', '#add_answer_'+qnum+'_b', function() {
      if ($('#add_answer_'+qnum).val().length > 0) {
        $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: 'smQuickQuestion', 
		question_num: qnum, 
		wording: $('#add_answer_'+qnum).val(), 
		addAns: 1 }, function(response) {
          $('#q'+qnum).html(response);
          /*
          * set inline question editing up via editable plug in
          */
          setEditableQnum(qnum);
          /*
          * set attribute battery column behavior
          */
          setAttributeCol(item,qnum);
          /*
          * function to set show/hide behaviors for answer attributes
          */
          setAttributes(item,qnum,'smQuickQuestion');
          setAnimation('q'+qnum);
        }, 'html');
      }
    });
  });
  /*
  * add attribute battery column
  */
  $('#q'+qnum).on('click', '#add-column-q'+qnum, function() {
    var insertAddCol = $('<p id="add-column-field-'+qnum+'"><input type="text" size="50" id="add_column_'+qnum+'" name="add_column_'+qnum+'" class="surveybg">'+
                         '<input type="button" name="ok" value="ok" id="add_column_'+qnum+'_b">'+
                         '<input type="button" name="cancel" value="cancel" id="cancel_col_'+qnum+'"></p>');
    insertAddCol.prependTo($('ul#actions-q'+qnum)).css({ 'margin-left': '20px' });
    $(this).hide();
    setTimeout(function() {
      insertAddCol.remove();
      $('#add-column-q'+qnum).show();
    }, 30000);
    $('#cancel_col_'+qnum).click( function() {
      insertAddCol.remove();
      $('#add-column-q'+qnum).show();
    });
    $('#add-column-field-'+qnum).on('click', '#add_column_'+qnum+'_b', function() {
      if ($('#add-column-q'+qnum).val().length > 0) {
        $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: 'smQuickQuestion', 
		question_num: qnum, 
		wording: $('#add_column_'+qnum).val(), addCol: 1 }, function(response) {
          $('#q'+qnum).html(response);
          /*
          * set inline question editing up via editable plug in
          */
          setEditableQnum(qnum);
          /*
          * set attribute battery column behavior
          */
          setAttributeCol(item,qnum);
          /*
          * function to set show/hide behaviors for answer attributes
          */
          setAttributes(item,qnum,'smQuickQuestion');
          setAnimation('q'+qnum);
        }, 'html');
      }
    });
  });
  /*
  * delete last answer ( non attribute battery )
  */
  $('#q'+qnum).on('click', '#delete-answer-q'+qnum, function() {
    var awarn = confirm('Delete last answer to question '+qnum+'?');
    if ( awarn ) {
      $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: 'smQuickQuestion', 
		question_num: qnum, 
		remAns: 1 }, function(response) {
        $('#li-ans-q'+qnum+'-a'+response.ANUM).remove();
      }, 'json');
    }
  });
  /* 
  * delete last attribute battery column
  */
  $('#q'+qnum).on('click', '#delete-column-q'+qnum, function() {
    var cwarn = confirm('Delete last column to question '+qnum+'?');
    if ( cwarn ) {
      $.post('adminSurveysUpdate.iphtml', { 
		item: item, 
		type: 'smQuickQuestion', 
		question_num: qnum, 
		remCol: 1 }, function(response) {
        $('#q'+qnum).html(response);
        /*
        * set inline question editing up via editable plug in
        */
        setEditableQnum(qnum);
        /*
        * set attribute battery column behavior
        */
        setAttributeCol(item,qnum);
        /*
        * function to set show/hide behaviors for answer attributes
        */
        setAttributes(item,qnum,'smQuickQuestion');
        setAnimation('q'+qnum);
      }, 'html');
    }
  });
  /*
  * delete last attribute battery row
  */
  $('#q'+qnum).on('click', '#delete-row-q'+qnum, function() {
    var rwarn = confirm('Delete last row to question '+qnum+'?');
    if ( rwarn ) {
      $.post('adminSurveysUpdate.iphtml', { 
		item: item, 
		type: 'smQuickQuestion', 
		question_num: qnum, 
		remRow: 1 }, function(response) {
        $('#q'+qnum).html(response);
        /*
        * set inline question editing up via editable plug in
        */
        setEditableQnum(qnum);
        /*
        * set attribute battery column behavior
        */
        setAttributeCol(item,qnum);
        /*
        * function to set show/hide behaviors for answer attributes
        */
        setAttributes(item,qnum,'smQuickQuestion');
        setAnimation('q'+qnum);
      }, 'html');
    }
  });
}
function reloadCopyQuestion(item,qnum) {
  $('#q'+qnum).on('click', '#copy-question-q'+qnum, function() {
    var cwarn = confirm('Copy Question '+qnum+'?');
    if ( cwarn ) {
      $.post('adminUpdateAjax.iphtml', { 
	item: item, 
	type: 'smQuickQuestion', 
	question_num: qnum, 
	copyQ: 1 }, function(response) {
        $('#surveyContainer').html(response);
        var qnum = (function () {
          var qnum = null;
          $.ajax ({
		'async': false,
		'global': false,
		'url': 'adminUpdateAjax.iphtml',
		'dataType': "json",
		'data': { item: item, type: 'smQuickQuestion', getQnum: 1 },
		'success': function (data) { qnum = data; }
          });
          return qnum;
        })();
        for (var inc=1; inc <= qnum.QNUM; inc++) {
	  setAnswerButtons(item,inc);
	  setStyle(item,inc);
	  setEditableQnum(inc);
	  setAttributeCol(item,inc);
	  setAttributes(item,inc,'smQuickQuestion');
	  reloadDeleteQuestion(item,inc);
	  reloadCopyQuestion(item,inc);
	  $('#q'+inc).on('mouseover mouseout', '#q_'+inc, function(event) {
	    if (event.type == 'mouseover') {
	      $(this).addClass('surveybg');
	    } else {
	      $(this).removeClass('surveybg','slow');
	    }
	  });
	}
      }, 'html');
      setAnimation('surveyContainer'); 
   }
  });
}
function reloadDeleteQuestion(item,qnum) {
    $('#q'+qnum).on('click', '#delete-question-q'+qnum, function() {
      var dwarn = confirm('Delete Question '+qnum+'?');
      if ( dwarn ) {
	$.ajax ({
	  'type': 'post',
	  'url': 'adminUpdateAjax.iphtml',
	  'data': { item: item, type: 'smQuickQuestion', question_num: qnum, remQ: 1 },
	  'dataType': 'html'
	}).done( function ( data ) {
          $('#surveyContainer').html(data);
          var qnum = (function () {
            var qnum = null;
            $.ajax ({
		'async': false,
		'global': false,
		'url': 'adminUpdateAjax.iphtml',
		'dataType': "json",
		'data': { item: item, type: 'smQuickQuestion', getQnum: 1 },
		'success': function (data) { qnum = data; }
            });
            return qnum;
          })();
          for (var inc=1; inc <= qnum.QNUM; inc++) {
	    setAnswerButtons(item,inc);
	    setStyle(item,inc);
            setEditableQnum(inc);
            setAttributeCol(item,inc);
            setAttributes(item,inc,'smQuickQuestion');
	    reloadDeleteQuestion(item,inc);
	    reloadCopyQuestion(item,inc);
	    $('#q'+inc).on('mouseover mouseout', '#q_'+inc, function(event) {
              if (event.type == 'mouseover') {
                $(this).addClass('surveybg');
              } else {
                $(this).removeClass('surveybg','slow');
              }
            });
          }
          setAnimation('surveyContainer');
        });
      }
    });
}
function setAnimation(divID) {
  $('#'+divID+'').animate( { backgroundColor: 'rgb(255,255,153)' }, 'fast')
      .delay(500)
      .animate( { backgroundColor: 'white' }, 'slow');
}
function setAttributeCol(item,qnum) {
  var style = (function () {
    var style = null;
    $.ajax ({
          'async': false,
          'global': false,
          'url': 'adminUpdateAjax.iphtml',
          'dataType': "json",
          'data': { item: item, type: 'smQuickQuestion', question_num: qnum, getStyle: 1 },
          'success': function (data) { style = data; }
    });
    return style;
  })();
  if ( style && (style.STYLE == 7 || style.STYLE == 8) ) {
    var columns = (function () {
      var columns = null;
      $.ajax ({
            'async'	: false,
            'global'	: false,
            'url'	: 'adminUpdateAjax.iphtml',
            'dataType'	: "json",
            'data'	: { item: item, type: 'smQuickQuestion', question_num: qnum, getCol: 1 },
            'success'	: function (data) { columns = data; }
      });
      return columns;
    })();
    var colStr = columns.COLUMNS;
    if ( colStr ) {
      var colArr = colStr.split('|');
      //console.log('colStr = '+typeof(colStr));
      for ( var colInc=1; colInc<=colArr.length; colInc++) {
        $('#q\\.'+qnum+'\\.c\\.'+colInc).editable("adminUpdateAjax.iphtml", {
		indicator       : "<img src='../images/indicator.gif'>",
		type            : 'textarea',
		rows            : 1,
		cols            : 15,
		submitdata      : { item: item, type: 'smQuickQuestion', question_num: qnum, colNum: colInc, updateCol: 1 },
		name            : 'wording',
		tooltip         : 'Click to edit...',
		submit          : 'save',
		cancel          : 'cancel',
		style           : 'font-size: 10px; display: inline'
        });
        $('#ul-ans-q'+qnum).on('mouseover mouseout', '#q\\.'+qnum+'\\.c\\.'+colInc, function(event) {
          if (event.type == 'mouseover') {
            $(this).addClass('surveybg');
          } else {
            $(this).removeClass('surveybg','slow');
          }
        });
      }
    }
  }
}
function setEditableQnum(qnum) {
  $('#q_'+qnum).editable("adminUpdateAjax.iphtml", {
	indicator       : "<img src='../images/indicator.gif'>",
	type            : 'textarea',
	rows            : 3,
	cols            : 50,
	submitdata      : { item: item, type: 'smQuickQuestion', updateQ: 1, question_num: qnum },
	name            : 'wording',
	tooltip         : 'Click to edit...',
	submit          : 'save',
	cancel          : 'cancel',
	style           : 'font-size: 10px; display: inline'
  });
}
function setMouseBehavior(qnum,anum,se,sa,sp,sak) {
  $('#ul-ans-q'+qnum).on('mouseover mouseout', '#li-ans-q'+qnum+'-a'+anum, function(event) {
    if (event.type == 'mouseover') {
      $('#q\\.'+qnum+'\\.a\\.'+anum+'-exclusve').show();
      $('#q\\.'+qnum+'\\.a\\.'+anum+'-anchor').show();
      $('#q\\.'+qnum+'\\.a\\.'+anum+'-pls_specify').show();
      $('#q\\.'+qnum+'\\.a\\.'+anum+'-answer_key').show();
    } else {
      if ( !se ) { $('#q\\.'+qnum+'\\.a\\.'+anum+'-exclusve').hide(); }
      if ( !sa) { $('#q\\.'+qnum+'\\.a\\.'+anum+'-anchor').hide(); }
      if ( !sp ) { $('#q\\.'+qnum+'\\.a\\.'+anum+'-pls_specify').hide(); }
      if ( !sak ) { $('#q\\.'+qnum+'\\.a\\.'+anum+'-answer_key').hide(); }
    }
    //console.log('se = '+se+' sa = '+sa+' sp = '+sp);
  });
}
function setAttributes(item,qnum,type) {
  $.post('adminUpdateAjax.iphtml', 
	{ 
	  item: item, 
	  type: 'smQuickQuestion', 
	  question_num: qnum, 
	  getAnsProp: 1 
	}, function(response) {

    //var anumArr = [];
    //for (var key in response)anumArr.push(key);

    $(response).each(function(b) {
      var j = b + 1;
      /*
      * inline ajax answer editing plug-in
      */
      $('#q\\.'+qnum+'\\.a\\.'+j).editable("adminUpdateAjax.iphtml", {
	  indicator       : "<img src='../images/indicator.gif'>",
	  type            : 'textarea',
	  rows            : 1,
	  cols            : 25,
	  submitdata      : { item: item, type: type, updateA: 1, question_num: qnum, answer_num: j },
	  name            : 'wording',
	  tooltip         : 'Click to edit...',
	  submit          : 'save',
	  cancel          : 'cancel',
	  style           : 'font-size: 10px; display: inline'
      });
      $('#ul-ans-q'+qnum).on('mouseover mouseout', '#q\\.'+qnum+'\\.a\\.'+j, function(event) {
        if (event.type == 'mouseover') {
          $(this).addClass('surveybg');
        } else {
          $(this).removeClass('surveybg','slow');
        }
      });
      /*
      * set variables from ajax response
      */
      var setExc = response[b][1];
      var setAnchor = response[b][2];
      var setPlsSpec = response[b][3];
      var setAnswerKey = response[b][4];
      /*
      * Set onload mouse behavior for answer attributes
      */
      setExc == 'y' ?
      $('#q\\.'+qnum+'\\.a\\.'+j+'-exclusve').show() :
      $('#q\\.'+qnum+'\\.a\\.'+j+'-exclusve').hide();
      setAnchor == 'y' ?
      $('#q\\.'+qnum+'\\.a\\.'+j+'-anchor').show() :
      $('#q\\.'+qnum+'\\.a\\.'+j+'-anchor').hide();
      setPlsSpec == 'y' ?
      $('#q\\.'+qnum+'\\.a\\.'+j+'-pls_specify').show() :
      $('#q\\.'+qnum+'\\.a\\.'+j+'-pls_specify').hide();
      setAnswerKey == 'y' ?
      $('#q\\.'+qnum+'\\.a\\.'+j+'-answer_key').show() :
      $('#q\\.'+qnum+'\\.a\\.'+j+'-answer_key').hide();
      setMouseBehavior(qnum,j,setExc,setAnchor,setPlsSpec,setAnswerKey);
      /*
      * set subsequent click behaviours
      */
      $('#li-ans-q'+qnum+'-a'+j).on('click', '#q-'+qnum+'-a-'+j+'-exc', function() {
        var excCheck = $('#q-'+qnum+'-a-'+j+'-exc:checked').val();
        var excVal;
        if ( excCheck ) { excVal = 'y'; }
        $.post('adminUpdateAjax.iphtml', 
        { item: item, type: type, question_num: qnum, answer_num: j, exclusve: excVal, updateExc: 1 }, function(response) {
          if ( response.EXCLUSVE == 'y' ) {
            $('#q-'+qnum+'-a-'+j+'-exc').prop('checked',true);
            $('#ul-ans-q'+qnum).on('mouseout', '#li-ans-q'+qnum+'-a'+j, function() {
              $('#q\\.'+qnum+'\\.a\\.'+j+'-exclusve').show();
            });
          } else {
            $('#q-'+qnum+'-a-'+j+'-exc').prop('checked',false);
            $('#ul-ans-q'+qnum).on('mouseout', '#li-ans-q'+qnum+'-a'+j, function() {
              $('#q\\.'+qnum+'\\.a\\.'+j+'-exclusve').hide();
            });
          }
          setMouseBehavior(qnum,j,response.EXCLUSVE,response.ANCHOR,response.PLS_SPECIFY,response.KEY);
        }, 'json');
      });
      $('#li-ans-q'+qnum+'-a'+j).on('click', '#q-'+qnum+'-a-'+j+'-anc', function() {
        var ancCheck = $('#q-'+qnum+'-a-'+j+'-anc:checked').val();
        var ancVal;
        if ( ancCheck ) { ancVal = 'y'; }
        $.post('adminUpdateAjax.iphtml', 
        { item: item, type: type, question_num: qnum, answer_num: j, anchor: ancVal, updateAnc: 1 }, function(response) {
          if ( response.ANCHOR == 'y' ) {
            $('#q-'+qnum+'-a-'+j+'-anc').prop('checked',true);
            $('#ul-ans-q'+qnum).on('mouseout', '#li-ans-q'+qnum+'-a'+j, function() {
              $('#q\\.'+qnum+'\\.a\\.'+j+'-anchor').show();
            });
          } else {
            $('#q-'+qnum+'-a-'+j+'-anc').prop('checked',false);
            $('#ul-ans-q'+qnum).on('mouseout', '#li-ans-q'+qnum+'-a'+j, function() {
              $('#q\\.'+qnum+'\\.a\\.'+j+'-anchor').hide();
            });
          }
          setMouseBehavior(qnum,j,response.EXCLUSVE,response.ANCHOR,response.PLS_SPECIFY,response.KEY);
        }, 'json');
      });
      $('#li-ans-q'+qnum+'-a'+j).on('click', '#q-'+qnum+'-a-'+j+'-pls', function() {
        var plsCheck = $('#q-'+qnum+'-a-'+j+'-pls:checked').val();
        var plsVal;
        if ( plsCheck ) { plsVal = 'y'; }
        $.post('adminUpdateAjax.iphtml', 
        { item: item, type: type, question_num: qnum, answer_num: j, pls_specify: plsVal, updatePls: 1 }, function(response) {
          if ( response.PLS_SPECIFY == 'y' ) {
            $('#q-'+qnum+'-a-'+j+'-pls').prop('checked',true);
            $('#ul-ans-q'+qnum).on('mouseout', '#li-ans-q'+qnum+'-a'+j, function() {
              $('#q\\.'+qnum+'\\.a\\.'+j+'-pls_specify').show();
            });
          } else {
            $('#q-'+qnum+'-a-'+j+'-pls').prop('checked',false);
            $('#ul-ans-q'+qnum).on('mouseout', '#li-ans-q'+qnum+'-a'+j, function() {
              $('#q\\.'+qnum+'\\.a\\.'+j+'-pls_specify').hide();
            });
          }
          setMouseBehavior(qnum,j,response.EXCLUSVE,response.ANCHOR,response.PLS_SPECIFY,response.KEY);
        }, 'json');
      });
      $('#li-ans-q'+qnum+'-a'+j).on('click', '#q-'+qnum+'-a-'+j+'-anskey', function() {
        var akChk = $('#q-'+qnum+'-a-'+j+'-anskey:checked').val();
        var akVal;
        if ( akChk ) { akVal = 'y'; }
        $.post('adminUpdateAjax.iphtml',
        { item: item, type: type, question_num: qnum, answer_num: j, ansKey: akVal, updateAnsKey: 1 }, function(response) {
          if ( response.KEY == 'y' ) {
            $('#q-'+qnum+'-a-'+j+'-anskey').prop('checked',true);
            $('#ul-ans-q'+qnum).on('mouseout', '#li-ans-q'+qnum+'-a'+j, function() {
              $('#q\\.'+qnum+'\\.a\\.'+j+'-answer_key').show();
            });
          } else {
            $('#q-'+qnum+'-a-'+j+'-anskey').prop('checked',false);
            $('#ul-ans-q'+qnum).on('mouseout', '#li-ans-q'+qnum+'-a'+j, function() {
              $('#q\\.'+qnum+'\\.a\\.'+j+'-answer_key').hide();
            });
          }
          setMouseBehavior(qnum,j,response.EXCLUSVE,response.ANCHOR,response.PLS_SPECIFY,response.KEY);
        }, 'json');
      });
    });
  }, 'json' );
}
function setAttributesBehavior(item,i,surveyType) {
    /*
    * BEGIN Attribute Assignment Section
    */
    $('#surveyContainer').on('click', '#ru-input-q'+i, function() {
      $.post('surveyToggleAttribute.iphtml', { 
		item: item, 
		type: surveyType, 
		question_num: i, 
		att: 'rotation' }
      );
      var anum = (function () {
        var numAns = null;
        $.ajax ({
              'async': false,
              'global': false,
              'url': 'adminUpdateAjax.iphtml',
              'dataType': 'json',
              'data': { item: item, type: surveyType, question_num: i, getAnum : 1 },
              'success': function (data) { numAns = data; }
        });
        return numAns;
      })();
      //console.log('numAns = '+(anum.ANUM));
      if ( $(this).is(':checked') ) {
        for ( var ans=1; ans<=anum.ANUM; ans++) {
          var anchorBox = $('#q\\.'+i+'\\.a\\.'+ans+'-anchor').length;
          //console.log('anchorBox = '+anchorBox);
          if ( anchorBox <= 0 ) {
            var addAnchor = $('<span id="q.'+i+'.a.'+ans+'-anchor" class="attribute" style="display: none">'+
                              '<input type="checkbox" name="anchor" id="q-'+i+'-a-'+ans+'-anc" value="q.'+i+'.a.'+ans+'">anchor</span>');
            addAnchor.insertBefore($('#q\\.'+i+'\\.a\\.'+ans+'-pls_specify'));
          }
        }
        $('#ru-q'+i).prop('checked',true);
        $('#ru-q'+i).addClass('selected');
      } else {
        for ( var ans=1; ans<=anum.ANUM; ans++) {
          var ancCheck = $('#q-'+i+'-a-'+ans+'-anc:checked').val();
          if ( ancCheck ) { 
            $.post('adminUpdateAjax.iphtml', { item: item, type: surveyType, question_num: i, answer_num: ans, updateAnc: 1 });
          }
          var anchorBox = $('#q\\.'+i+'\\.a\\.'+ans+'-anchor').length;
          //console.log('anchorBox = '+anchorBox);
          if ( anchorBox >= 0 ) {
            $('#q\\.'+i+'\\.a\\.'+ans+'-anchor').remove();
          }
        }
        $('#ru-q'+i).prop('checked',false);
        $('#ru-q'+i).removeClass('selected');
      }
      setAttributes(item,i,surveyType);
      setAnimation('q\\.'+i+'-rotation');
    });
    /*
    * piping
    */
    $('#surveyContainer').on('click', '#piped_from_q'+i, function() {
      $.post('surveyToggleAttribute.iphtml', 
        { item: item, type: surveyType, question_num: i, att: 'piping' }, function(response) {
        $('#q'+i).html(response);
        /*
        * set inline question editing up via editable plug in
        */
        setEditableQnum(i);
        /*
        * set attribute battery column behavior
        */
        setAttributeCol(item,i);
        /*
        * function to set show/hide behaviors for answer attributes
        */
        setAttributes(item,i,surveyType);
        /*if ( $('#q\\.'+i+'-piping').find('input[name="piped_from"]:checked').val() ) {
          $('#q\\.'+i+'-piping').find('input[name="piped_from"]').prop('checked',true);
          $('#pu-q'+i).addClass('selected');
        } else {
          $('#q\\.'+i+'-piping').find('input[name="piped_from"]').prop('checked',false);
          $('#pu-q'+i).removeClass('selected');
        }*/
        setAnimation('q\\.'+i+'-piping');
      }, 'html' );
    });
    $('#surveyContainer').on('change', '#reverse_pipe-q'+i, function() {
      $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: surveyType, 
		question_num: i, 
		reverse_pipe: $('#reverse_pipe-q'+i+' option:selected').val() }, function(response) { 
        setAnimation('q\\.'+i+'-piping');
      });
    });
    $('#surveyContainer').on('change', '#piped_from-q'+i, function() {
      $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: surveyType, 
		question_num: i, 
		piped_from: $('#piped_from-q'+i+' option:selected').val() }, function(response) { 
        setAnimation('q\\.'+i+'-piping');
      });
    });
    $('#surveyContainer').on('click', '#add-additional_answer-q'+i, function() {
      var additionalAddAns = $('<p class="attribute" id="add-additional-answer-field-'+i+'"><input type="text" size="50" id="add_additional_answer_'+i+'" name="add_answer_'+i+'" class="surveybg">'+
                         '<input type="button" name="save" value="save" id="add_additional_answer_'+i+'_b">'+
                         '<input type="button" name="cancel" value="cancel" id="cancel_additional_'+i+'"></p>');

      additionalAddAns.appendTo($('#q\\.'+i+'-piping'));
      $(this).hide();
      setTimeout(function() {
        additionalAddAns.remove();
        $('#add-additional_answer-q'+i).show();
      }, 30000);
      $('#cancel_additional_'+i).click( function() {
        additionalAddAns.remove();
        $('#add-additional_answer-q'+i).show();
      });
      $('#add-additional-answer-field-'+i).on('click', '#add_additional_answer_'+i+'_b', function() {
        if ($('#add_additional_answer_'+i).val().length > 0) {
          $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: surveyType, 
		question_num: i, 
		wording: $('#add_additional_answer_'+i).val(), 
		addAns: 1, 
		anum: '98' }, function(response) {
            $('#q'+i).html(response);
            /*
            * set inline question editing up via editable plug in
            */
            setEditableQnum(i);
            /*
            * set attribute battery column behavior
            */
            setAttributeCol(item,i);
            /*
            * function to set show/hide behaviors for answer attributes
            */
            setAttributes(item,i,surveyType);
            setAnimation('q\\.'+i+'-piping');
          }, 'html');
        }
      });
    });
    $('#surveyContainer').on('click', '#rem-additional_answer-q'+i, function() {
      $.post('adminUpdateAjax.iphtml', 
        { item: item, type: surveyType, question_num: i, remAns: 1, anum: '98' }, function(response) {
        $('#q'+i).html(response);
        /*
        * set inline question editing up via editable plug in
        */
        setEditableQnum(i);
        /*
        * set attribute battery column behavior
        */
        setAttributeCol(item,i);
        /*
        * function to set show/hide behaviors for answer attributes
        */
        setAttributes(item,i,surveyType);
	setAnimation('q\\.'+i+'-piping');
      }, 'html');
    });
    /*
    * hide from report
    */
    $('#surveyContainer').on('click', '#hide_from_report-q'+i, function() {
      $.post('surveyToggleAttribute.iphtml', 
        { 
	  item: item, type: surveyType, 
	  question_num: i, 
	  att: 'hide_from_report', 
	  hide_from_report: $('#hide_from_report-q'+i+':checked').val() 
	}, function() {
      });
      if ( $(this).is(':checked') ) {
        $('#hu-q'+i).addClass('selected');
      } else {
        $('#hu-q'+i).removeClass('selected');
      }
      setAnimation('q\\.'+i+'-hide_from_report');
    });
    /*
    * set skip pattern behavior
    */
    $('#surveyContainer').on('click', '#skip_q'+i, function() {
      $.post('surveyToggleAttribute.iphtml', 
        { item: item, type: surveyType, question_num: i, att: 'skip' }, function(response) {
        $('#q'+i).html(response);
        /*
        * set inline question editing up via editable plug in
        */
        setEditableQnum(i);
        /*
        * set attribute battery column behavior
        */
        setAttributeCol(item,i);
        /*
        * function to set show/hide behaviors for answer attributes
        */
        setAttributes(item,i,surveyType);
        if ( $('#q\\.'+i+'-skip').find('input[name="skip"]:checked').val() ) {
          //$('#q\\.'+i+'-skip').find('input[name="skip"]').prop('checked',true);
          $('#su-q'+i).addClass('selected');
        } else {
          //$('#q\\.'+i+'-skip').find('input[name="skip"]').prop('checked',false);
          $('#su-q'+i).removeClass('selected');
        }
        setAnimation('q\\.'+i+'-skip');
      }, 'html' );
    });
    $('#surveyContainer').on('click', '#update-skip-q'+i+'-b', function(event) {
      var anumStr = $('#update-skip-q'+i).find('input[type="checkbox"][name="anum"]:checked').serialize(); 
      anumStr = anumStr.replace(/&anum=/g, ',');
      anumStr = anumStr.replace(/anum=/, '');
      $.post('surveyToggleAttribute.iphtml', {
		item: item, 
		type: surveyType, 
		question_num: i, 
		anum: anumStr,
		updateSkipAns: 1 }, function(response) {
        $('#q'+i).html(response);
        /*
        * set inline question editing up via editable plug in
        */
        setEditableQnum(i);
        /*
        * set attribute battery column behavior
        */
        setAttributeCol(item,i);
        /*
        * function to set show/hide behaviors for answer attributes
        */
        setAttributes(item,i,surveyType);
        setAnimation('q\\.'+i+'-skip');
      }, 'html' );
    });
    $('#surveyContainer').on('change', '#skip_if_qnum-q'+i, function() {
      $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: surveyType, 
		question_num: i, 
		skip_if_qnum: $('#skip_if_qnum-q'+i+' option:selected').val(),
		do_skip_if_qnum: 1 }, function(response) {
        $('#q'+i).html(response);
        /*
        * set inline question editing up via editable plug in
        */
        setEditableQnum(i);
        /*
        * set attribute battery column behavior
        */
        setAttributeCol(item,i);
        /*
        * function to set show/hide behaviors for answer attributes
        */
        setAttributes(item,i,surveyType);
        setAnimation('q\\.'+i+'-skip');
      }, 'html' );
    });
    $('#surveyContainer').on('change', '#skip_not-q'+i, function() {
      $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: surveyType, 
		question_num: i, 
		skip_not: $('#skip_not-q'+i+' option:selected').val(),
		do_skip_not: 1 }, function(response) {
        $('#q'+i).html(response);
        /*
        * set inline question editing up via editable plug in
        */
        setEditableQnum(i);
        /*
        * set attribute battery column behavior
        */
        setAttributeCol(item,i);
        /*
        * function to set show/hide behaviors for answer attributes
        */
        setAttributes(item,i,surveyType);
        setAnimation('q\\.'+i+'-skip');
      }, 'html' );
    });
    /*
    * num responses
    */
    $('#surveyContainer').on('click', '#num_responses-q'+i, function() {
      $.post('surveyToggleAttribute.iphtml', { 
		item: item, 
		type: surveyType, 
		question_num: i, 
		att: 'num_responses' }, function(response) {
        $('#q'+i).html(response);
        /*
        * set inline question editing up via editable plug in
        */
        setEditableQnum(i);
        /*
        * set attribute battery column behavior
        */
        setAttributeCol(item,i);
        /*
        * function to set show/hide behaviors for answer attributes
        */
        setAttributes(item,i,surveyType);
	if ( $(this).is(':checked') ) {
          $('#nu-q'+i).addClass('selected');
        } else {
          $('#nu-q'+i).removeClass('selected');
        }
        setAnimation('q\\.'+i+'-num_responses');
      }, 'html' );
    });
    $('#surveyContainer').on('change', '#min_responses-q'+i, function() {
      $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: surveyType, 
		question_num: i, 
		min_responses: $('#min_responses-q'+i+' option:selected').val() }, function(response) { 
        $('#min_responses-q'+i).prop("checked", "true");
        setAnimation('q\\.'+i+'-num_responses');
      }, 'json' );
    });
    $('#surveyContainer').on('change', '#max_responses-q'+i, function() {
      $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: surveyType, 
		question_num: i, 
		max_responses: $('#max_responses-q'+i+' option:selected').val() }, function(response) { 
        $('#max_responses-q'+i).prop("checked", "true");
        setAnimation('q\\.'+i+'-num_responses');
      }, 'json' );
    });
    /*
    * END Attribute Assignment Section
    */
}
