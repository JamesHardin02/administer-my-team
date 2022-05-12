INSERT INTO department (name)
VALUES
  ('Front-End Development'),
  ('Back-End Development'),
  ('Project Management'),
  ('Marketing'),
  ('HR');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Front-End Developer', 80000, 1),
  ('Front-End Executive Manager', 100000, 1),
  ('Back-End Developer', 85000, 2),
  ('Back-End Executive Manager', 100000, 2),
  ('Front-End Project Manager', 80000, 3),
  ('Back-End Project Manager', 90000, 3),
  ('Marketing Project Manager', 90000, 3),
  ('Chief Project Manager', 90000, 3),
  ('Social Media Marketer', 80000, 4),
  ('SEO Specialist', 80000, 4),
  ('Executive Marketing Manager', 100000, 4),
  ('HR Specialist', 75000, 5),
  ('HR Manager', 100000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Peter', 'Greenaway', 2, NULL),
  ('James', 'Fraser', 1, 1),
  ('Jack', 'London', 1, 1),
  ('Robert', 'Bruce', 1, 1),
  ('Sandy', 'Powell', 4, NULL),
  ('Derek', 'Jarman', 3, 5),
  ('Paolo', 'Pasolini', 3, 5),
  ('Heathcote', 'Williams', 3, 5),
  ('Samuel', 'Delany', 8, NULL),
  ('Emil', 'Zola', 5, 9),
  ('Sissy', 'Coalpits', 6, 9),
  ('Antoinette', 'Capet', 7, 9),
  ('John', 'Dryden', 11, NULL),
  ('Tony', 'Duvert', 9, 13),
  ('Dennis', 'Cooper', 9, 13),
  ('Monica', 'Bellucci', 10, 13),
  ('Aubrey', 'Beardsley', 13, NULL),
  ('Alexander', 'Pope', 12, 17),
  ('Lionel', 'Johnson', 12, 17);