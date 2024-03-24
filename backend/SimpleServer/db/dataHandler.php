<?php
include("./models/person.php");
class DataHandler
{
    public function queryAppointments()
    {
        $res =  $this->getDemoData();
        return $res;
    }

    public function queryAppointmentById($id)
    {
        $result = array();
        foreach ($this->queryAppointments() as $val) {
            if ($val[0]->id == $id) {
                array_push($result, $val);
            }
        }
        return $result;
    }

    public function queryAppointmentByName($name)
    {
        $result = array();
        foreach ($this->queryAppointments() as $val) {
            if ($val[0]->title == $name) {
                array_push($result, $val);
            }
        }
        return $result;
    }
    
    public function queryAppointmentByTime($time)
    {
        $result = array();
        foreach ($this->queryAppointments() as $val) {
            if ($val[0]->beginTime == $time) {
                array_push($result, $val);
            }
        }
        return $result;
    }

    private static function getDemoData()
    {
        $demodata = [
            [new Appointment(1, "Meeting", "Room 1", "Discuss the project", "2021-06-01 09:00:00", 1)],
            [new Appointment(2, "Lunch", "Canteen", "Lunch with colleagues", "2021-06-01 12:00:00", 1)],
            [new Appointment(3, "Meeting", "Room 2", "Discuss the project", "2021-06-02 09:00:00", 1)],
            [new Appointment(4, "Lunch", "Canteen", "Lunch with colleagues", "2021-06-02 12:00:00", 1)],
        ];
        return $demodata;
    }
}
