/* 
*
* File:	jquery-product-surveys.js
* Auth:	MBerger
*
* surveys
*
* see http://www.appelsiini.net/projects/jeditable or
* http://code.google.com/p/jquery-in-place-editor/
*/
(function($) {
  $.fn.disableMe = function(disabled) {
    return this
      .attr('disabled',disabled)
      .css('opacity', disabled ? 0.75 : 1.0)
      .end();
  };
})(jQuery);
$(function() {
  $('#smQBF').remove();
  $('#smQQ').remove();
  /*
  ...immediately select a just added tab
  */
  var $tabs = $('#admintabs').tabs({
      add: function(event, ui) {
          $tabs.tabs('select', '#' + ui.panel.id);
      }
  });
  var $tabs = $('#admintabs').tabs();
  /*
  open survey report tab
  */
  $('#openReportTab').click(function () {
    $('#admintabs').tabs('add','getSurveyReport.iphtml?item='+item,'Survey Report',8)
  });
  $('#closeReportTab').click(function () {
    var selected = $tabs.tabs('option', 'selected');
    $('#admintabs').tabs('remove',8);
  });
  /*
  * hide survey if inactive or responses table populated
  */
  if ( affinity_status == 'inactive' || rowChk > 0 ) {
    /*
    *$('#smAffinity input').disableMe('true');
    *$('#smAffinity li').disableMe('true');
    */
    $('#smAffinity').hide();
  }
  $('#affinity_status_active').click(function() {
    $.post('adminUpdateAjax.iphtml', {
	item: item,
	affinity_status: $('#affinity_status_active:checked').val(),
	updateAffinityStatus: 1 }, function() { });
    $(this).attr('checked', true);
    $('#affinity_active_p').addClass('highlight');
    $('#affinity_inactive_p').removeClass('highlight');
    rowChk <= 0 ? $('#smAffinity').show('slow') : $('#smAffinity').hide();
    $('#status').addClass('surveybg').removeClass('surveybg',1000);
  });
  $('#affinity_status_inactive').click(function() {
    $.post('adminUpdateAjax.iphtml', {
	item: item,
	affinity_status: $('#affinity_status_inactive:checked').val(),
	updateAffinityStatus: 1 }, function() { });
    $(this).attr('checked', true);
    $('#affinity_active_p').removeClass('highlight');
    $('#affinity_inactive_p').addClass('highlight');
    $('#status').addClass('surveybg').removeClass('surveybg',1000);
    $('#smAffinity').hide();
  });
  /*
  * build responses table
  */
  $('#buildTablesmAffinity').click( function() {
    $.post('adminUpdateAjax.iphtml', {
	item: item,
	type: 'smAffinity',
	buildTable: 1 }, function(response) {
      $('#build_table_smAffinity').html(response); 
      $('#build_table_smAffinity').addClass('surveybg').removeClass('surveybg',1000);
    }, 'html' );
  });
  /*
  * attribute battery dialog box for CSM's
  */
  var $dialog = $('<div></div>').dialog({
                    autoOpen: false,
                    title: 'Admin Documentation',
                    width: 300,
                    position: ['center','middle'],
                  });

  var surveyArr = ['smQQ','smAffinity','smQBF'];

  var qnum = (function () {
    var qnum = null;
    $.ajax ({
          'async': false,
          'global': false,
          'url': 'adminUpdateAjax.iphtml',
          'dataType': "json",
          'data': { item: item, type: 'smAffinity', getQnum: 1 },
          'success': function (data) { qnum = data; }
    });
    return qnum;
  })();
  var qnumArr = [];
  for (var i=1; i <= qnum["QNUM"]; i++) {
    qnumArr.push(i);
  }
  /*
  * Loop thru questions and display appropriate behaviors
  */
  $(qnumArr).each(function(a,i) {
    /*
    * set inline question editing up via editable pug in
    */
    setEditableQnum(i);
    /*
    * set attribute battery column behavior
    */
    setAttributeCol(item,i);
    /*
    * function to set show/hide behaviors for answer attributes
    */
    setAttributes(item,i,'smAffinity');

    $('#q_'+i).die().live('mouseover mouseout', function(event) {
      if (event.type == 'mouseover') {
        $(this).addClass('surveybg');
      } else {
        $(this).removeClass('surveybg','slow');
      }
    });
    $('#add-answer-q'+i).find('input[name="add_answer"][value="add row"]').die().live('mouseover', function(){
      $.get('attribute-battery.html', function(response) {
        $dialog.html(response).dialog('open');
      });
    });
    $('#style-q'+i).die('change').live('change', function() {
      $.post('adminSurveysUpdate.iphtml', { 
		item: item, 
		type: 'smAffinity', 
		question_num: i, 
		style: $('#style-q'+i+' option:selected').val(), 
		updateStyle: 1 }, function(response) {
        $('#q'+i).html(response);
        /*
        * set inline question editing up via editable pug in
        */
        setEditableQnum(i);
        /*
        * set attribute battery column behavior
        */
        setAttributeCol(item,i);
        /*
        * function to set show/hide behaviors for answer attributes
        */
        setAttributes(item,i,'smAffinity');
        $('#q'+i).addClass('surveybg').removeClass('surveybg',1000);
      }, 'html' );
    });
    /*
    * rotation, piping, hides, skips and min/max answers
    */
    setAttributesBehavior(item,i,'smAffinity');
    $('#add-answer-q'+i).die().live('click', function() {
      var insertAddAns = $('<p id="add-answer-field-'+i+'"><input type="text" size="50" id="add_answer_'+i+'" name="add_answer_'+i+'" class="surveybg">'+
                           '<input type="button" name="ok" value="ok" id="add_answer_'+i+'_b">'+
                           '<input type="button" name="cancel" value="cancel" id="cancel_'+i+'"></p>');
      insertAddAns.prependTo($('ul#actions-q'+i)).css({ 'margin-left': '20px' });
      $(this).hide();
      //http://stackoverflow.com/questions/359887/determine-when-an-user-is-typing
      setTimeout(function() {
        insertAddAns.remove();
        $('#add-answer-q'+i).show();
      }, 10000);
      $('#cancel_'+i).click( function() {
        insertAddAns.remove();
        $('#add-answer-q'+i).show();
      });
      $('#add_answer_'+i+'_b').die().live('click', function() {
        if ($('#add_answer_'+i).val().length > 0) {
          $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: 'smAffinity', 
		question_num: i, 
		wording: $('#add_answer_'+i).val(), 
		addAns: 1 }, function(response) {
            $('#q'+i).html(response);
            /*
            * set inline question editing up via editable pug in
            */
            setEditableQnum(i);
            /*
            * set attribute battery column behavior
            */
            setAttributeCol(item,i);
            /*
            * function to set show/hide behaviors for answer attributes
            */
            setAttributes(item,i,'smAffinity');
            $('#q'+i).addClass('surveybg').removeClass('surveybg',1000);
          }, 'html');
        }
      });
    });
    $('#add-column-q'+i).die().live('click', function() {
      var insertAddCol = $('<p id="add-column-field-'+i+'"><input type="text" size="50" id="add_column_'+i+'" name="add_column_'+i+'" class="surveybg">'+
                           '<input type="button" name="ok" value="ok" id="add_column_'+i+'_b">'+
                           '<input type="button" name="cancel" value="cancel" id="cancel_col_'+i+'"></p>');
      insertAddCol.prependTo($('ul#actions-q'+i)).css({ 'margin-left': '20px' });
      $(this).hide();
      setTimeout(function() {
        insertAddCol.remove();
        $('#add-column-q'+i).show();
      }, 10000);
      $('#cancel_col_'+i).click( function() {
        insertAddCol.remove();
        $('#add-column-q'+i).show();
      });
      $('#add_column_'+i+'_b').die().live('click', function() {
        if ($('#add-column-q'+i).val().length > 0) {
          $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: 'smAffinity', 
		question_num: i, 
		wording: $('#add_column_'+i).val(), addCol: 1 }, function(response) {
            $('#q'+i).html(response);
            /*
            * set inline question editing up via editable pug in
            */
            setEditableQnum(i);
            /*
            * set attribute battery column behavior
            */
            setAttributeCol(item,i);
            /*
            * function to set show/hide behaviors for answer attributes
            */
            setAttributes(item,i,'smAffinity');
            $('#q'+i).addClass('surveybg').removeClass('surveybg',1000);
          }, 'html');
        }
      });
    });
    $('#delete-answer-q'+i).die().live('click', function() {
      var awarn = confirm('Delete last answer to question '+i+'?');
      if ( awarn ) {
        $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: 'smAffinity', 
		question_num: i, 
		remAns: 1 }, function(response) {
          $('#li-ans-q'+i+'-a'+response.ANUM).detach();
        }, 'json');
      }
    });
    $('#delete-column-q'+i).die().live('click', function() {
      var cwarn = confirm('Delete last column to question '+i+'?');
      if ( cwarn ) {
        $.post('adminSurveysUpdate.iphtml', { 
		item: item, 
		type: 'smAffinity', 
		question_num: i, 
		remCol: 1 }, function(response) {
          $('#q'+i).html(response);
          /*
          * set inline question editing up via editable pug in
          */
          setEditableQnum(i);
          /*
          * set attribute battery column behavior
          */
          setAttributeCol(item,i);
          /*
          * function to set show/hide behaviors for answer attributes
          */
          setAttributes(item,i,'smAffinity');
          $('#q'+i).addClass('surveybg').removeClass('surveybg',1000);
        }, 'html');
      }
    });
    $('#delete-row-q'+i).die().live('click', function() {
      var rwarn = confirm('Delete last row to question '+i+'?');
      if ( rwarn ) {
        $.post('adminSurveysUpdate.iphtml', { 
		item: item, 
		type: 'smAffinity', 
		question_num: i, 
		remRow: 1 }, function(response) {
          $('#q'+i).html(response);
          /*
          * set inline question editing up via editable pug in
          */
          setEditableQnum(i);
          /*
          * set attribute battery column behavior
          */
          setAttributeCol(item,i);
          /*
          * function to set show/hide behaviors for answer attributes
          */
          setAttributes(item,i,'smAffinity');
          $('#q'+i).addClass('surveybg').removeClass('surveybg',1000);
        }, 'html');
      }
    });
    $('#delete-question-q'+i).click( function() {
      var dwarn = confirm('Delete Question '+i+'?');
      if ( dwarn ) {
        $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: 'smAffinity', 
		question_num: i, 
		remQ: 1 }, function(response) {
          $('#surveyContainer').html(response);
          var qnum = (function () {
            var qnum = null;
            $.ajax ({
		'async': false,
		'global': false,
		'url': 'adminUpdateAjax.iphtml',
		'dataType': "json",
		'data': { item: item, type: 'smAffinity', getQnum: 1 },
		'success': function (data) { qnum = data; }
            });
            return qnum;
          })();
          setEditableQnum(inc);
          setAttributeCol(item,i);
          for (var inc=1; inc <= qnum["QNUM"]; inc++) {
            setAttributes(item,inc,'smAffinity');
          }
          $('#surveyContainer').addClass('surveybg').removeClass('surveybg',1000);
        }, 'html');
      }
    });
    $('#copy-question-q'+i).click( function() {
      var cwarn = confirm('Copy Question '+i+'?');
      if ( cwarn ) {
        $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: 'smAffinity', 
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
		'data': { item: item, type: 'smAffinity', getQnum: 1 },
		'success': function (data) { qnum = data; }
            });
            return qnum;
          })();
          setEditableQnum(i);
          setAttributeCol(item,i);
          for (var inc=1; inc <= qnum["QNUM"]; inc++) {
            setAttributes(item,inc,'smAffinity');
          }
        }, 'html');
      }
    });
  });
  /*
  Add new question to survey
  */
  $('#add-question-smAffinity').die().live('click', function(){
    if ( $('#add_question').val() ) {
      var qnum = (function () {
        var qnum = null;
        $.ajax ({
              'async': false,
              'global': false,
              'url': 'adminUpdateAjax.iphtml',
              'dataType': "json",
              'data': { item: item, type: 'smAffinity', getQnum: 1 },
              'success': function (data) { qnum = data; }
        });
        return qnum;
      })();
      var qnumArr = [];
      var qnum$ = ++qnum.QNUM;
      $.ajax ({
        'type': 'post',
        'url': 'adminSurveysUpdate.iphtml',
        'data': { item: item, type: 'smAffinity', wording: $('#add_question').val(), addQuestion: 1 },
        'success': function(data) {
          /*
          * add new Question to the dom
          */
          var newQ = $(data);
          newQ.appendTo($('#surveyContainer')).addClass('surveybg').removeClass('surveybg',1000);
          /*
          * set inline question editing up via editable pug in
          */
          setEditableQnum(qnum$);
          $('#add_question').attr('value', '');
          $('#q_'+qnum$).die().live('mouseover mouseout', function(event) {
            if (event.type == 'mouseover') {
              $(this).addClass('surveybg');
            } else {
              $(this).removeClass('surveybg','slow');
            }
          });
          $('#add-answer-q'+qnum$).find('input[name="add_answer"][value="add row"]').die().live('mouseover', function(){
            $.get('attribute-battery.html', function(response) {
              $dialog.html(response).dialog('open');
            });
          });
          $('#style-q'+qnum$).die().live('change', function() {
            $.post('adminSurveysUpdate.iphtml', 
              { item: item, type: 'smAffinity', question_num: qnum$, style: $('#style-q'+qnum$+' option:selected').val(), updateStyle: 1 }, function(response) {
              $('#q'+qnum$).html(response);
              /*
              * set inline question editing up via editable pug in
              */
              setEditableQnum(qnum$);
              /*
              * set attribute battery column behavior
              */
              setAttributeCol(item,qnum$);
              /*
              * function to set show/hide behaviors for answer attributes
              */
              setAttributes(item,qnum$,'smAffinity');
              $('#q'+qnum$).addClass('surveybg').removeClass('surveybg',1000);
            }, 'html' );
          });
          /*
          * rotation, piping, hides, skips and min/max answers
          */
          setAttributesBehavior(item,qnum$,'smAffinity');
          $('#add-answer-q'+qnum$).die().live('click', function() {
            var insertAddAns = $('<p id="add-answer-field-'+qnum$+'"><input type="text" size="50" id="add_answer_'+qnum$+'" name="add_answer_'+qnum$+'" class="surveybg">'+
                                 '<input type="button" name="ok" value="ok" id="add_answer_'+qnum$+'_b">'+
                                 '<input type="button" name="cancel" value="cancel" id="cancel_'+qnum$+'"></p>');
            insertAddAns.prependTo($('ul#actions-q'+qnum$)).css({ 'margin-left': '20px' });
            $(this).hide();
            //http://stackoverflow.com/questions/359887/determine-when-an-user-is-typing
            setTimeout(function() {
              insertAddAns.remove();
              $('#add-answer-q'+qnum$).show();
            }, 10000);
            $('#cancel_'+qnum$).live('click', function(event) {
              insertAddAns.remove();
              $('#add-answer-q'+qnum$).show();
            });
            $('#add_answer_'+qnum$+'_b').die().live('click', function() {
              if ($('#add_answer_'+qnum$).val().length > 0) {
                $.post('adminUpdateAjax.iphtml', { item: item, type: 'smAffinity', question_num: qnum$, wording: $('#add_answer_'+qnum$).val(), addAns: 1 }, function(response) {
                  $('#q'+qnum$).html(response);
                  /*
                  * set inline question editing up via editable pug in
                  */
                  setEditableQnum(qnum$);
                  /*
                  * set attribute battery column behavior
                  */
                  setAttributeCol(item,qnum$);
                  /*
                  * function to set show/hide behaviors for answer attributes
                  */
                  setAttributes(item,qnum$,'smAffinity');
                  $('#q'+qnum$).addClass('surveybg').removeClass('surveybg',1000);
                }, 'html');
              }
            });
          });
          $('#add-column-q'+qnum$).die().live('click', function() {
            var insertAddCol = $('<p id="add-column-field-'+qnum$+'"><input type="text" size="50" id="add_column_'+qnum$+'" name="add_column_'+qnum$+'" class="surveybg">'+
                                 '<input type="button" name="ok" value="ok" id="add_column_'+qnum$+'_b">'+
                                 '<input type="button" name="cancel" value="cancel" id="cancel_col_'+qnum$+'"></p>');
            insertAddCol.prependTo($('ul#actions-q'+qnum$)).css({ 'margin-left': '20px' });
            $(this).hide();
            setTimeout(function() {
              insertAddCol.remove();
              $('#add-column-q'+qnum$).show();
            }, 10000);
            $('#cancel_col_'+qnum$).click( function() {
              insertAddCol.remove();
              $('#add-column-q'+qnum$).show();
            });
            $('#add_column_'+qnum$+'_b').die().live('click', function() {
              if ($('#add-column-q'+qnum$).val().length > 0) {
                $.post('adminUpdateAjax.iphtml', { item: item, type: 'smAffinity', question_num: qnum$, wording: $('#add_column_'+qnum$).val(), addCol: 1 }, function(response) {
                  $('#q'+qnum$).html(response);
                  /*
                  * set inline question editing up via editable pug in
                  */
                  setEditableQnum(qnum$);
                  /*
                  * set attribute battery column behavior
                  */
                  setAttributeCol(item,qnum$);
                  /*
                  * function to set show/hide behaviors for answer attributes
                  */
                  setAttributes(item,qnum$,'smAffinity');
                  $('#q'+qnum$).addClass('surveybg').removeClass('surveybg',1000);
                }, 'html');
              }
            });
          });
          $('#delete-answer-q'+qnum$).die().live('click', function() {
            var awarn = confirm('Delete last answer to question '+qnum$+'?');
            if ( awarn ) {
              $.post('adminUpdateAjax.iphtml', { item: item, type: 'smAffinity', question_num: qnum$, remAns: 1 }, function(response) {
                $('#li-ans-q'+qnum$+'-a'+response.ANUM).detach();
              }, 'json');
            }
          });
          $('#add-column-q'+qnum$).die().live('click', function() {
            var insertAddCol = $('<p id="add-column-field-'+qnum$+'"><input type="text" size="50" id="add_column_'+qnum$+'" name="add_column_'+qnum$+'" class="surveybg">'+
                                 '<input type="button" name="ok" value="ok" id="add_column_'+qnum$+'_b">'+
                                 '<input type="button" name="cancel" value="cancel" id="cancel_col_'+qnum$+'"></p>');
            insertAddCol.prependTo($('ul#actions-q'+qnum$)).css({ 'margin-left': '20px' });
            $(this).hide();
            setTimeout(function() {
              insertAddCol.remove();
              $('#add-column-q'+qnum$).show();
            }, 10000);
            $('#cancel_col_'+qnum$).click( function() {
              insertAddCol.remove();
              $('#add-column-q'+qnum$).show();
            });
            $('#add_column_'+qnum$+'_b').die().live('click', function() {
              if ($('#add-column-q'+qnum$).val().length > 0) {
                $.post('adminUpdateAjax.iphtml', { item: item, type: 'smAffinity', question_num: qnum$, wording: $('#add_column_'+qnum$).val(), addCol: 1 }, function(response) {
                  $('#q'+qnum$).html(response);
                  /*
                  * set inline question editing up via editable pug in
                  */
                  setEditableQnum(qnum$);
                  /*
                  * set attribute battery column behavior
                  */
                  setAttributeCol(item,qnum$);
                  /*
                  * function to set show/hide behaviors for answer attributes
                  */
                  setAttributes(item,qnum$,'smAffinity');
                  $('#q'+qnum$).addClass('surveybg').removeClass('surveybg',1000);
                }, 'html');
              }
            });
          });
          $('#delete-column-q'+qnum$).die().live('click', function() {
            var cwarn = confirm('Delete last column to question '+qnum$+'?');
            if ( cwarn ) {
              $.post('adminSurveysUpdate.iphtml', { item: item, type: 'smAffinity', question_num: qnum$, remCol: 1 }, function(response) {
                $('#q'+qnum$).html(response);
                /*
                * set inline question editing up via editable pug in
                */
                setEditableQnum(qnum$);
                /*
                * set attribute battery column behavior
                */
                setAttributeCol(item,qnum$);
                /*
                * function to set show/hide behaviors for answer attributes
                */
                setAttributes(item,qnum$,'smAffinity');
                $('#q'+qnum$).addClass('surveybg').removeClass('surveybg',1000);
              }, 'html');
            }
          });
          $('#delete-row-q'+qnum$).die().live('click', function() {
            var rwarn = confirm('Delete last row to question '+qnum$+'?');
            if ( rwarn ) {
              $.post('adminSurveysUpdate.iphtml', { item: item, type: 'smAffinity', question_num: qnum$, remRow: 1 }, function(response) {
                $('#q'+qnum$).html(response);
                /*
                * set inline question editing up via editable pug in
                */
                setEditableQnum(qnum$);
                /*
                * set attribute battery column behavior
                */
                setAttributeCol(item,qnum$);
                /*
                * function to set show/hide behaviors for answer attributes
                */
                setAttributes(item,qnum$,'smAffinity');
                $('#q'+qnum$).addClass('surveybg').removeClass('surveybg',1000);
              }, 'html');
            }
          });
          $('#delete-question-q'+qnum$).live('click', function(event) {
            var dwarn = confirm('Delete Question '+qnum$+'?');
            if ( dwarn ) {
              $.post('adminUpdateAjax.iphtml', { item: item, type: 'smAffinity', question_num: qnum$, remQ: 1 }, function(response) {
                $('#surveyContainer').html(response);
                var qnum = (function () {
                  var qnum = null;
                  $.ajax ({
			  'async': false,
			  'global': false,
			  'url': 'adminUpdateAjax.iphtml',
			  'dataType': "json",
			  'data': { item: item, type: 'smAffinity', getQnum: 1 },
			  'success': function (data) { qnum = data; }
                  });
                  return qnum;
                })();
                setEditableQnum(qnum$);
                setAttributeCol(item,qnum$);
                for (var inc=1; inc <= qnum["QNUM"]; inc++) {
                  setAttributes(item,inc,'smAffinity');
                }
              $('#surveyContainer').addClass('surveybg').removeClass('surveybg',1000);
              }, 'html');
            }
          });
          $('#copy-question-q'+qnum$).live('click', function(event) {
            var cwarn = confirm('Copy Question '+qnum$+'?');
            if ( cwarn ) {
              $.post('adminUpdateAjax.iphtml', { item: item, type: 'smAffinity', question_num: qnum$, copyQ: 1 }, function(response) {
                $('#surveyContainer').html(response);
                var qnum = (function () {
                  var qnum = null;
                  $.ajax ({
			  'async': false,
			  'global': false,
			  'url': 'adminUpdateAjax.iphtml',
			  'dataType': "json",
			  'data': { item: item, type: 'smAffinity', getQnum: 1 },
			  'success': function (data) { qnum = data; }
                  });
                  return qnum;
                })();
                setEditableQnum(qnum$);
                setAttributeCol(item,qnum$);
                for (var inc=1; inc <= qnum["QNUM"]; inc++) {
                  setAttributes(item,inc,'smAffinity');
                }
              }, 'html');
            }
          });
        }
      })
    }
  });
});
function setAttributeCol(item,qnum) {
  var style = (function () {
    var style = null;
    $.ajax ({
          'async': false,
          'global': false,
          'url': 'adminUpdateAjax.iphtml',
          'dataType': "json",
          'data': { item: item, type: 'smAffinity', question_num: qnum, getStyle: 1 },
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
            'dataType': "json",
            'data'	: { item: item, type: 'smAffinity', question_num: qnum, getCol: 1 },
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
		submitdata      : { item: item, type: 'smAffinity', question_num: qnum, colNum: colInc, updateCol: 1 },
		name            : 'wording',
		tooltip         : 'Click to edit...',
		submit          : 'Go!',
		cancel          : 'cancel',
		style           : 'font-size: 10px; display: inline'
        });
        $('#q\\.'+qnum+'\\.c\\.'+colInc).die().live('mouseover mouseout', function(event) {
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
	submitdata      : { item: item, type: 'smAffinity', updateQ: 1, question_num: qnum },
	name            : 'wording',
	tooltip         : 'Click to edit...',
	submit          : 'Go!',
	cancel          : 'cancel',
	style           : 'font-size: 10px; display: inline'
  });
}
function setMouseBehavior(qnum,anum,se,sa,sp) {
  $('#li-ans-q'+qnum+'-a'+anum).die().live('mouseover mouseout', function(event) {
    if (event.type == 'mouseover') {
      $('#q\\.'+qnum+'\\.a\\.'+anum+'-exclusve').show();
      $('#q\\.'+qnum+'\\.a\\.'+anum+'-anchor').show();
      $('#q\\.'+qnum+'\\.a\\.'+anum+'-pls_specify').show();
    } else {
      if ( !se ) { $('#q\\.'+qnum+'\\.a\\.'+anum+'-exclusve').hide(); }
      if ( !sa) { $('#q\\.'+qnum+'\\.a\\.'+anum+'-anchor').hide(); }
      if ( !sp ) { $('#q\\.'+qnum+'\\.a\\.'+anum+'-pls_specify').hide(); }
    }
    //console.log('se = '+se+' sa = '+sa+' sp = '+sp);
  });
}
function setAttributes(item,qnum,type) {
  $.post('adminUpdateAjax.iphtml', { item: item, type: 'smAffinity', question_num: qnum, getAnum: 1 }, function(response) {

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
	  submit          : 'Go!',
	  cancel          : 'cancel',
	  style           : 'font-size: 10px; display: inline'
      });
      $('#q\\.'+qnum+'\\.a\\.'+j).die().live('mouseover mouseout', function(event) {
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
      setMouseBehavior(qnum,j,setExc,setAnchor,setPlsSpec);
      /*
      * set subsequent click behaviours
      */
      $('#q-'+qnum+'-a-'+j+'-exc').die().live('click', function(event) {
        var excCheck = $('#q-'+qnum+'-a-'+j+'-exc:checked').val();
        var excVal;
        if ( excCheck ) { excVal = 'y'; }
        $.post('adminUpdateAjax.iphtml', 
        { item: item, type: type, question_num: qnum, answer_num: j, exclusve: excVal, updateExc: 1 }, function(response) {
          if ( response.EXCLUSVE == 'y' ) {
            $('#q-'+qnum+'-a-'+j+'-exc').attr('checked',true);
          } else {
            $('#q-'+qnum+'-a-'+j+'-exc').attr('checked',false);
          }
          setMouseBehavior(qnum,j,response.EXCLUSVE,response.ANCHOR,response.PLS_SPECIFY);
        }, 'json');
      });
      $('#q-'+qnum+'-a-'+j+'-anc').die().live('click', function(event) {
        var ancCheck = $('#q-'+qnum+'-a-'+j+'-anc:checked').val();
        var ancVal;
        if ( ancCheck ) { ancVal = 'y'; }
        $.post('adminUpdateAjax.iphtml', 
        { item: item, type: type, question_num: qnum, answer_num: j, anchor: ancVal, updateAnc: 1 }, function(response) {
          if ( response.ANCHOR == 'y' ) {
            $('#q-'+qnum+'-a-'+j+'-anc').attr('checked',true);
            $('#li-ans-q'+qnum+'-a'+j).die().live('mouseout', function(event) {
              $('#q\\.'+qnum+'\\.a\\.'+j+'-anchor').show();
            });
          } else {
            $('#q-'+qnum+'-a-'+j+'-anc').attr('checked',false);
            $('#li-ans-q'+qnum+'-a'+j).die().live('mouseout', function(event) {
              $('#q\\.'+qnum+'\\.a\\.'+j+'-anchor').hide();
            });
          }
          setMouseBehavior(qnum,j,response.EXCLUSVE,response.ANCHOR,response.PLS_SPECIFY);
        }, 'json');
      });
      $('#q-'+qnum+'-a-'+j+'-pls').die().live('click', function(event) {
        var plsCheck = $('#q-'+qnum+'-a-'+j+'-pls:checked').val();
        var plsVal;
        if ( plsCheck ) { plsVal = 'y'; }
        $.post('adminUpdateAjax.iphtml', 
        { item: item, type: type, question_num: qnum, answer_num: j, pls_specify: plsVal, updatePls: 1 }, function(response) {
          if ( response.PLS_SPECIFY == 'y' ) {
            $('#q-'+qnum+'-a-'+j+'-pls').attr('checked',true);
            $('#li-ans-q'+qnum+'-a'+j).die().live('mouseout', function(event) {
              $('#q\\.'+qnum+'\\.a\\.'+j+'-pls_specify').show();
            });
          } else {
            $('#q-'+qnum+'-a-'+j+'-pls').attr('checked',false);
            $('#li-ans-q'+qnum+'-a'+j).die().live('mouseout', function(event) {
              $('#q\\.'+qnum+'\\.a\\.'+j+'-pls_specify').hide();
            });
          }
          setMouseBehavior(qnum,j,response.EXCLUSVE,response.ANCHOR,response.PLS_SPECIFY);
        }, 'json');
      });
    });
  }, 'json' );
}
function setAttributesBehavior(item,i,surveyType) {
    /*
    * BEGIN Attribute Assignment Section
    */
    $('#q\\.'+i+'-rotation').die().live('click', function() {
      $.post('surveyToggleAttribute.iphtml', 
        { item: item, type: surveyType, question_num: i, att: 'rotation' }, function() {
      });
      if ( $(this).find('input[name="rotation"]:checked').val() ) {
        $('#ru-q'+i).attr('checked',true);
        $('#ru-q'+i).addClass('selected');
      } else {
        $('#ru-q'+i).attr('checked',false);
        $('#ru-q'+i).removeClass('selected');
      }
    });
    $('#reverse_pipe-q'+i).die().live('change', function() {
      $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: surveyType, 
		question_num: i, 
		reverse_pipe: $('#reverse_pipe-q'+i+' option:selected').val() }, function(response) { 
        $('#q\\.'+i+'-piping').addClass('surveybg').removeClass('surveybg',1000);
      });
    });
    $('#piped_from-q'+i).die().live('change', function() {
      $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: surveyType, 
		question_num: i, 
		piped_from: $('#piped_from-q'+i+' option:selected').val() }, function(response) { 
        $('#q\\.'+i+'-piping').addClass('surveybg').removeClass('surveybg',1000);
      });
    });
    $('#add-additional_answer-q'+i).die().live('click', function() {
      var additionalAddAns = $('<p class="attribute" id="add-additional-answer-field-'+i+'"><input type="text" size="50" id="add_additional_answer_'+i+'" name="add_answer_'+i+'" class="surveybg">'+
                         '<input type="button" name="ok" value="ok" id="add_additional_answer_'+i+'_b">'+
                         '<input type="button" name="cancel" value="cancel" id="cancel_additional_'+i+'"></p>');

      additionalAddAns.appendTo($('#q\\.'+i+'-piping'));
      $(this).hide();
      setTimeout(function() {
        additionalAddAns.remove();
        $('#add-additional_answer-q'+i).show();
      }, 10000);
      $('#cancel_additional_'+i).click( function() {
        additionalAddAns.remove();
        $('#add-additional_answer-q'+i).show();
      });
      $('#add_additional_answer_'+i+'_b').die().live('click', function() {
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
            * set inline question editing up via editable pug in
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
            $('#q'+i).addClass('surveybg').removeClass('surveybg',1000);
          }, 'html');
        }
      });
    });
    $('#rem-additional_answer-q'+i).die().live('click', function() {
      $.post('adminUpdateAjax.iphtml', 
        { item: item, type: surveyType, question_num: i, remAns: 1, anum: '98' }, function(response) {
        $('#q'+i).html(response);
        /*
        * set inline question editing up via editable pug in
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
        $('#q'+i).addClass('surveybg').removeClass('surveybg',1000);
      }, 'html');
    });
    $('#q\\.'+i+'-piping').find('input[name="piped_from"]').die().live('click', function() {
      $.post('surveyToggleAttribute.iphtml', 
        { item: item, type: surveyType, question_num: i, att: 'piping' }, function(response) {
        $('#q'+i).html(response);
        /*
        * set inline question editing up via editable pug in
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
        if ( $('#q\\.'+i+'-piping').find('input[name="piped_from"]:checked').val() ) {
          $('#q\\.'+i+'-piping').find('input[name="piped_from"]').attr('checked',true);
          $('#pu-q'+i).addClass('selected');
        } else {
          $('#q\\.'+i+'-piping').find('input[name="piped_from"]').attr('checked',false);
          $('#pu-q'+i).removeClass('selected');
        }
        $('#q'+i).addClass('surveybg').removeClass('surveybg',1000);
      }, 'html' );
    });
    $('#q\\.'+i+'-hide_from_report').die().live('click', function() {
      $.post('surveyToggleAttribute.iphtml', 
        { 
	  item: item, type: surveyType, 
	  question_num: i, 
	  att: 'hide_from_report', 
	  hide_from_report: $(this).find('input[name="hide_from_report"]:checked').val() 
	}, function() {
      });
      if ( $(this).find('input[name="hide_from_report"]:checked').val() ) {
        $('#hu-q'+i).attr('checked',true);
        $('#hu-q'+i).addClass('selected');
      } else {
        $('#hu-q'+i).attr('checked',false);
        $('#hu-q'+i).removeClass('selected');
      }
    });
    /*
    * set skip pattern behavior
    */
    $('#update-skip-q'+i+'-b').die().live('click', function(event) {
      var anumStr = $('#update-skip-q'+i).find('input[type="checkbox"][name="anum"]:checked').serialize(); 
      anumStr = anumStr.replace(/&anum=/g, ',');
      anumStr = anumStr.replace(/anum=/, '');
      $.post('surveyToggleAttribute.iphtml', {
		item: item, 
		type: surveyType, 
		question_num: i, 
		anum: anumStr,
		updateSkipAns: 1 }, function(response) {
        //$('#update-skip-q'+i).serialize()+"&item="+item+"&type=smAffinity&question_num="+i+"&updateSkipAns=1",function(response) {
        $('#q'+i).html(response);
        /*
        * set inline question editing up via editable pug in
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
        $('#q'+i).addClass('surveybg').removeClass('surveybg',1000);
      }, 'html' );
    });
    $('#skip_if_qnum-q'+i).die().live('change', function() {
      $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: surveyType, 
		question_num: i, 
		skip_if_qnum: $('#skip_if_qnum-q'+i+' option:selected').val(),
		do_skip_if_qnum: 1 }, function(response) {
        $('#q'+i).html(response);
        /*
        * set inline question editing up via editable pug in
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
        $('#q'+i).addClass('surveybg').removeClass('surveybg',1000);
      }, 'html' );
    });
    $('#skip_not-q'+i).die().live('change', function() {
      $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: surveyType, 
		question_num: i, 
		skip_not: $('#skip_not-q'+i+' option:selected').val(),
		do_skip_not: 1 }, function(response) {
        $('#q'+i).html(response);
        /*
        * set inline question editing up via editable pug in
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
        $('#q'+i).addClass('surveybg').removeClass('surveybg',1000);
      }, 'html' );
    });
    $('#q\\.'+i+'-skip').find('input[name="skip"]').die().live('click', function() {
      $.post('surveyToggleAttribute.iphtml', 
        { item: item, type: surveyType, question_num: i, att: 'skip' }, function(response) {
        $('#q'+i).html(response);
        /*
        * set inline question editing up via editable pug in
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
          $('#q\\.'+i+'-skip').find('input[name="skip"]').attr('checked',true);
          $('#su-q'+i).addClass('selected');
        } else {
          $('#q\\.'+i+'-skip').find('input[name="skip"]').attr('checked',false);
          $('#su-q'+i).removeClass('selected');
        }
        $('#q'+i).addClass('surveybg').removeClass('surveybg',1000);
      }, 'html' );
    });
    $('#min_responses-q'+i).die().live('change', function() {
      $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: surveyType, 
		question_num: i, 
		min_responses: $('#min_responses-q'+i+' option:selected').val() }, function(response) { 
        $('#min_responses-q'+i).attr("checked", "true");
        $('#q\\.'+i+'-num_responses').addClass('surveybg').removeClass('surveybg',1000);
      }, 'json' );
    });
    $('#max_responses-q'+i).die().live('change', function() {
      $.post('adminUpdateAjax.iphtml', { 
		item: item, 
		type: surveyType, 
		question_num: i, 
		max_responses: $('#max_responses-q'+i+' option:selected').val() }, function(response) { 
        $('#max_responses-q'+i).attr("checked", "true");
        $('#q\\.'+i+'-num_responses').addClass('surveybg').removeClass('surveybg',1000);
      }, 'json' );
    });
    $('#q\\.'+i+'-num_responses').find('input[name="num_responses"]').die().live('click', function() {
      $.post('surveyToggleAttribute.iphtml', { 
		item: item, 
		type: surveyType, 
		question_num: i, 
		att: 'num_responses' }, function(response) {
        $('#q'+i).html(response);
        /*
        * set inline question editing up via editable pug in
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
        if ( $('#q\\.'+i+'-num_responses').find('input[name="num_responses"]:checked').val() ) {
          $('#q\\.'+i+'-num_responses').find('input[name="num_responses"]').attr('checked',true);
          $('#nu-q'+i).addClass('selected');
        } else {
          $('#q\\.'+i+'-num_responses').find('input[name="num_responses"]').attr('checked',false);
          $('#nu-q'+i).removeClass('selected');
        }
        $('#q'+i).addClass('surveybg').removeClass('surveybg',1000);
      }, 'html' );
    });
    /*
    * END Attribute Assignment Section
    */
}
