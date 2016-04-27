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
    STARTDATE Date NOT NULL, 
    ENDDATE Date NOT NULL,
    LINK VARCHAR(500),
    APPROVED tinyint(1) DEFAULT 0 NOT NULL,
    UNIQUE (NAME),
    PRIMARY KEY (E_ID),
    FOREIGN KEY (U_ID) REFERENCES users(U_ID)
) engine=innodb;
