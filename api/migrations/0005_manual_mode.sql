ALTER TABLE plants ADD `manualMode` TINYINT(1) NOT NULL DEFAULT 0 AFTER `pushToken`;
ALTER TABLE plants ADD `manualLight` TINYINT(1) NOT NULL DEFAULT 0 AFTER `manualMode`;
ALTER TABLE plants ADD `manualWater` INT NOT NULL DEFAULT 0 AFTER `manualLight`;
