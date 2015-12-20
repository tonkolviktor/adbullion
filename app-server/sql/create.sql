CREATE TABLE IF NOT EXISTS `viktorTonkol_sales` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `orderId` varchar(10) NOT NULL,
  `fullname` varchar(250) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(30) NOT NULL,
  `state` varchar(30) NOT NULL,
  `country` varchar(30) NOT NULL,
  `product` varchar(20) NOT NULL,
  `shipping` varchar(20) NOT NULL,
  `total` varchar(20) NOT NULL,
  `acceptedTerms` BIT NOT NULL,
  `dateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
