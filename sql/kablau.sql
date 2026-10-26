-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 26/10/2026 às 20:04
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE `kablau`;

USE `kablau`; 

--
-- Banco de dados: `kablau`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(10) UNSIGNED NOT NULL,
  `nome` varchar(150) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `imagem` varchar(255) NOT NULL,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `categoria`, `imagem`, `preco`) VALUES
(1, 'Memória DDR4 Corsair Vengeance RGB Pro, 16GB (2x8GB)', 'RAM', 'Img/RAM_corsair.jpg', 699.90),
(2, 'Gabinete montech X3 mesh', 'Gabinete', 'Img/gabinete_Montech_X3_MESH.jpg', 299.99),
(3, 'CPU Ryzen 5 5500', 'CPU', 'Img/R5-5500.jpg', 578.99),
(4, 'CPU Intel Core Ultra 7 270k Plus', 'CPU', 'Img/core-u7-270k+.jpg', 1999.90),
(5, 'Placa de vídeo intel ARC B580', 'GPU', 'Img/intel-arc-b580.jpg', 2099.99),
(6, 'Placa mãe Maxsun Z890', 'Placa-mãe', 'Img/maxsun-z890.webp', 2746.30),
(7, 'Placa mãe B550 Aorus Elite', 'Placa-mãe', 'Img/b550m-asus-elite.webp', 739.99),
(8, 'Fonte Coolermaster Gold 850', 'Fonte', 'Img/fonte-coolermaster-gold-850.webp', 399.99),
(9, 'NVME Kingston 2TB', 'Armazenamento', 'Img/nvme-2tb-kingston.jpg', 1759.99);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `nome` varchar(120) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `senha_hash` varchar(255) NOT NULL,
  `cpf` char(11) NOT NULL,
  `nascimento` date NOT NULL,
  `email` varchar(150) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
