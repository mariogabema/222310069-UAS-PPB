-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2024 at 03:29 AM
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
-- Database: `cheatsheet_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`) VALUES
(1, 'Pemograman Perangkat Bergerak'),
(2, 'Pemograman Web');

-- --------------------------------------------------------

--
-- Table structure for table `cheatsheets`
--

CREATE TABLE `cheatsheets` (
  `cheatsheet_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cheatsheets`
--

INSERT INTO `cheatsheets` (`cheatsheet_id`, `title`, `content`, `user_id`, `created_at`, `category_id`) VALUES
(1, 'RFC', 'React is an open-source JavaScript library used to build front end, user interfaces and components. It is adaptable and most often used for developing SPA’s, or Single? Page Applications. Whereas some web pages are designed by loading a completely new page every time the user clicks on a link, single page applications instead dynamically re-render the current page with new data that is passed in from the server. In this manner, React can help build a single page application with multiple routes, and it appears to the user that they are accessing a number of different ‘pages.’ Generally speaking, though, the single page application has faster transitions, as it is only re-rendering the information that has changed or is new. In order to get started with React, it is important to have a basic understanding of some of the fundamentals. In this four-part series, my goal is to break down a few of those essentials.', 4, '2024-06-24 14:27:33', 1),
(2, 'NFC', 'adasdasw', 4, '2024-06-24 20:07:48', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `created_at`) VALUES
(4, 'HAPIZ ILHAM MAULANA', '222310041@student.ibik.ac.id', 'admin', '2024-06-24 14:44:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `cheatsheets`
--
ALTER TABLE `cheatsheets`
  ADD PRIMARY KEY (`cheatsheet_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cheatsheets`
--
ALTER TABLE `cheatsheets`
  MODIFY `cheatsheet_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cheatsheets`
--
ALTER TABLE `cheatsheets`
  ADD CONSTRAINT `cheatsheets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `cheatsheets_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
