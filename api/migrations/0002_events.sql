CREATE TABLE lightingEvents (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`plantId` int NOT NULL,
	`lightingScheduleId` int NULL,
	`startTime` datetime NOT NULL,
	`length` int NOT NULL,
	`finished` tinyint(1) DEFAULT 1,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`plantId`) REFERENCES plants (`id`)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (`lightingScheduleId`) REFERENCES lightingSchedules (`id`)
		ON DELETE CASCADE
		ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE wateringEvents (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`plantId` int NOT NULL,
	`wateringScheduleId` int NULL,
	`startTime` datetime NOT NULL,
	`amount` int NOT NULL,
	`finished` tinyint(1) DEFAULT 1,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`plantId`) REFERENCES plants (`id`)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (`wateringScheduleId`) REFERENCES wateringSchedules (`id`)
		ON DELETE CASCADE
		ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
