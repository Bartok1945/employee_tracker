----- DEPARTMENT SEEDS -----
INSERT INTO department (id, name)
VALUES (1, "Administration");

INSERT INTO department (id, name)
VALUES (2, "English");

INSERT INTO department (id, name)
VALUES (3, "Science");

INSERT INTO department (id, name)
VALUES (4, "Communications");

INSERT INTO department (id, name)
VALUES (5, "Music");



----- ROLE SEEDS -----
-- LEAD ROLES
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "University President", 130000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Provost", 140000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Dean", 110000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Vice Dean", 80000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Department Administrator", 150000, 5);

-- ALL OTHER ROLES
INSERT INTO role (id, title, salary, department_id)
VALUES (6, "Music Chair", 75000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "English Chair", 72000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, "Science Chair", 76000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (9, "Communications Chair", 74000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (10, "Full Professor", 60000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (11, "Assistant Professor", 50000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (12, "Administrator", 48000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (13, "Administrative Assistant", 30000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (14, "Adjunct Professor", 12000, 5);


----- EMPLOYEE SEEDS -----
-- LEAD EMPLOYEES
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(1, "Count", "Ravioli", 1, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(2, "Cowabunga", "Peppermill", 2, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(3, "Tommy", "Coconuts", 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(4, "Greg", "Mindpretzel", 4, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(5, "Ditcher", "Dumas", 5, null);

-- ALL OTHER EMPLOYEES
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(6, "Doreen", "Hammer", 6, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(7, "Holden", "Afart", 7, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(8, "Luigi", "Brothers", 8, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(9, "Judy", "Prosciutto", 9, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(10, "Dusty", "Chiggins", 10, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(11, "Major", "Morty", 11, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(12, "Tammy", "Turlet", 12, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(13, "Mark", "Juggins", 13, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(14, "Amy", "Rockfeller", 14, 5);