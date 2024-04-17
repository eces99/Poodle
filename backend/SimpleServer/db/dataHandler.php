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

    public function addAppointment($appointment)
    {
        $conn = $this->getDBConnection();
        $sql = "INSERT INTO appointment (title, place, info, beginTime, duration) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);

        $stmt->bind_param("ssssi", $appointment['title'], $appointment['place'], $appointment['info'], $appointment['beginTime'], $appointment['duration']);
        
        if ($stmt->execute()) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $stmt->error;
        }
        $stmt->close();
        $conn->close();
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

    public function getAppointments()
{
    // Establish database connection
    $conn = $this->getDBConnection();
    
    // Query to fetch appointments
    $sql = "SELECT * FROM appointment";
    $result = $conn->query($sql);
    
    // Check if there are rows returned
    if ($result->num_rows > 0) {
        // Array to store appointments
        $appointments = array();
        
        // Fetching data and adding to appointments array
        while ($row = $result->fetch_assoc()) {
            $appointments[] = array(
                'id' => $row['id'],
                'title' => $row['title'],
                'place' => $row['place'],
                'info' => $row['info'],
                'beginTime' => $row['beginTime'],
                'duration' => $row['duration']
            );
        }
        
        // Close result set
        $result->close();
    } else {
        // No appointments found
        $appointments = array();
    }
    
    // Close database connection
    $conn->close();
    
    return $appointments;
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
