<?php
function post($remote_server, $post_string)
{
    $context = array(
        'http' => array(
            'method' => 'POST',
            'header' => 'Content-type: application/x-www-form-urlencoded' .
                        '\r\n'.'User-Agent : Jimmy\'s POST Example beta' .
                        '\r\n'.'Content-length:' . strlen($post_string) + 8,
            'content' => $post_string)
        );
    $stream_context = stream_context_create($context);
    $data = file_get_contents($remote_server, false, $stream_context);
    return $data;
}
?>