<?php
include("businesslogic/simpleLogic.php");

$param = "";
$method = "";

// Prüfen, ob es sich um eine POST-Anfrage handelt
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    isset($_POST["method"]) ? $method = $_POST["method"] : false;
    isset($_POST["param"]) ? $param = $_POST["param"] : false;
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Ihre vorhandene Logik für GET-Anfragen
    isset($_GET["method"]) ? $method = $_GET["method"] : false;
    isset($_GET["param"]) ? $param = $_GET["param"] : false;
}

$logic = new SimpleLogic();
$result = $logic->handleRequest($method, $param);
if ($result == null) {
    response("GET", 400, null);
} else {
    response("GET", 200, $result);
}

function response($method, $httpStatus, $data)
{
    header('Content-Type: application/json');
    switch ($method) {
        case "GET":
            http_response_code($httpStatus);
            echo (json_encode($data));
            break;
        default:
            http_response_code(405);
            echo ("Method not supported yet!");
    }
}
