-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2024 at 02:51 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `poodle_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` int(10) NOT NULL,
  `title` varchar(50) NOT NULL,
  `place` varchar(50) NOT NULL,
  `info` varchar(100) NOT NULL,
  `duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `title`, `place`, `info`, `duration`) VALUES
(10, 'irem', 'irem', 'irem', 60),
(11, 'h', 'h', 'h', 12),
(12, 'n', 'n', 'n', 21),
(13, 'irem', 'irem', 'irem', 12),
(14, 'ece', 'ece', 'ece', 20),
(15, 'ece2', 'ece', 'ece', 20);

-- --------------------------------------------------------

--
-- Table structure for table `terminslots`
--

CREATE TABLE `terminslots` (
  `id` int(11) NOT NULL,
  `beginTime` datetime NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `endTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `terminslots`
--

INSERT INTO `terminslots` (`id`, `beginTime`, `appointment_id`, `endTime`) VALUES
(1, '2024-04-17 13:27:00', 13, NULL),
(2, '2024-04-17 15:23:00', 13, NULL),
(3, '2024-04-23 10:00:00', 14, NULL),
(4, '2024-04-23 10:00:00', 15, NULL),
(5, '2024-04-24 12:00:00', 15, NULL),
(6, '2024-04-23 15:00:00', 15, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `votings`
--

CREATE TABLE `votings` (
  `voting_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `slot_id` int(11) NOT NULL,
  `comment` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `votings`
--

INSERT INTO `votings` (`voting_id`, `username`, `appointment_id`, `slot_id`, `comment`) VALUES
(6, 'ece', 14, 3, 'ece'),
(7, 'Ece', 13, 1, 'jjkh'),
(8, 'Ece', 13, 2, 'jjkh');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `terminslots`
--
ALTER TABLE `terminslots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indexes for table `votings`
--
ALTER TABLE `votings`
  ADD PRIMARY KEY (`voting_id`),
  ADD KEY `appointment_id` (`appointment_id`),
  ADD KEY `slot_id` (`slot_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `terminslots`
--
ALTER TABLE `terminslots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `votings`
--
ALTER TABLE `votings`
  MODIFY `voting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `terminslots`
--
ALTER TABLE `terminslots`
  ADD CONSTRAINT `terminslots_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`id`);

--
-- Constraints for table `votings`
--
ALTER TABLE `votings`
  ADD CONSTRAINT `appointment_id` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`id`),
  ADD CONSTRAINT `slot_id` FOREIGN KEY (`slot_id`) REFERENCES `terminslots` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
