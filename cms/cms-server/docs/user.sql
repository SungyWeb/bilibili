/*
 Navicat MySQL Data Transfer

 Source Server         : cms
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : localhost:3306
 Source Schema         : cms

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 09/09/2020 22:36:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `gender` tinyint NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'vv', '123456', 'zhangsan@126.com', '13812341234', 1);
INSERT INTO `user` VALUES (2, '李四', '123456', 'lisi@126.com', '13912341234', 0);
INSERT INTO `user` VALUES (3, 'sungy', '123456', 'sungy@126.com', '13512341234', 1);
INSERT INTO `user` VALUES (5, 'sungy', '123456', 'sungy@126.com', '13512341234', 1);
INSERT INTO `user` VALUES (6, 'sungy', '123456', 'sungy@126.com', '13512341234', 1);
INSERT INTO `user` VALUES (7, 'sungy', '123456', 'sungy@126.com', '13512341234', 1);
INSERT INTO `user` VALUES (8, '阿斯蒂芬', '123456', 'sungy@126.com', '13512341234', 1);

SET FOREIGN_KEY_CHECKS = 1;
