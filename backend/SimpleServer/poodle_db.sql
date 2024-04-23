-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 17. Apr 2024 um 13:26
-- Server-Version: 10.4.28-MariaDB
-- PHP-Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `poodle_db`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointment`
--

CREATE TABLE `appointment` (
  `id` int(10) NOT NULL,
  `title` varchar(50) NOT NULL,
  `place` varchar(50) NOT NULL,
  `info` varchar(100) NOT NULL,
  `duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `appointment`
--

INSERT INTO `appointment` (`id`, `title`, `place`, `info`, `duration`) VALUES
(10, 'irem', 'irem', 'irem', 60),
(11, 'h', 'h', 'h', 12),
(12, 'n', 'n', 'n', 21),
(13, 'irem', 'irem', 'irem', 12);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `terminslots`
--

CREATE TABLE `terminslots` (
  `id` int(11) NOT NULL,
  `beginTime` datetime NOT NULL,
  `appointment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `terminslots`
--

INSERT INTO `terminslots` (`id`, `beginTime`, `appointment_id`) VALUES
(1, '2024-04-17 13:27:00', 13),
(2, '2024-04-17 15:23:00', 13);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `terminslots`
--
ALTER TABLE `terminslots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT für Tabelle `terminslots`
--
ALTER TABLE `terminslots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `terminslots`
--
ALTER TABLE `terminslots`
  ADD CONSTRAINT `terminslots_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`id`);
COMMIT;

ALTER TABLE `terminslots`
ADD COLUMN `endTime` datetime;

---will add calculation to get end time


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
