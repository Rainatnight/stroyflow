export type TaskStatus = "active" | "completed";

export class Task {
  // приват - только внутри самого класса
  // protected - внутри класса + наследники
  private id: string;
  private title: string;
  private status: TaskStatus = "active";

  constructor(title: string) {
    this.id = crypto.randomUUID();
    this.title = title;
  }

  toggle() {
    this.status = this.status === "active" ? "completed" : "active";
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getStatus() {
    return this.status;
  }
}

export class TaskManager {
  #tasks: Task[] = [];

  addTask(title: string) {
    const task = new Task(title);
    this.#tasks.push(task);
  }

  toggleTask(id: string) {
    const task = this.#tasks.find((t) => t.getId() === id);
    task?.toggle();
  }

  getTasks() {
    return this.#tasks;
  }
}
