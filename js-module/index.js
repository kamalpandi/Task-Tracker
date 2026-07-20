import { readFile, writeFile } from "fs/promises";
import readline from "node:readline";


async function loadTaskListJSON() {
  const filePath = './data.json';
  const defaultJSON = {};

  try {
    const data = await readFile("./data.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("File not found created new one!");
      writeFile(filePath, JSON.stringify(defaultJSON, null, 2), "utf-8");
      return defaultJSON;
    }
    console.error("The file exists, but the JSON is corrupted.");
    throw error;
  }
}

const TaskStatus = Object.freeze({
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  DOONE: "done"
});

class Task {

  constructor(id, description, status, createdAt, updatedAt) {

    if (!Object.values(TaskStatus).includes(status)) {
      throw new Error(`Invalid status: ${status}. must be one of ${Object.values(TaskStatus).join(',')}`);
    }

    this.id = id;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    Object.freeze(this)
  };

}

class Commands {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }
  add(description) {
    const now = new Date().toLocaleTimeString();
    const newTask = new Task(this.nextId++, description, TaskStatus.TODO, now, now);
    this.tasks.push(newTask);
    return newTask;
  }
}

const manager = new Commands()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showHelp() {
  console.log(
    `
  Available Commands:
  add <description>                 - Add a new task
  list                              - List all tasks
  list <todo|in_progress|done>     - Filter tasks by status
  update <id> <status> [desc]       - Update status and optionally description
  delete <id>                       - Delete a task
  exit                              - Close the application
  `
  );
}

function startCLI() {
  console.log("Task Tracker: ");
  showHelp();

  rl.setPrompt("todo-CLI> ");
  rl.prompt();

  rl.on('line', (line) => {

    const input = line.trim();
    if (!Commands) {
      rl.prompt();
      return;
    }
    //console.log(input);
    if (input === "add") {
      console.log(input);
    }
    rl.prompt();

  });
}

startCLI();
