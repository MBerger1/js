// script for mgmt-entry.iphtml
// MBerger
// some of this logic was lifted from the Form Verification example on p.263 of 'Javascript, the Definitive Guide', 4th Ed.
function validate() {
  if(!document.getElementById || !document.createTextNode){return;}
  var msg;
  var empty_fields = "";
  var error = "";
  var eVar = "";
  // declare doc variables
  //var prod_name=document.getElementById('prod_name').value;
  //var qty=document.getElementById('qty').value;
  //var url=document.getElementById('url').value;
  //var fulfill=document.getElementById('fulfill').checked;
  var prod_name=$('prod_name').value;
  var qty=$('qty').value;
  var url=$('url').value;
  var fulfill=$('fulfill').checked;
  var f=document.forms[0];
  var selectBox=f.elements['client'];
  var client=selectBox.selectedIndex;

  if( prod_name == '' ) {
    empty_fields += "\n Product Name";
  }
  if( qty == '' ) {
    empty_fields += "\n Original Quantity";
  }
  if ( client == 0 ) {
    empty_fields += "\n Please select a customer";
  }
  if ( fulfill == '' ) {
    if( url == '' ) {
      empty_fields += "\n You need a product URL too..";
    }
  }
  if ( url ) {
    var reURL = /^(http:\/\/)(www)\.(.*)\.(com|net|gov|org)/gi;
    if( !reURL.test( url )) {
      error += " --  you need a valid URL in the 'Product URL field' ( ie; http://www.somewhere.com )";
      eVar = 1;
    }
  }
  // Now, if there were any errors, display the messages, and
  // return false to prevent the form from being submitted.
  // Otherwise, return true.
  if ( !empty_fields && !eVar ) return true;

  msg = "---------------------------------------------------------------------------------------\n\n";
  msg += "The following fields are required:\n\n";
  msg += "---------------------------------------------------------------------------------------\n\n";

  if ( empty_fields ) {
    msg += empty_fields + "\n";
  }
  if ( error ) {
    msg += error + "\n";
  }

  alert(msg);
  return false;
}
