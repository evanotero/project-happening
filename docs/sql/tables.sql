# Create User Table
CREATE TABLE users (
     U_ID int NOT NULL AUTO_INCREMENT,
     FIRSTNAME VARCHAR (35) NOT NULL,
     LASTNAME VARCHAR (35) NOT NULL,
     USERNAME VARCHAR (35) NOT NULL, 
     EMAIL VARCHAR (320) NOT NULL, 
     PASSWORD CHAR(40) NOT NULL, 
     PRIV ENUM('admin', 'user', 'unverified') NOT NULL,
     UNIQUE (EMAIL),
     PRIMARY KEY (U_ID)
) engine=innodb;

insert into users (FIRSTNAME, LASTNAME, USERNAME, EMAIL, PASSWORD, PRIV) values ('Org', 'Sync', 'orgsync', 'oteroev@bc.edu', '30246a560dfa5906e2dbc886cb70734350f50a0f', 'admin');
insert into users (FIRSTNAME, LASTNAME, USERNAME, EMAIL, PASSWORD, PRIV) values ('Catherine', 'Anderson', 'canderson0', 'canderson0@imgur.com', 'g8m5j3061642w10t6vk2df7n482s3051mlrj9728', 'user');
insert into users (FIRSTNAME, LASTNAME, USERNAME, EMAIL, PASSWORD, PRIV) values ('Harold', 'Cook', 'hcook1', 'hcook1@pagesperso-orange.fr', 'f75ku5877owcztc2ind6ac4899d9ksn65p6qsppq', 'unverified');
insert into users (FIRSTNAME, LASTNAME, USERNAME, EMAIL, PASSWORD, PRIV) values ('Paula', 'Hayes', 'phayes2', 'phayes2@taobao.com', 'uo8o08v61wbsk71930bdx3f3306g18490ijw19po', 'unverified');
insert into users (FIRSTNAME, LASTNAME, USERNAME, EMAIL, PASSWORD, PRIV) values ('Kathleen', 'Bowman', 'kbowman3', 'kbowman3@etsy.com', '7icdegrul7x3pupye2otl68nf7k89h502u8f7gpd', 'user');

# Create Events Table
# Before inserting into table,
# convert org_id to group/club's name
CREATE TABLE events (
    E_ID int NOT NULL AUTO_INCREMENT,
    NAME VARCHAR(100) NOT NULL,
    ORGANIZER VARCHAR(70) NOT NULL,
    LOCATION VARCHAR(320) NOT NULL,
    DESCRIPTION VARCHAR(1000) NOT NULL,
    MEDIAURL VARCHAR(500),
    STARTDATE DATETIME NOT NULL, 
    ENDDATE DATETIME NOT NULL,
    LINK VARCHAR(500),
    APPROVED tinyint(1) DEFAULT 0 NOT NULL,
    UNIQUE (NAME),
    PRIMARY KEY (E_ID),
    FOREIGN KEY (U_ID) REFERENCES users(U_ID)
) engine=innodb;

insert into events (NAME, ORGANIZER, LOCATION, DESCRIPTION, MEDIAURL, STARTDATE, ENDDATE, LINK, APPROVED, U_ID) values ('lobortis sapien sapien non mi integer ac', 'Yakidoo', '6 Mariners Cove Crossing', 'rlynch0@wikispaces.com', 'http://dummyimage.com/169x171.gif/5fa2dd/ffffff', '2015-09-30 00:04:31', '2015-09-12 21:34:24', 'https://cyberchimps.com/neque.png', 1, 187);
insert into events (NAME, ORGANIZER, LOCATION, DESCRIPTION, MEDIAURL, STARTDATE, ENDDATE, LINK, APPROVED, U_ID) values ('sit amet nunc viverra dapibus nulla suscipit', 'Gabvine', '20467 Arizona Park', 'bcarroll1@cam.ac.uk', null, '2016-03-29 13:56:26', '2015-09-14 01:28:24', 'http://topsy.com/donec/odio.jpg', 0, 464);
insert into events (NAME, ORGANIZER, LOCATION, DESCRIPTION, MEDIAURL, STARTDATE, ENDDATE, LINK, APPROVED, U_ID) values ('lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum', 'Latz', '848 Hayes Park', 'jbaker2@arizona.edu', 'http://dummyimage.com/193x245.gif/ff4444/ffffff', '2015-05-06 15:22:38', '2016-07-07 15:23:38', 'http://vistaprint.com/sed.xml', 1, 449);
insert into events (NAME, ORGANIZER, LOCATION, DESCRIPTION, MEDIAURL, STARTDATE, ENDDATE, LINK, APPROVED, U_ID) values ('donec ut mauris eget massa tempor convallis nulla neque libero convallis eget', 'Meevee', '40862 Menomonie Place', 'rhernandez3@nationalgeographic.com', 'http://dummyimage.com/182x126.gif/5fa2dd/ffffff', '2015-05-25 20:07:48', '2016-02-12 04:04:47', 'http://uiuc.edu/ac/nulla/sed/vel/enim/sit/amet.json', 1, 364);
insert into events (NAME, ORGANIZER, LOCATION, DESCRIPTION, MEDIAURL, STARTDATE, ENDDATE, LINK, APPROVED, U_ID) values ('a odio in hac habitasse platea dictumst maecenas ut massa quis', 'Flipopia', '2427 Miller Hill', 'lmeyer4@shinystat.com', null, '2016-03-27 18:46:52', '2015-09-12 21:04:56', 'https://mysql.com/non/mauris.jpg', 1, 401);