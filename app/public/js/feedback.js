$(function() {
  $.getJSON('api', updateFeedback);

  var formInputs = $('.feedback-form input');
  var submitButton = $('.feedback-form button');
   // formInputs.keyup(function() {

   //      var empty = false;
   //      formInputs.each(function() {
   //          if ($(this).val().length == 0) {
   //              empty = true;
   //          }
   //      });

   //      if (empty) {
   //          $(submitButton).attr('disabled', 'disabled');
   //      } else {
   //          $(submitButton).removeAttr('disabled');
   //      }
   //  });

   $('#feedback-form-name, #feedback-form-title').on('keyup', function(e) {
    if($('#error').length){
      $('#error').remove();                }
    });


   $('.feedback-form').submit(function(e) {
    e.preventDefault();
    if ($('#feedback-form-name').val().length == 0  || $('#feedback-form-title').val().length == 0) {
      if($('#error').length == 0){
        $('.feedback-form').prepend("<p id='error' style='color:red'>please fill the form, all fields are required</p>");
      }
      return;
    }


    $.post('api', {
      name: $('#feedback-form-name').val(),
      title: $('#feedback-form-title').val(),
      message: $('#feedback-form-message').val()
    }, updateFeedback);
  });

   $('.feedback-messages').on('click', function(e) {
    if (e.target.className == 'glyphicon glyphicon-remove') {
      $.ajax({
        url: 'api/' + e.target.id,
        type: 'DELETE',
        success: updateFeedback
        }); //ajax
      } // the target is a delete button
  }); //feedback messages

   function clearForm() {
     $('#feedback-form-name').val("");
     $('#feedback-form-title').val("");
     $('#feedback-form-message').val("");
   }

   function disableSubmit() {
   // body...
 }

 function updateFeedback(data) {
  clearForm();
  var output = '';
  $.each(data,function(key, item) {
   output += '     <div class="feedback-item item-list media-list">';
   output += '       <div class="feedback-item media">';
   output += '       <div class="media-left"><button class="feedback-delete btn btn-xs btn-danger"><span id="' + item._id + '" class="glyphicon glyphicon-remove"></span></button></div>';
   output += '         <div class="feedback-info media-body">';
   output += '           <div class="feedback-head">';
   output += '             <div class="feedback-title">' + item.title + ' <small class="feedback-name label label-info">' + item.name + '</small></div>';
   output += '           </div>';
   output += '           <div class="feedback-message">' + item.message + '</div>';
   output += '         </div>';
   output += '       </div>';
   output += '     </div>';
 });
  $('.feedback-messages').html(output);
}
});
