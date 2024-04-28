<?php
include("db/dataHandler.php");

class SimpleLogic
{
    private $dh;
    function __construct()
    {
        $this->dh = new DataHandler();
    }

    function handleRequest($method, $param)
    {
        switch ($method) {
            case "addAppointment":
                $res= $this->dh->addAppointment($param);
                break;
            case "queryAppointments":
                $res = $this->dh->queryAppointments();
                break;
            case "queryAppointmentsById":
                $res = $this->dh->queryAppointmentById($param);
                break;
            case "queryAppointmentsByName":
                $res = $this->dh->queryAppointmentByName($param);
                break;
            case "queryAppointmentsByTime":
                $res = $this->dh->queryAppointmentByTime($param);
                break;
            case "getAppointments":
                $res = $this->dh->getAppointments();
                break;
            case "getTerminSlots":
                $res = $this->dh->getTerminSlots($_GET['appointment_id']);
                break;
            case "addVoting":
                $this->dh->addVoting($param);
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
