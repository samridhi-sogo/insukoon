<?php 
  
$url = 'RequiredLink'; 
$data = [ 
    'collection'  => 'RequiredAPI'
]; 
   
$curl = curl_init($url); 
  
function APIcall($method, $url, $data) { 
    $curl = curl_init(); 
      
    switch ($method) { 
        case "POST": 
            curl_setopt($curl, CURLOPT_POST, 1); 
            if ($data) 
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data); 
            break; 
        case "PUT": 
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT"); 
            if ($data) 
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data); 
            break; 
    } 
     
    curl_setopt($curl, CURLOPT_URL, $url); 
    curl_setopt($curl, CURLOPT_HTTPHEADER, array( 
        'APIKEY: http://api.clicky.com/api/stats/4?site_id=101302623&sitekey=1dbd02db7f88b504type=visitors,actions&date=last-7-days&daily=1&output=csv', 
        'Content-Type: application/json', 
    )); 
     
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC); 
    $result = curl_exec($curl); 
      
    if(!$result) { 
        echo("Connection failure!"); 
    } 
    curl_close($curl); 
    return $result; 
} 
?> 