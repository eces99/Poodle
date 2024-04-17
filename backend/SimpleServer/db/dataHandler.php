<?php
include("./models/appointment.php");

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


// Funktion zum Inkrementieren des Auto-Increment-WFerts

    public function addAppointment($appointment)
    {
        
        $conn = $this->getDBConnection();
        $conn->autocommit(FALSE); // Start transaction

    
        try {
            // Insert into appointment without beginTime
            $sql = "INSERT INTO appointment (title, place, info, duration) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sssi", $appointment['title'], $appointment['place'], $appointment['info'], $appointment['duration']);
            $stmt->execute();
            $appointmentId = $stmt->insert_id; // Get the last inserted ID

    
            // Handle beginTime
            if (isset($appointment['beginTime']) && is_array($appointment['beginTime'])) {
                $sql = "INSERT INTO terminslots (beginTime, appointment_id) VALUES (?, ?)";
                $stmt = $conn->prepare($sql);
                foreach ($appointment['beginTime'] as $beginTime) {
                    $stmt->bind_param("si", $beginTime, $appointmentId);
                    $stmt->execute();
                }
            }
    
            $conn->commit(); // Commit transaction
            echo "New record created successfully";
        } catch (Exception $e) {
            $conn->rollback(); // Rollback transaction on error
            echo "Error: " . $e->getMessage();
        } finally {
            $stmt->close();
            $conn->close();
        }

        return $appointmentId;
    }
    
    
    public function getDBConnection()
    {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "poodle_db";
        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        return $conn;
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
