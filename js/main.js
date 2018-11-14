// Contact Form FUNCTION ---------------//
function submitform(){
  event.preventDefault()
	_i("sub_btn").disabled = true;
	_i("status").innerHTML = '<p style="font-size:25px; font-weight:600; margin:30px 0px;">Please Wait ...<p>';

  var fullname = _i("fullname").value;
  var email = _i("email").value;
  var subject = _i("subject").value;
  var message = _i("message").value;

  if(
    fullname == "" ||
    email == "" ||
    subject == "" ||
    message == ""
  ){
    _i("status").innerHTML = '<p class="h3" style="color:red; margin:30px 0px; font-weight:600;">ERROR ^^</p>';
    _i("sub_btn").disabled = false;
    if(fullname == ""){
      emptyName_error("yes");
    }else{
      emptyName_error("no");
    }

    if(email == ""){
      emptyEmail_error("yes");
    }else{
      emptyEmail_error("no");
    }

    if(subject == ""){
      emptySubject_error("yes");
    }else{
      emptySubject_error("no");
    }

    if(message == ""){
      emptyMessage_error("yes");
    }else{
      emptyMessage_error("no");
    }
  }else{
    var formdata = new FormData();
    formdata.append( "fullname", fullname );
  	formdata.append( "email", email );
  	formdata.append( "subject", subject );
  	formdata.append( "message", message );
  	var ajax = ajaxObj("POST", "php/send-message.php");
  	ajax.onreadystatechange = function() {
  		if(ajaxReturn(ajax) == true) {
  			if(ajax.responseText == "success"){
  				_i("sub_btn").disabled = false;
  				_i("contact_form").innerHTML = '<div class="success-box text-center"><p class="h2">Thanks <b>'+_i("fullname").value+'</b>, your message has been sent.</p></div>';
  				_i("status").innerHTML ='';
  			}else if(ajax.responseText.indexOf("error") >= 0){

  				_i("status").innerHTML = '<p class="h3" style="color:red; margin:30px 0px; font-weight:600;">ERROR ^^</p>';
  				_i("sub_btn").disabled = false;

  				if(ajax.responseText.indexOf("empty name") >= 0){
            emptyName_error("yes");
          }else{
            emptyName_error("no");
  				}

  				if(ajax.responseText.indexOf("empty email") >= 0){
            emptyEmail_error("yes");
          }else if(ajax.responseText.indexOf("Unvalid Email") >= 0){
            unvalidEmail_error();
          }else{
  					emptyEmail_error("no");
  				}

  				if(ajax.responseText.indexOf("empty subject") >= 0){
            emptySubject_error("yes");
  				}else{
            emptySubject_error("no");
  				}

  				if(ajax.responseText.indexOf("empty message") >= 0){
            emptyMessage_error("yes");
  				}else{
            emptyMessage_error("no");
  				}

  				if(ajax.responseText.indexOf("server error") >= 0){
  					_i("status").innerHTML = '<p class="h3" style="color:red; margin:30px 0px; font-weight:600;">ERROR...</p><p class="h4" style="color:#01161e; margin:30px 0px; font-weight:600;">The server failed to send the message. Please try again later.</p>';
  					//_i("status").innerHTML = ajax.responseText;
  				}

  			}
  		}
  	}
  	ajax.send( formdata );
  }

  // error message functions //

  function emptyName_error(status){
    var status = status;
    if(status == "yes"){
      _i("fullname").style.border = '1px solid red';
      _i("fullname-error").innerHTML = '<p style="color:red; margin:15px 0px;"> Please Enter your "Full Name".</p>';
    }else if(status == "no"){
      _i("fullname").style.border = '1px solid #e1e1e1';
      _i("fullname-error").innerHTML = '';
    }
  }

  function emptyEmail_error(status){
    var status = status;
    if(status == "yes"){
      _i("email").style.border = '1px solid red';
      _i("email-error").innerHTML = '<p style="color:red; margin:15px 0px;"> Please Enter your "Email".</p>';
    }else if(status == "no"){
      _i("email").style.border = '1px solid #e1e1e1';
      _i("email-error").innerHTML = '';
    }
  }

  function unvalidEmail_error(){
      _i("email").style.border = '1px solid red';
      _i("email-error").innerHTML = '<p style="color:red; margin:15px 0px;"> Your Email is "Unvalid".</p>';
  }


    function emptySubject_error(status){
      var status = status;
      if(status == "yes"){
        _i("subject").style.border = '1px solid red';
        _i("subject-error").innerHTML = '<p style="color:red; margin:15px 0px;"> Please Enter a "Subject".</p>';
      }else if(status == "no"){
        _i("subject").style.border = '1px solid #e1e1e1';
        _i("subject-error").innerHTML = '';
      }
    }


      function emptyMessage_error(status){
        var status = status;
        if(status == "yes"){
          _i("message").style.border = '1px solid red';
          _i("message-error").innerHTML = '<p style="color:red; margin:15px 0px"> Please Write a  "Message".</p>';
        }else if(status == "no"){
          _i("message").style.border = '1px solid #e1e1e1';
          _i("message-error").innerHTML = '';
        }
      }
}

//----------------------------------//
