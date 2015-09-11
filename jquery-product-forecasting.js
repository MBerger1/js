/* 
#
File:	jquery-product-forecasting.js
Auth:	MBerger
#
#
establish jQuery behavior 
*/
$(function() {
  $('#updateForecast').die().live('click', function() {
    loadTable(item,last_projection,last_date);
  });
  $('#updateDupes').click( function() {
    loadTable(item,last_projection,last_date,'DBA');
  });
}); 
function loadTable(var1,var2,var3,var4) {
    /*
    var $tbl = $('<table>')
	.attr('id','inventory')
	.attr('border','0')
	.attr('cellspacing', '5')
	.attr('cellpadding','2')
	.attr('class','border-detail');
    $tbl.append($('<tr valign="bottom">')
	.append($('<th align="left">').html('original<br />quantity'))
	.append($('<th align="left">').html('remaining<br />quantity'))
	.append($('<th align="left">').html('orders<br />placed'))
	.append($('<th align="left">').html('&nbsp;'))
    );
    */
    if ( var4 == 'DBA' ) {
      var vals = 'item='+var1+'&last_projection='+var2+'&last_date='+var3+'&type='+var4;
    } else {
      var vals = 'item='+var1+'&last_projection='+var2+'&last_date='+var3;
    }
    $.ajax ({
          'type': 'post',
          'url': 'updateSamplesAvailableTabs.iphtml',
	  'data': vals,
          'success': function(data) {
             $('#forecastContent').html(data);
	     setAnimation('forecastContent');
          },
          'complete': function(){
            $.ajax ({
          	'type': 'get',
          	'url': 'productInventoryUpdateJSON.iphtml',
	        'data': {item: var1},
          	'success': function(data) {
		  var remain_qty = Number(data.REMAIN_QTY) - Number(total_splitter_orders);
                  $("#info").html(data.INFO);
                  $("#orig_qty").replaceWith('<input class="textbox" type="text" name="orig_qty" id="orig_qty" value="'+data.ORIG_QTY+'" size="7" maxlength="10" />');
                  $("#remain_qty").html(remain_qty);
                  $("#final_size").html(data.FINAL_SIZE);
                  $("#program_size").html(data.PROGRAM_SIZE);
                  $("#update_remain_qty").prop('value', '1');
		  /*
		  var col1 = '<input class="textbox" type="text" name="orig_qty" id="orig_qty" value="'+data.ORIG_QTY+'" size="7" maxlength="10" />';
		  var col2 = Number(data.REMAIN_QTY) - Number(total_splitter_orders);
		  var col3 = Number(total_orders) + Number(total_splitter_orders);
		  if ( typeof splitter_note != 'undefined' ) {
		    var col4 = splitter_note;
		  } else {
		    var col4 = '&nbsp;';
		  }
		  $tbl.append($('<tr>')
		      .append($('<td align="left">').html(col1))
		      .append($('<td align="left">').html(col2))
		      .append($('<td align="left">').html(col3))
		      .append($('<td align="left">').html(col4))
		  );
		  var row3 = '<input class="textbox" type="text" name="final_size" id="final_size" size="10" maxlength="10" value="'+data.FINAL_SIZE+'">';
		  $tbl.append($('<tr valign="bottom">')
		      .append($('<td colspan="4" align="left">').html('final total program size&nbsp;'+row3))
		  );
	          $('table#inventory').replaceWith( $tbl );
		  */
	  	},
          	'dataType': 'json'
            })
	  },
          'dataType': 'html'
    })
}
function setAnimation(divID) {
  $('#'+divID+'').animate( { backgroundColor: 'rgb(255,255,153)' }, 'fast')
      .delay(500)
      .animate( { backgroundColor: 'white' }, 'slow');
}
