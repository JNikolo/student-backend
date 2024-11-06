const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;

const prisma = new PrismaClient();

app.get("/hola-mundo", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/students", async (req, res) => {
  let students = await prisma.student.findMany();
  if (req.query) {
    const params = Object.keys(req.query);
    const filteredtudents = students.filter((student) => {
      return params.every((param) => student[param] === req.query[param]);
    });
    res.json({ count: filteredtudents.length, result: filteredtudents });
  } else {
    res.json({ count: students.length, result: students });
  }
});

app.get("/students/:id", async (req, res) => {
  const id = req.params.id;
  const student = await prisma.student.findUnique({ where: { id: id } });
  if (student) {
    console.log(student);
    res.json({ message: `Student with id ${id} found`, result: student });
  } else {
    res.status(404).json({ message: `Student with id ${id} not found :c` });
  }
});

app.post("/students", async (req, res) => {
  console.log(req.body);
  const students = await prisma.student.create({ data: req.body });

  res.json({ message: "Student added", result: students });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
