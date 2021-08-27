-- Users table seeds
-- password is encrypted version of the word "passsword"

INSERT INTO users (name, email, password)
VALUES ('Alice Monte', 'alice_monte@gmail.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
('Kira Tang', 'kira_tang@hotmail.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO'),
('Mike Lombard', 'mike_lombard@yahoo.com', '$2b$12$.2vVylqGad3yoFZRjJ5js.PBsj62a3tAcz0c1i/Lw7pjqQnfalkyO');
