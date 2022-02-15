INSERT INTO department (dep_name)
VALUES
  ('Finances'),
  ('Marketing'),
  ('Engineering');

INSERT INTO emp_role (title, salary, department_id)
VALUES
  ('Administrator', 75000.00, 1),
  ('Manager', 50000.00, 2),
  ('Assistant Manager', 40000.00, 2),
  ('Engineer', 30000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Criste', 'Phillips', 2, 2),
  ('Diana', 'Taylor', 1, NULL),
  ('Maria', 'Tornabene', 4, 4),
  ('Andrew', 'Hartmann', 3, 1),
  ('Ruth', 'Hyde', 2, 2),
  ('Tanya', 'Harris', 4, 4),
  ('Victor', 'Taylor', 4, 4);