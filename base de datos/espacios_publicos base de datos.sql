-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-11-2021 a las 18:00:53
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `espacios publicos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id_Admin` int(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id_Admin`, `correo`, `contraseña`) VALUES
(1, 'admin@ad', '12345');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `artistas`
--

CREATE TABLE `artistas` (
  `id_Artistas` int(255) NOT NULL,
  `nombreReal` varchar(50) NOT NULL,
  `nombreArtista` varchar(50) NOT NULL,
  `correo` varchar(70) NOT NULL,
  `contrasena` varchar(20) NOT NULL,
  `nacionalidad` varchar(20) NOT NULL,
  `descripcion` text NOT NULL,
  `fotoDePerfilULR` text NOT NULL,
  `tipoDeDisplaytipoDeDisplay` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `artistas`
--

INSERT INTO `artistas` (`id_Artistas`, `nombreReal`, `nombreArtista`, `correo`, `contrasena`, `nacionalidad`, `descripcion`, `fotoDePerfilULR`, `tipoDeDisplaytipoDeDisplay`) VALUES
(1, 'Rick', 'Roll', 'rickAstley@gmail.com', 'rickrool', 'USA', 'Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba ', '2Q.png', 2),
(2, 'Usuario 1', 'Usuario 1', 'usuario1@gmail.com', '12345', 'USA', 'Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba ', 'human-gcffcdf5b5_1280.jpg', 2),
(3, 'Usuario 2', 'Usuario 2', 'usuario2@gmail.com', '12345', 'Chilena', 'Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba ', 'beard-g206dab95f_1280.jpg', 2),
(4, 'Usuario 3', 'Usuario 3', 'usuario3@gmail.com', '12345', 'Chilena', 'Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba Prueba ', 'paint-gdaff41df8_1280.jpg', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `integrante`
--

CREATE TABLE `integrante` (
  `id` int(255) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `integrante`
--

INSERT INTO `integrante` (`id`, `nombre`, `cargo`, `descripcion`, `imagen`) VALUES
(1, 'Juan Gabrielo', 'Artista grafico', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt', 'model-gdc5d0aad1_1280.jpg'),
(2, 'Maria', 'Programador', 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful', 'naomi-scott-4k-large-for-desktop-wallpaper-preview.jpeg'),
(3, 'Eduardo', 'Artista grafico', 'or again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy', '6GCOIWKVBZEOZL5TDFMY65TAYQ.jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `titulo` varchar(50) NOT NULL,
  `texto` text NOT NULL,
  `id` int(255) NOT NULL,
  `imagenURL` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `noticias`
--

INSERT INTO `noticias` (`titulo`, `texto`, `id`, `imagenURL`) VALUES
('Noticia 1.1', 'noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 noticia 1 ', 1, 'books-g88b34204c_1280.jpg'),
('Noticia 2', '\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 'IMG_9829.jpg'),
('Noticia 3', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt', 3, 'portada_1.jpg'),
('Noticia 4', 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore', 4, '211129125007-covid-variant-omicron-impact-international-travel-plans-112721-medium-tease.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obras`
--

CREATE TABLE `obras` (
  `id` int(255) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `ulr` text NOT NULL,
  `id_DelArtista` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `obras`
--

INSERT INTO `obras` (`id`, `nombre`, `descripcion`, `ulr`, `id_DelArtista`) VALUES
(1, 'exd', 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and de', '13.jpg', 3),
(2, 'Nueva 2x', 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and de', 'obras_gratis_05.jpg', 2),
(1, 'Nueva x 1', 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and de', 'portada_1.jpg', 2),
(3, 'Nueva x3', 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and de', '12.jpg', 2),
(1, 'Nueva xd', 'xd', 'GIRRAFE-IN-LANDSCAPE-1100x500-e1484733834484.png', 4),
(1, 'Numero 2', 'N123', '9k.png', 1),
(2, 'Prueba 2', 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and de', 'Z.png', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_Admin`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `artistas`
--
ALTER TABLE `artistas`
  ADD PRIMARY KEY (`id_Artistas`),
  ADD UNIQUE KEY `nombreArtista` (`nombreArtista`,`correo`);

--
-- Indices de la tabla `integrante`
--
ALTER TABLE `integrante`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `titulo` (`titulo`);

--
-- Indices de la tabla `obras`
--
ALTER TABLE `obras`
  ADD PRIMARY KEY (`nombre`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `id_DelArtista` (`id_DelArtista`) USING BTREE;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `obras`
--
ALTER TABLE `obras`
  ADD CONSTRAINT `obras_ibfk_1` FOREIGN KEY (`id_DelArtista`) REFERENCES `artistas` (`id_Artistas`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
