INSERT INTO STUDENT(USER_ID,NAME,SURNAME,ADDRESS,DATE_OF_BIRTH,EMAIL,PASSWORD) VALUES (0,'Andrea', 'Rubiolo', 'Via Roma 3', '1996-12-25', 's0000@studenti.polito.it', 'password');
INSERT INTO STUDENT(USER_ID,NAME,SURNAME,ADDRESS,DATE_OF_BIRTH,EMAIL,PASSWORD) VALUES (1,'Sofia', 'Munari', 'Corso Inghilterra 24', '1997-02-13', 's0001@studenti.polito.it', 'password');
INSERT INTO STUDENT(USER_ID,NAME,SURNAME,ADDRESS,DATE_OF_BIRTH,EMAIL,PASSWORD) VALUES (2,'Fiorentino', 'Cairone', 'Corso Re Umberto 39', '1994-08-27', 's0002@studenti.polito.it', 'password');
INSERT INTO STUDENT(USER_ID,NAME,SURNAME,ADDRESS,DATE_OF_BIRTH,EMAIL,PASSWORD) VALUES (3,'Peng', 'Cao', 'Corso Stati Uniti 1', '1995-01-08', 's0003@studenti.polito.it', 'password');
INSERT INTO STUDENT(USER_ID,NAME,SURNAME,ADDRESS,DATE_OF_BIRTH,EMAIL,PASSWORD) VALUES (4,'Silvio', 'Girolami', 'Via Roma 38', '1997-10-30', 's0004@studenti.polito.it', 'password');
INSERT INTO STUDENT(USER_ID,NAME,SURNAME,ADDRESS,DATE_OF_BIRTH,EMAIL,PASSWORD) VALUES (5,'Tony', 'Saliba', 'Corso Galileo Ferraris 19', '1995-04-01', 'tony.y.saliba00@gmail.com', 'password');


INSERT INTO PROFESSOR(USER_ID,NAME,SURNAME,ADDRESS,EMAIL,PASSWORD) VALUES (0, 'Marco', 'Torchiano', 'Corso Duca degli Abruzzi 8', 'p0000@polito.it', 'password');
INSERT INTO PROFESSOR(USER_ID,NAME,SURNAME,ADDRESS,EMAIL,PASSWORD) VALUES (1, 'Giorgio', 'Bruno', 'Corso Galileo Ferraris 89', 'p0001@polito.it', 'password');
INSERT INTO PROFESSOR(USER_ID,NAME,SURNAME,ADDRESS,EMAIL,PASSWORD) VALUES (2, 'Gianpiero', 'Cabodi', 'Corso Inghilterra 16' , 'p0002@polito.it', 'password');
INSERT INTO PROFESSOR(USER_ID,NAME,SURNAME,ADDRESS,EMAIL,PASSWORD) VALUES (3, 'Antonio', 'Lioy', 'Via Roma 45', 'p0003@polito.it', 'password');

INSERT INTO COURSE(COURSE_ID,NAME,DESCRIPTIONS) VALUES (0, 'Software Engineering II', '');
INSERT INTO COURSE(COURSE_ID,NAME,DESCRIPTIONS) VALUES (1, 'Ingegneria del Software', '');
INSERT INTO COURSE(COURSE_ID,NAME,DESCRIPTIONS) VALUES (2, 'Programmazione di Sistema', '');
INSERT INTO COURSE(COURSE_ID,NAME,DESCRIPTIONS) VALUES (3, 'Information System Security', '');
INSERT INTO COURSE(COURSE_ID,NAME,DESCRIPTIONS) VALUES (4, 'Algoritmi e Programmazione', '');
INSERT INTO COURSE(COURSE_ID,NAME,DESCRIPTIONS) VALUES (5, 'Programmazione ad Oggetti', '');
INSERT INTO COURSE(COURSE_ID,NAME,DESCRIPTIONS) VALUES (6, 'Cybersecurity', '');


INSERT INTO COURSE_PROFESSOR(USER_ID, COURSE_ID) VALUES (0,0);
INSERT INTO COURSE_PROFESSOR(USER_ID, COURSE_ID) VALUES (1,1);
INSERT INTO COURSE_PROFESSOR(USER_ID, COURSE_ID) VALUES (2,2);
INSERT INTO COURSE_PROFESSOR(USER_ID, COURSE_ID) VALUES (3,3);
INSERT INTO COURSE_PROFESSOR(USER_ID, COURSE_ID) VALUES (2,4);
INSERT INTO COURSE_PROFESSOR(USER_ID, COURSE_ID) VALUES (0,5);
INSERT INTO COURSE_PROFESSOR(USER_ID, COURSE_ID) VALUES (3,6);

