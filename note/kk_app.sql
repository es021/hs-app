-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2019 at 11:40 AM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 5.6.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kk_app`
--
CREATE DATABASE IF NOT EXISTS `kk_app` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci;
USE `kk_app`;

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `ID` bigint(20) NOT NULL,
  `slug` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`ID`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'shell', '2019-09-06 09:33:27', '0000-00-00 00:00:00'),
(2, 'petronas', '2019-09-06 09:33:27', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `companies_meta`
--

CREATE TABLE `companies_meta` (
  `ID` bigint(20) NOT NULL,
  `_id` bigint(20) NOT NULL,
  `_key` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `_value` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `companies_meta`
--

INSERT INTO `companies_meta` (`ID`, `_id`, `_key`, `_value`, `created_at`, `updated_at`) VALUES
(1, 1, 'name', 'Shell', '2019-09-06 09:33:59', '0000-00-00 00:00:00'),
(2, 2, 'name', 'Petronas', '2019-09-06 09:34:10', '0000-00-00 00:00:00'),
(3, 1, 'website', 'www.shell.com', '2019-09-06 09:37:07', '0000-00-00 00:00:00'),
(4, 2, 'website', 'www.petronas.com', '2019-09-06 09:37:07', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `unis`
--

CREATE TABLE `unis` (
  `ID` bigint(20) NOT NULL,
  `slug` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `unis`
--

INSERT INTO `unis` (`ID`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'intec', '2019-09-06 09:34:31', '0000-00-00 00:00:00'),
(2, 'inti', '2019-09-06 09:34:31', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `unis_meta`
--

CREATE TABLE `unis_meta` (
  `ID` bigint(20) NOT NULL,
  `_id` bigint(20) NOT NULL,
  `_key` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `_value` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `unis_meta`
--

INSERT INTO `unis_meta` (`ID`, `_id`, `_key`, `_value`, `created_at`, `updated_at`) VALUES
(1, 1, 'name', 'INTEC', '2019-09-06 09:35:11', '0000-00-00 00:00:00'),
(2, 2, 'name', 'INTI', '2019-09-06 09:35:11', '0000-00-00 00:00:00'),
(3, 1, 'location', 'Shah Alam', '2019-09-06 09:35:42', '0000-00-00 00:00:00'),
(4, 2, 'location', 'Nilai', '2019-09-06 09:35:42', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` bigint(20) NOT NULL,
  `slug` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'wan-zulsarhan', '2019-09-04 03:45:52', '0000-00-00 00:00:00'),
(2, 'al-fateh', '2019-09-04 03:45:52', '0000-00-00 00:00:00'),
(3, 'siti-huwaida', '2019-09-04 03:47:50', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users_meta`
--

CREATE TABLE `users_meta` (
  `ID` bigint(20) NOT NULL,
  `_id` bigint(20) NOT NULL,
  `_key` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `_value` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `users_meta`
--

INSERT INTO `users_meta` (`ID`, `_id`, `_key`, `_value`, `created_at`, `updated_at`) VALUES
(1, 1, 'email', 'wan.zulsarhan@gmail.com', '2019-09-04 03:46:34', '0000-00-00 00:00:00'),
(2, 2, 'email', 'al.fateh@gmail.com', '2019-09-04 03:46:34', '0000-00-00 00:00:00'),
(3, 1, 'first_name', 'Wan Zulsarhan', '2019-09-04 03:47:16', '0000-00-00 00:00:00'),
(4, 1, 'last_name', 'Wan Shaari', '2019-09-04 03:47:16', '0000-00-00 00:00:00'),
(5, 2, 'first_name', 'Wan Muhammad Al-Fateh', '2019-09-04 03:47:33', '0000-00-00 00:00:00'),
(6, 2, 'last_name', 'Wan Zulsarhan', '2019-09-04 03:47:33', '0000-00-00 00:00:00'),
(9, 3, 'email', 'siti.huwaida@gmail.com', '2019-09-04 03:48:28', '0000-00-00 00:00:00'),
(10, 3, 'first_name', 'Siti Huwaida', '2019-09-04 03:48:28', '0000-00-00 00:00:00'),
(11, 3, 'last_name', 'Muhammad Ghanisma', '2019-09-04 03:48:42', '0000-00-00 00:00:00'),
(12, 1, 'role', 'Recruiter', '2019-09-04 04:25:36', '2019-09-06 09:37:30'),
(13, 2, 'role', 'Student', '2019-09-04 04:25:36', '0000-00-00 00:00:00'),
(14, 3, 'role', 'Administrator', '2019-09-04 04:25:52', '0000-00-00 00:00:00'),
(15, 1, 'company_id', '1', '2019-09-06 09:37:49', '0000-00-00 00:00:00'),
(16, 3, 'uni_id', '2', '2019-09-06 09:38:32', '2019-09-06 09:38:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `companies_meta`
--
ALTER TABLE `companies_meta`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `_id` (`_id`,`_key`);

--
-- Indexes for table `unis`
--
ALTER TABLE `unis`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `unis_meta`
--
ALTER TABLE `unis_meta`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `_id` (`_id`,`_key`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users_meta`
--
ALTER TABLE `users_meta`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `_id` (`_id`,`_key`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `companies_meta`
--
ALTER TABLE `companies_meta`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `unis`
--
ALTER TABLE `unis`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `unis_meta`
--
ALTER TABLE `unis_meta`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users_meta`
--
ALTER TABLE `users_meta`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
