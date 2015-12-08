$(document).ready(function() {
  //Mahalo to Dean Taylor from stackoverflow.com for this code.//
  $('#copyButt').on('click', function(){
    var copyText = document.querySelector('#textArea');
    copyText.select();
    try {
      var success = document.execCommand('copy');
    } catch(err) {
      console.log('unable to copy');
    }
  });
});
