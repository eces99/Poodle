<?php
class Appointment {
    public $id;
    public $title;
    public $place;
    public $info;
    public $beginTime;
    public $duration;

    function __construct($id, $title, $place, $info, $beginTime,  $duration) {
        $this->id = $id;
        $this->title = $title;
        $this->place=$place;
        $this->info=$info;
        $this->beginTime=$beginTime;
        $this->duration=$duration;
      }
}
