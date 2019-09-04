SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- ########################################################## -- 
-- ########################################################## --

CREATE TABLE `unis` (
  `ID` bigint(20) NOT NULL,
  `slug` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

ALTER TABLE `unis`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `unis`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT;

-- ########################################################## -- 
-- ########################################################## --

CREATE TABLE `kk_app`.`unis_meta` ( 
`ID` BIGINT NOT NULL AUTO_INCREMENT , 
`_id` BIGINT NOT NULL , 
`_key` VARCHAR(100) NOT NULL , 
`_value` TEXT NOT NULL , 
`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , 
`updated_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL , 
PRIMARY KEY (`ID`), UNIQUE (`_id`, `_key`)
) ENGINE = InnoDB;

COMMIT;


