"use client";

import { useState } from "react";
import { TaskManager } from "./helpers";

export default function Page() {
  const [manager] = useState(() => new TaskManager());
  const [, forceUpdate] = useState(0);
  const [input, setInput] = useState("");

  const test = useState(0);
  const testSet = test[1];

  const addTask = () => {
    if (!input.trim()) return;
    manager.addTask(input);
    setInput("");
    forceUpdate((x) => x + 1);
  };

  const toggleTask = (id: string) => {
    manager.toggleTask(id);
    forceUpdate((x) => x + 1);
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Task Manager (ООП + React)</h1>
      <p>{test[0]}</p>
      <button
        onClick={() => {
          testSet((prev) => prev + 1);
        }}
      >
        click
      </button>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul style={{ marginTop: 20 }}>
        {manager.getTasks().map((task) => (
          <li
            key={task.getId()}
            onClick={() => toggleTask(task.getId())}
            style={{
              cursor: "pointer",
              textDecoration:
                task.getStatus() === "completed" ? "line-through" : "none",
            }}
          >
            {task.getTitle()}
          </li>
        ))}
      </ul>
    </div>
  );
}
