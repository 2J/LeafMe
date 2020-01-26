-- Tables

CREATE DATABASE  IF NOT EXISTS `leafme`;
USE `leafme`;

CREATE TABLE users (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(100) DEFAULT NULL,
	`email` varchar(100) DEFAULT NULL,
	`password` varchar(200) DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE devices (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`userId` int(11) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE plants (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`deviceId` int(11) NOT NULL,
	`name` varchar(200) DEFAULT NULL,
	`description` varchar(400) DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE lightingSchedules (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`plantId` int(11) NOT NULL,
	`time` datetime NOT NULL,
	`length` int NOT NULL,
	`repeatDays` int DEFAULT NULL,
	`repeatEndDate` datetime DEFAULT NULL,
	`active` tinyint(1) DEFAULT 1,
	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE wateringSchedules (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`plantId` int(11) NOT NULL,
	`time` datetime NOT NULL,
	`amount` int NOT NULL,
	`repeatDays` int DEFAULT NULL,
	`repeatEndDate` datetime DEFAULT NULL,
	`active` tinyint(1) DEFAULT 1,
	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE sensorReadings (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`plantId` int(11) NOT NULL,
	`time` datetime NOT NULL,
	`type` varchar(100) NOT NULL,
	`value` float NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Populate Tables

INSERT INTO users (`id`, `name`, `email`, `password`)
VALUES (1, 'Justin', 'jj@jj.ai', 'password');

INSERT INTO devices (`id`, `userId`)
VALUES (1, 1);

INSERT INTO plants (`id`, `deviceId`, `name`, `description`)
VALUES (1, 1, 'Planter', 'Grows plants');

INSERT INTO lightingSchedules (`plantId`, `time`, `length`, `repeatDays`)
VALUES (1, '2020-01-20 12:00:00', 180, 1);

INSERT INTO lightingSchedules (`plantId`, `time`, `length`, `repeatDays`)
VALUES (1, '2020-01-21 19:00:00', 30, 3);

INSERT INTO wateringSchedules (`plantId`, `time`, `amount`, `repeatDays`)
VALUES (1, '2020-01-20 13:00:00', 30, 3);

INSERT INTO sensorReadings (`plantId`, `time`, `type`, `value`)
VALUES (1, '2020-01-23 12:00:00', 'SOIL_MOISTURE', 10.34);

INSERT INTO sensorReadings (`plantId`, `time`, `type`, `value`)
VALUES (1, '2020-01-23 12:00:00', 'BRIGHTNESS', 240);

INSERT INTO sensorReadings (`plantId`, `time`, `type`, `value`)
VALUES (1, '2020-01-23 12:00:00', 'AMBIENT_TEMPERATURE', 20.4);

INSERT INTO sensorReadings (`plantId`, `time`, `type`, `value`)
VALUES (1, '2020-01-23 12:00:00', 'AMBIENT_HUMIDITY', 2.5);

INSERT INTO sensorReadings (`plantId`, `time`, `type`, `value`)
VALUES (1, '2020-01-24 12:00:00', 'SOIL_MOISTURE', 10.32);

INSERT INTO sensorReadings (`plantId`, `time`, `type`, `value`)
VALUES (1, '2020-01-24 12:00:00', 'BRIGHTNESS', 242);

INSERT INTO sensorReadings (`plantId`, `time`, `type`, `value`)
VALUES (1, '2020-01-24 12:00:00', 'AMBIENT_TEMPERATURE', 20.2);

INSERT INTO sensorReadings (`plantId`, `time`, `type`, `value`)
VALUES (1, '2020-01-24 12:00:00', 'AMBIENT_HUMIDITY', 2.2);
