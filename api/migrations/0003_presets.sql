CREATE TABLE presets (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`type` varchar(400) NOT NULL,
	`name` varchar(400) NOT NULL,
	`lightingLength` int NOT NULL,
	`lightingRepeat` int NOT NULL,
	`wateringAmount` int NOT NULL,
	`wateringRepeat` int NOT NULL,
	`temperatureMin` int NOT NULL,
	`temperatureMax` int NOT NULL,
	`humidityMin` int NOT NULL,
	`humidityMax` int NOT NULL,
	`pictureUrl` varchar(400) NULL,
	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO presets 
(
	`type`,
	`name`,
	`lightingLength`,
	`lightingRepeat`,
	`wateringAmount`,
	`wateringRepeat`,
	`temperatureMin`,
	`temperatureMax`,
	`humidityMin`,
	`humidityMax`,
	`pictureUrl`
)
VALUES
('PEPPER','Habanero Pepper',180,1,80,2,17,24,30,45,''),
('PEPPER','Thai Pepper',180,1,80,2,17,24,30,45,''),
('FRUIT_VEG','Tomato',180,1,80,2,17,24,30,45,''),
('FRUIT_VEG','Strawberry',180,1,80,2,17,24,30,45,''),
('FRUIT_VEG','Blueberry',180,1,80,2,17,24,30,45,''),
('FRUIT_VEG','Carrot',180,1,80,2,17,24,30,45,''),
('ROOT_VEG','Sweet Potato',180,1,80,2,17,24,30,45,''),
('ROOT_VEG','Potato',180,1,80,2,17,24,30,45,''),
('HERB','Basil',180,1,80,2,17,24,30,45,''),
('HERB','Mint',180,1,80,2,17,24,30,45,''),
('HERB','Thyme',180,1,80,2,17,24,30,45,''),
('LEGUME','Green Beans',180,1,80,2,17,24,30,45,''),
('LEGUME','Kidney Beans',180,1,80,2,17,24,30,45,'')
