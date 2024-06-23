const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();
const port = 3001;
const dataFile = "src/data/projects.json";

app.use(cors());
app.use(express.json());

const readData = () => {
  const data = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// Helper function to calculate elapsed days
const calculateElapsedDays = (startDate, currentDate) => {
  const start = new Date(startDate);
  const current = new Date(currentDate);
  const diffTime = Math.abs(current - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Helper function to calculate daily cost (10% of starting budget)
const calculateDailyCost = (startingBudget) => {
  return startingBudget * 0.1; // 10% of starting budget
};

// Update current cost and check conditions
const updateProjectCost = (project) => {
  const elapsedDays = calculateElapsedDays(project.startDate, new Date());
  const dailyCost = calculateDailyCost(project.startingBudget);
  const totalCost = dailyCost * elapsedDays;
  project.currentCost = totalCost;

  // Check if project exceeds budget 
  if (totalCost > project.startingBudget) {
    project.status = "Exceeds Budget";
  }

  if (totalCost > project.startingBudget * 1.5) {
    project.status = "Forced Closure - Exceeds 50% Budget";
    project.completed = true;
  }
};

// GET all projects endpoint
app.get("/projects", (req, res) => {
  const projects = readData();
  projects.forEach(updateProjectCost); // Update each project's current cost
  writeData(projects); // Write updated projects back to file
  res.json(projects);
});

// GET project by ID endpoint
app.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  const projects = readData();
  const project = projects.find((p) => p.id === +id);
  if (project) {
    updateProjectCost(project); // Update the specific project's current cost
    writeData(projects); // Write updated projects back to file
    res.json(project);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
});

// POST new project endpoint
app.post("/projects", (req, res) => {
  const { name, status, description, startingBudget } = req.body;
  const projects = readData();
  const newProject = {
    id: uuidv4(),
    name,
    status,
    description,
    startingBudget,
    startDate: new Date().toISOString().split("T")[0], // Set current date as start date
    currentCost: 0,
    completed: false,
  };
  projects.push(newProject);
  writeData(projects);
  res.status(201).json(newProject);
});

// PUT update project endpoint
app.put("/projects/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const projects = readData();
    const project = projects.find((p) => p.id === +id);
    if (project) {
      project.status = status;
      updateProjectCost(project); // Update project's current cost
      writeData(projects);
      res.json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
