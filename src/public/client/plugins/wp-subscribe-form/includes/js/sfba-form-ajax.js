jQuery(document).ready( function($) {
	$("#sfba_subscribe_form").submit( function() {
		var post_id = jQuery('#sfba_post_type_id').val();
		var name = jQuery('.sfba-form-name').val();
  		var email = jQuery('.sfba-form-email').val();
  		if(name == null){
  			data = {
				action : 'sfba_ajax', 'subscriberemail':email,'post_id':post_id
			};
		}else{
			data = {
				action : 'sfba_ajax', 'subscribername':name,'subscriberemail':email,'post_id':post_id
			};
		}
		$.post(the_ajax_script.ajaxurl , data , function (response){
			$("#sfba_thanks_container").css({
				"opacity":"0",
				"display":"flex",
			}).show().animate({opacity:1})
		});
		return false;	
	});

	jQuery(".sfba_delete_entry").click(function(){
		var deleterowid = $( this ).attr( "data-delete" );
		var wpappp_confirm_delete = window.confirm("Are you sure you want to delete Record with ID# "+deleterowid);
		var wpapp_redirect_refresh = window.location.href;
		if (wpappp_confirm_delete == true) {
			jQuery.ajax({
				type: 'POST',
				url: the_ajax_script.ajaxurl,
				data: {"action": "sfba_delete_db_record","id":deleterowid},
				success: function(data){
					location.href = wpapp_redirect_refresh;
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) { 
					alert("Status: " + textStatus); alert("Error: " + errorThrown); 
				} 
			});
		} 
		// Prevents default submission of the form after clicking on the submit button. 
		return false;   
	});

	jQuery("#sfba_delete_all_data").click(function(){
		var wpappp_confirm_delete = window.confirm("Are you sure you want to delete all subscribers from the database?");
		var wpapp_redirect_refresh = window.location.href;
		if (wpappp_confirm_delete == true) {
			jQuery.ajax({
				type: 'POST',
				url: the_ajax_script.ajaxurl,
				data: {"action": "sfba_delete_db_data"},
				success: function(data){
					location.href = wpapp_redirect_refresh;
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) { 
					alert("Status: " + textStatus); alert("Error: " + errorThrown); 
				} 
			});
		} 
		// Prevents default submission of the form after clicking on the submit button. 
		return false;   
	});

	$('.sfba-form-submit-button').on( 'click', function (event){
		var form_id = jQuery(this).data('form-id');		
		if ( typeof $('#' + form_id + ' input[type=checkbox]').prop("checked") !== 'undefined' &&   $('#' + form_id + ' input[type=checkbox]').prop("checked") !== true){
			$('#' + form_id + ' .sfba-conset-field-error').show();			 
			event.preventDefault();
		}
	});
});