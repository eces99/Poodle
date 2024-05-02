<?php
include ("db/dataHandler.php");

// Diese Klasse implementiert eine einfache Logik zur Verarbeitung von Anfragen
class SimpleLogic
{
    private $dh;

    // Konstruktor, der eine Instanz des Datenhandlers erstellt
    function __construct()
    {
        $this->dh = new DataHandler();
    }

    // Diese Methode verarbeitet die Anfragen basierend auf dem übergebenen Methodennamen und Parametern
    function handleRequest($method, $param)
    {
        switch ($method) {
            // Fügt einen Termin hinzu
            case "addAppointment":
                $res = $this->dh->addAppointment($param);
                break;
            // Ruft alle Termine ab
            case "queryAppointments":
                $res = $this->dh->queryAppointments();
                break;
            // Ruft einen Termin anhand seiner ID ab
            case "queryAppointmentsById":
                $res = $this->dh->queryAppointmentById($param);
                break;
            // Ruft Termine anhand des Namens ab
            case "queryAppointmentsByName":
                $res = $this->dh->queryAppointmentByName($param);
                break;
            // Ruft Termine basierend auf dem Zeitpunkt ab
            case "queryAppointmentsByTime":
                $res = $this->dh->queryAppointmentByTime($param);
                break;
            // Ruft alle Termine ab
            case "getAppointments":
                $res = $this->dh->getAppointments();
                break;
            // Ruft die Terminschlitze ab
            case "getTerminSlots":
                $res = $this->dh->getTerminSlots($_GET['appointment_id']);
                break;
            // Fügt eine Bewertung hinzu
            case "addVoting":
                $this->dh->addVoting($param);
                break;
            // Löscht einen Termin
            case "deleteAppointment":
                $this->dh->deleteAppointment($param['id']);
                break;
            // Standardfall: keine Aktion
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
?>
