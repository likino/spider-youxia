
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for games
-- ----------------------------
DROP TABLE IF EXISTS `games`;
CREATE TABLE `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '游戏名',
  `eName` varchar(255) DEFAULT NULL COMMENT '游戏英文名',
  `series` varchar(255) DEFAULT NULL COMMENT '游戏类型',
  `producter` varchar(255) DEFAULT NULL COMMENT '制作商',
  `distributer` varchar(255) DEFAULT NULL COMMENT '发行商',
  `time` varchar(255) DEFAULT NULL COMMENT '发行日期',
  `summary` varchar(255) DEFAULT NULL COMMENT '简介',
  `heat` int(11) DEFAULT NULL COMMENT '热度',
  `gameUrl` varchar(255) DEFAULT NULL COMMENT '游戏地址',
  `imgUrl` varchar(255) DEFAULT NULL COMMENT '封面地址',
  `youxiaPoint` float DEFAULT NULL COMMENT '游侠分数',
  `youxiaPointPeople` int(11) DEFAULT NULL COMMENT '游侠打分人数',
  `IGNPoint` float DEFAULT NULL COMMENT 'IGN分数',
  `GameSpotPoint` float DEFAULT NULL COMMENT 'GameSpot分数',
  `FAMIPoint` float DEFAULT NULL COMMENT 'FAMI分数',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21386 DEFAULT CHARSET=utf8;
