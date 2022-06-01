--To Create the table

CREATE TABLE "employees" (
"id" SERIAL PRIMARY KEY,
"firstName" VARCHAR(80) NOT NULL,
"lastName" VARCHAR(80) NOT NULL,
"employeeId" INTEGER,
"jobTitle" VARCHAR(120) NOT NULL,
"annualSalary" INT NOT NULL
);

INSERT INTO "employees"
("firstName", "lastName", "employeeId", "jobTitle", "annualSalary")
VALUES
('Medea', 'Aigle', '123', 'Window Cleaner', '12000'),
('Althea', 'Pyrrhus', '456', 'Sales Associate', '35000'),
('Brontes', 'Orestes', '789', 'General Manager', '56000'),
('Anthea', 'Selena', '1011', 'CFO', '85000');