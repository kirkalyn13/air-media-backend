-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2022 at 02:16 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `airmediadb`
--

-- --------------------------------------------------------

--
-- Table structure for table `music`
--

CREATE TABLE `music` (
  `musicID` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `artist` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `music`
--

INSERT INTO `music` (`musicID`, `title`, `artist`, `genre`, `path`) VALUES
(1, 'Ikaw Lang', 'Nobita', 'Pop', 'ikaw_lang_nobita'),
(2, 'Pagtingin', 'Ben&Ben', 'Indie Folk', 'pagtingin_ben_and_ben'),
(3, 'Sigurado', 'Zack Tabudlo', 'Pop', 'sigurado_zack_tabudlo'),
(4, 'Habang Buhay', 'Zack Tabudlo', 'Pop', 'habang_buhay_zack_tabudlo'),
(5, 'Paraluman', 'Adie', 'Pop', 'paraluman_adie'),
(6, 'Pagsamo', 'Adie', 'Pop', 'pagsamo_arthur_nery');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `videoID` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`videoID`, `title`, `genre`, `path`) VALUES
(1, 'Spider-Man: No Way Home Trailer', 'Action/Science Fiction', 'spiderman_no_way_home'),
(2, 'Doctor Strange in the Multiverse of Madness Trailer', 'Action/Science Fiction', 'doctor_strange_multiverse_of_madness'),
(3, 'The Batman Trailer', 'Action/Mystery', 'the_batman'),
(4, 'Eternals Trailer', 'Action/Fantasy', 'eternals'),
(5, 'Shang Chi and the Legend of the Ten Rings Trailer', 'Action', 'shang_chi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`musicID`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`videoID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `music`
--
ALTER TABLE `music`
  MODIFY `musicID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `videoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
