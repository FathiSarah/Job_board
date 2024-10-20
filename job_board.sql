-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 15 oct. 2024 à 11:28
-- Version du serveur : 5.7.24
-- Version de PHP : 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `job_board`
--

-- --------------------------------------------------------

--
-- Structure de la table `advertisements`
--

CREATE TABLE `advertisements` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `city` varchar(255) NOT NULL,
  `zip_code` varchar(5) NOT NULL,
  `salary_range` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `advertisements`
--

INSERT INTO `advertisements` (`id`, `company_id`, `title`, `description`, `city`, `zip_code`, `salary_range`, `created_at`) VALUES
(1, 2, 'Software Engineer', 'We are looking for a talented software engineer to join our team.', 'Paris', '75001', '50,000 - 70,000', '2024-10-15 11:17:23'),
(2, 2, 'Data Scientist', 'Join our data team to analyze and derive insights from complex datasets.', 'Paris', '75001', '55,000 - 80,000', '2024-10-15 11:17:23'),
(3, 3, 'Environmental Consultant', 'Help us achieve sustainability goals by providing expert consultancy.', 'Lyon', '69001', '45,000 - 65,000', '2024-10-15 11:17:23');

-- --------------------------------------------------------

--
-- Structure de la table `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `advertisement_id` int(11) NOT NULL,
  `message` text,
  `email` varchar(255) NOT NULL,
  `complet_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `applications`
--

INSERT INTO `applications` (`id`, `user_id`, `advertisement_id`, `message`, `email`, `complet_name`) VALUES
(1, 4, 1, 'I am passionate about software development and eager to contribute to your team.', 'marie.curie@example.com', 'Marie Curie'),
(2, 5, 2, 'I have a strong background in data science and would love to work with you.', 'pierre.dupont@example.com', 'Pierre Dupont'),
(3, 4, 3, 'As an environmental consultant, I am excited about your sustainability projects.', 'marie.curie@example.com', 'Marie Curie');

-- --------------------------------------------------------

--
-- Structure de la table `companies`
--

CREATE TABLE `companies` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zip_code` varchar(5) NOT NULL,
  `description` text,
  `website` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `companies`
--

INSERT INTO `companies` (`user_id`, `name`, `city`, `zip_code`, `description`, `website`) VALUES
(2, 'Tech Innovators', 'Paris', '75001', 'A leading tech company specializing in innovative solutions.', 'www.techinnovators.fr'),
(3, 'Green Solutions', 'Lyon', '69001', 'An eco-friendly company focused on sustainable practices.', 'www.greensolutions.fr');

-- --------------------------------------------------------

--
-- Structure de la table `peoples`
--

CREATE TABLE `peoples` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zip_code` varchar(5) NOT NULL,
  `tel` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `peoples`
--

INSERT INTO `peoples` (`user_id`, `first_name`, `last_name`, `city`, `zip_code`, `tel`) VALUES
(4, 'Marie', 'Curie', 'Lyon', '69001', '+33 7 98 76 54 32'),
(5, 'Pierre', 'Dupont', 'Paris', '75001', '+33 6 12 34 56 78');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','company','job_seeker') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'admin@example.com', 'adminpassword', 'admin', '2024-10-15 11:17:10'),
(2, 'company1@example.com', 'password123', 'company', '2024-10-15 11:17:10'),
(3, 'company2@example.com', 'password456', 'company', '2024-10-15 11:17:10'),
(4, 'jobseeker1@example.com', 'seekpass123', 'job_seeker', '2024-10-15 11:17:10'),
(5, 'jobseeker2@example.com', 'seekpass456', 'job_seeker', '2024-10-15 11:17:10');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `advertisements`
--
ALTER TABLE `advertisements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_advertisements_companies` (`company_id`);

--
-- Index pour la table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_applications_users` (`user_id`),
  ADD KEY `fk_applications_advertisements` (`advertisement_id`);

--
-- Index pour la table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`user_id`);

--
-- Index pour la table `peoples`
--
ALTER TABLE `peoples`
  ADD PRIMARY KEY (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `advertisements`
--
ALTER TABLE `advertisements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `advertisements`
--
ALTER TABLE `advertisements`
  ADD CONSTRAINT `advertisements_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_advertisements_companies` FOREIGN KEY (`company_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`advertisement_id`) REFERENCES `advertisements` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_applications_advertisements` FOREIGN KEY (`advertisement_id`) REFERENCES `advertisements` (`id`),
  ADD CONSTRAINT `fk_applications_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_companies_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `peoples`
--
ALTER TABLE `peoples`
  ADD CONSTRAINT `fk_peoples_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `peoples_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
