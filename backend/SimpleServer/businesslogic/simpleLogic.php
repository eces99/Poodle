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
                $this->dh->addAppointment($param);
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
            case "getAppointments": // New case to fetch appointments
                $res = $this->dh->getAppointments();
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
