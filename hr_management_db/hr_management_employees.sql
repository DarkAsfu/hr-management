-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: hr_management
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `hire_date` date NOT NULL,
  `job_id` int NOT NULL,
  `salary` decimal(10,2) NOT NULL,
  `manager_id` int DEFAULT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `job_id` (`job_id`),
  KEY `manager_id` (`manager_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`),
  CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `employees` (`employee_id`),
  CONSTRAINT `employees_ibfk_3` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Saminur ','Rahman','samin@gmail.com','017777112564','2024-06-08',2,40550.00,NULL,2),(2,'Janem','Smith','jane.smith@example.com','555-5678','2019-03-21',2,60000.00,NULL,2),(3,'Alice','Johnson','alice.johnson@example.com','01882934812','2022-02-28',3,70000.00,1,3),(4,'Bob','Williams','bob.williams@example.com','111-222-3333','2022-04-01',2,55000.00,1,2),(5,'Emily','Brown','emily.brown@example.com','444-444-4444','2022-05-01',1,52000.00,1,1),(6,'Michael','Jones','michael.jones@example.com','+8801440952651','2022-05-31',2,72000.00,1,2),(7,'Jessica','Garcia','jessica.garcia@example.com','999-999-9999','2022-07-01',2,58000.00,1,2),(8,'David','Martinez','david.martinez@example.com','666-666-6666','2022-08-01',1,51000.00,1,1),(9,'Sophia','Hernandez','sophia.hernandez@example.com','222-333-4444','2022-09-01',3,73000.00,1,3),(11,'Mardia','Akter','mardiaakter18@gmail.com','0177777777','2024-06-19',3,250000.00,2,2),(12,'Saminur ','Rahman','saminur.rahman@gmail.com','0171117712','2024-05-16',2,20000.00,2,2),(13,'Md. Ashraful','Islam','ashraful.islam.asfu@gmail.com','01777112564','2024-05-30',2,25000.00,2,3),(48,'Md. Ashraful','Islam','mdashraful56bd@gmail.com','01777777','2024-06-19',2,5000.00,2,2),(50,'Md. Ashraful','islam','admin@gmail.com','01777112564','2024-06-14',1,6554.00,2,2),(52,'Md. Ashraful','Islam','ashraful.islam.asfu@gmail.com','01777112564','2024-05-30',2,25000.00,2,2),(54,'Mahady ','Hasan','mahady@gmail.com','01711111111','2024-05-31',3,10000.00,2,3),(61,'Faria','Nur','faria@gmail.com','015454545','2024-06-12',1,5000.00,NULL,1);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-11 20:33:31
