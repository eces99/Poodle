<?php
include("businesslogic/simpleLogic.php");

$param = "";
$method = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    isset($_POST["method"]) ? $method = $_POST["method"] : false;
    if (isset($_POST["param"])) {
        $param = json_decode($_POST["param"], true);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    isset($_GET["method"]) ? $method = $_GET["method"] : false;
    isset($_GET["param"]) ? $param = $_GET["param"] : false;
}

$logic = new SimpleLogic();
$result = $logic->handleRequest($method, $param);

function response($method, $httpStatus, $data)
{
    header('Content-Type: application/json');
    http_response_code($httpStatus);
    echo (json_encode($data));
}

response($_SERVER['REQUEST_METHOD'], ($result == null ? 400 : 200), $result);
