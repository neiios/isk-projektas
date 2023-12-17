INSERT INTO isk_projektas_subjects (id, name)
VALUES (1, 'Matematika'),
       (2, 'Fizika'),
       (3, 'Biologija'),
       (4, 'Chemija'),
       (5, 'Istorija'),
       (6, 'Geografija'),
       (7, 'Lietuvių kalba'),
       (8, 'Anglų kalba'),
       (9, 'Vokiečių kalba'),
       (10, 'Informatika');


INSERT INTO isk_projektas_user (id, name, email, emailVerified, image, accountType, phoneNumber, description,
                                pricePerHour,
                                isAvailable)
VALUES ('tutor01', 'Jonas Kazlauskas', 'jonaskazlauskas@sgf.lt', '2023-01-03 00:00:00', NULL,
        'tutor', '+37060001001', 'Įvairių lygių matematikos mokytojas', 11, 1),
       ('tutor02', 'Eglė Jankauskaitė', 'eglejankauskaite@sgf.lt', '2023-01-04 00:00:00', NULL,
        'tutor', '+37060002002', 'Anglų kalbos mokytoja su tarptautine patirtimi', 12, 1),
       ('tutor03', 'Tomas Petrauskas', 'tomaspetrauskas@sgf.lt', '2023-01-05 00:00:00', NULL,
        'tutor', '+37060003003', 'Biologijos ir chemijos ekspertas', 15, 1),
       ('tutor04', 'Alex Smith', 'alexsmith@sgf.lt', '2023-01-01 00:00:00', NULL, 'tutor',
        '+37060004004', 'Experienced Math tutor', 20, 1),
       ('tutor05', 'Maria Garcia', 'mariagarcia@sgf.lt', '2023-01-02 00:00:00', NULL, 'tutor',
        '+37060005005', 'Physics tutor with 5 years of teaching', 20, 1),
       ('tutor06', 'Ieva Navickaitė', 'ievanavickaite@sgf.lt', '2023-01-06 00:00:00', NULL, 'tutor',
        '+37060006006', 'Istorijos mokytoja, orientuota į mokyklinę programą', 8, 1);


INSERT INTO isk_projektas_user_languages (userId, language)
VALUES ('tutor01', 'Lietuvių'), -- Jonas Kazlauskas speaks Lithuanian
       ('tutor01', 'Anglų'),    -- Jonas Kazlauskas also speaks English
       ('tutor02', 'Anglų'),    -- Eglė Jankauskaitė speaks English
       ('tutor02', 'Lietuvių'), -- Eglė Jankauskaitė also speaks Lithuanian
       ('tutor03', 'Lietuvių'), -- Tomas Petrauskas speaks Lithuanian
       ('tutor03', 'Rusų'),     -- Tomas Petrauskas also speaks Russian
       ('tutor04', 'Anglų'),    -- Alex Smith speaks English
       ('tutor05', 'Anglų'),    -- Maria Garcia speaks English
       ('tutor05', 'Lenkų'),    -- Maria Garcia also speaks Polish
       ('tutor06', 'Lietuvių'), -- Ieva Navickaitė speaks Lithuanian
       ('tutor06', 'Rusų'); -- Ieva Navickaitė also speaks Russian


INSERT INTO isk_projektas_user_study_type (userId, studyType)
VALUES ('tutor01', 'Kontaktiniu'), -- Jonas Kazlauskas offers contact study
       ('tutor01', 'Nuotoliu'),    -- Jonas Kazlauskas also offers distance study
       ('tutor02', 'Nuotoliu'),    -- Eglė Jankauskaitė offers distance study
       ('tutor03', 'Kontaktiniu'), -- Tomas Petrauskas offers contact study
       ('tutor04', 'Nuotoliu'),    -- Alex Smith offers distance study
       ('tutor04', 'Kontaktiniu'), -- Alex Smith also offers contact study
       ('tutor05', 'Kontaktiniu'), -- Maria Garcia offers contact study
       ('tutor06', 'Nuotoliu'),    -- Ieva Navickaitė offers distance study
       ('tutor06', 'Kontaktiniu'); -- Ieva Navickaitė also offers contact study


INSERT INTO isk_projektas.isk_projektas_user_subjects (userId, subjectId)
VALUES ('tutor01', 1), -- Jonas Kazlauskas teaches Matematika
       ('tutor02', 8), -- Eglė Jankauskaitė teaches Anglų kalba
       ('tutor03', 3), -- Tomas Petrauskas teaches Biologija
       ('tutor03', 4), -- Tomas Petrauskas also teaches Chemija
       ('tutor04', 1), -- Alex Smith teaches Matematika
       ('tutor05', 2), -- Maria Garcia teaches Fizika
       ('tutor06', 5); -- Ieva Navickaitė teaches Istorija
