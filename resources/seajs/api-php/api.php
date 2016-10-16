<?php
    error_reporting(E_STRICT);
    include_once("phppost.php");
    $remoteURL = 'http://115.29.229.128:8080/recordsmanager2.0/';

    if(isset($_GET['url'])){
        $action = $_GET['url'];
        $remoteURL = $remoteURL.$action;

        if(count($_POST) > 0){
            $post_array = array();
            foreach($_POST as $pKey => $pValue){
                $post_array[]=$pKey.'='.$pValue;
            }
            $post_string = implode("&", $post_array);
            // echo $remoteURL;
            // echo $post_string;
            $result = post($remoteURL, $post_string);
        }else{
            $get_array = array();
            foreach($_GET as $pKey => $pValue){
                if($pKey != 'url'){
                    $get_array[]=$pKey.'='.$pValue;
                }
            }
            $get_string = implode("&", $get_array);
            
            if(strlen($get_string) > 0){
                $remoteURL = $remoteURL.'?'.$get_string;
            }

            // echo $remoteURL;
            $result = file_get_contents($remoteURL);
        }

        echo $result;
    }
?>