INSERT INTO COURSE_STUDENT(USER_ID,COURSE_ID) VALUES (0,0);
INSERT INTO COURSE_STUDENT(USER_ID,COURSE_ID) VALUES (0,2);
INSERT INTO COURSE_STUDENT(USER_ID,COURSE_ID) VALUES (0,3);
INSERT INTO COURSE_STUDENT(USER_ID,COURSE_ID) VALUES (1,4);
INSERT INTO COURSE_STUDENT(USER_ID,COURSE_ID) VALUES (1,6);
INSERT INTO COURSE_STUDENT(USER_ID,COURSE_ID) VALUES (2,5);
INSERT INTO COURSE_STUDENT(USER_ID,COURSE_ID) VALUES (3,1);
INSERT INTO COURSE_STUDENT(USER_ID,COURSE_ID) VALUES (3,0);
INSERT INTO COURSE_STUDENT(USER_ID,COURSE_ID) VALUES (4,3);
INSERT INTO COURSE_STUDENT(USER_ID,COURSE_ID) VALUES (4,2);
INSERT INTO COURSE_STUDENT(USER_ID,COURSE_ID) VALUES (4,4);
INSERT INTO COURSE_STUDENT(USER_ID,COURSE_ID) VALUES (5,6);
INSERT INTO COURSE_STUDENT(USER_ID,COURSE_ID) VALUES (5,5);


INSERT INTO ROOM(ROOM_ID,NUMBER_OF_SEAT,NAME) VALUES (0,150,'Room 1');
INSERT INTO ROOM(ROOM_ID,NUMBER_OF_SEAT,NAME) VALUES (1,10,'Room 3s');
INSERT INTO ROOM(ROOM_ID,NUMBER_OF_SEAT,NAME) VALUES (2,250,'Aula Magna');
INSERT INTO ROOM(ROOM_ID,NUMBER_OF_SEAT,NAME) VALUES (3,100,'Room 5');
INSERT INTO ROOM(ROOM_ID,NUMBER_OF_SEAT,NAME) VALUES (4,70,'Room 7i');


INSERT INTO LECTURE(LECTURE_ID,NUMBER_OF_LESSON,COURSE_ID,USER_ID,REMOTLY,DATE,DURATION,PROGRAM_DETAILS,ROOM_ID) VALUES (0,1,0,0,FALSE,'2020-11-30 10:00',180,'',0);
INSERT INTO LECTURE(LECTURE_ID,NUMBER_OF_LESSON,COURSE_ID,USER_ID,REMOTLY,DATE,DURATION,PROGRAM_DETAILS,ROOM_ID) VALUES (1,2,0,0,TRUE,'2020-12-02 12:30',180,'',0);
INSERT INTO LECTURE(LECTURE_ID,NUMBER_OF_LESSON,COURSE_ID,USER_ID,REMOTLY,DATE,DURATION,PROGRAM_DETAILS,ROOM_ID) VALUES (2,1,1,1,FALSE,'2020-12-03 14:00',180,'',1);
INSERT INTO LECTURE(LECTURE_ID,NUMBER_OF_LESSON,COURSE_ID,USER_ID,REMOTLY,DATE,DURATION,PROGRAM_DETAILS,ROOM_ID) VALUES (3,1,2,2,TRUE,'2020-11-30 10:00',180,'',2);
INSERT INTO LECTURE(LECTURE_ID,NUMBER_OF_LESSON,COURSE_ID,USER_ID,REMOTLY,DATE,DURATION,PROGRAM_DETAILS,ROOM_ID) VALUES (4,2,2,2,FALSE,'2020-12-01 08:00',90,'',3);
INSERT INTO LECTURE(LECTURE_ID,NUMBER_OF_LESSON,COURSE_ID,USER_ID,REMOTLY,DATE,DURATION,PROGRAM_DETAILS,ROOM_ID) VALUES (5,1,3,3,FALSE,'2020-12-03 16:30',90,'',4);
INSERT INTO LECTURE(LECTURE_ID,NUMBER_OF_LESSON,COURSE_ID,USER_ID,REMOTLY,DATE,DURATION,PROGRAM_DETAILS,ROOM_ID) VALUES (6,2,3,3,FALSE,'2020-12-04 14:00',90,'',1);
INSERT INTO LECTURE(LECTURE_ID,NUMBER_OF_LESSON,COURSE_ID,USER_ID,REMOTLY,DATE,DURATION,PROGRAM_DETAILS,ROOM_ID) VALUES (7,1,4,2,FALSE,'2020-11-30 14:00',90,'',2);
INSERT INTO LECTURE(LECTURE_ID,NUMBER_OF_LESSON,COURSE_ID,USER_ID,REMOTLY,DATE,DURATION,PROGRAM_DETAILS,ROOM_ID) VALUES (8,1,5,0,TRUE,'2020-12-02 10:00',180,'',0);
INSERT INTO LECTURE(LECTURE_ID,NUMBER_OF_LESSON,COURSE_ID,USER_ID,REMOTLY,DATE,DURATION,PROGRAM_DETAILS,ROOM_ID) VALUES (9,2,5,0,FALSE,'2020-12-03 12:30',90,'',0);
INSERT INTO LECTURE(LECTURE_ID,NUMBER_OF_LESSON,COURSE_ID,USER_ID,REMOTLY,DATE,DURATION,PROGRAM_DETAILS,ROOM_ID) VALUES (10,3,5,0,FALSE,'2020-12-07 14:00',90,'',4);
INSERT INTO LECTURE(LECTURE_ID,NUMBER_OF_LESSON,COURSE_ID,USER_ID,REMOTLY,DATE,DURATION,PROGRAM_DETAILS,ROOM_ID) VALUES (11,1,6,3,TRUE,'2020-11-30 14:00',90,'',1);


INSERT INTO HOLIDAY(HOLIDAY_ID,DATE) VALUES (0, '2020-12-08 00:00');




