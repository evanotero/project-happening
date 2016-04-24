# Create User Table
CREATE TABLE users (
     FIRSTNAME VARCHAR (35) NOT NULL,
     LASTNAME VARCHAR (35) NOT NULL,
     USERNAME VARCHAR (35) NOT NULL, 
     EMAIL VARCHAR (320) NOT NULL, 
     PASSWORD CHAR(40) NOT NULL, 
     PRIV ENUM('admin', 'user', 'unverified') NOT NULL,
     UNIQUE (EMAIL)
);

# Create Events Table
# Before inserting into table,
# convert org_id to group/club's name
CREATE TABLE events (
    ID VARCHAR(10) NOT NULL,
    NAME VARCHAR(100) NOT NULL,
    GROUP VARCHAR(70),
    LOCATION VARCHAR(320),
    DESCRIPTION VARCHAR(1000),
    RSVPS INT,
    MEDIAURL VARCHAR(500),
    STARTDATE Date NOT NULL, 
    ENDDATE Date NOT NULL,
    LINK VARCHAR(500),
    UNIQUE (NAME)
);

