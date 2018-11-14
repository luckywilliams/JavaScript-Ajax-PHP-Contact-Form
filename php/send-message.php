<?php
if(isset($_POST['fullname'])){
	$fullname = preg_replace('#[^a-z ]#i', '', $_POST['fullname']);
	$email = preg_replace('#[^a-z0-9@._]#i', '', $_POST['email']);
	$subject = preg_replace('#[^a-z0-9 ]#i', '', $_POST['subject']);
	$message = nl2br($_POST['message']);

	if(empty($fullname) || empty($email) || empty($subject) || empty($message)){

		echo "error";

		if(empty($fullname)){
			echo "empty name";
		}

		if(empty($email)){
			echo "empty email";
		}

		if(empty($subject)){
			echo "empty subject";
		}

		if(empty($message)){
			echo "empty message";
		}

	}else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    $error = 'error';

      $error .=  'Unvalid Email';

      echo $error;

  }else if(!preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", $email)){

    $error = 'error';

      $error .=  'Unvalid Email';

      echo $error;

  }else{

		$to = "thewebsitecamp@gmail.com";
		$subject = 'Contact Form Message by ' . $fullname;
		$message = '<b>Name : </b>'.$fullname.'<br/><b>Email : </b>'.$email.'<br /><b>Subject : </b>'.$subject.'<p>'.$message.'</p>';

		// To send HTML mail, the Content-type header must be set
		$headers ='X-Mailer: PHP/' . phpversion()."\r\n";
		$headers .= 'MIME-Version: 1.0'."\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";

		// Additional headers
		$headers .= 'To: The Website Camp <'.$to.'>'."\r\n";
		$headers .= 'From:  '.$fullname.' <'.$email.'>'."\r\n";
		$headers .= 'Reply-To:  '.$fullname.' <'.$email.'>'."\r\n";

		if( mail($to, $subject, $message, $headers) ){
			echo "success";
		} else {
			echo "errror";
			echo "server error";
		}
	}

}
?>
