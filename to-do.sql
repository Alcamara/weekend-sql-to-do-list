CREATE TABLE "to-do" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(124) NOT NULL,
	"isDone" BOOLEAN DEFAULT false
);

INSERT INTO "to-do" (task, "isDone")
VALUES('Take out the trash', default);

INSERT INTO "to-do" (task, "isDone")
VALUES('Wash dishes', default), ('Walk the dog', default),
('Get milk at the bodega',default);