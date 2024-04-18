import { Request, Response } from "express";

const todos = [
  {
    id: 1,
    text: "Teste",
    completedAt: new Date(),
  },
  {
    id: 2,
    text: "XD",
    completedAt: null,
  },
  {
    id: 3,
    text: "Dog",
    completedAt: new Date(),
  },
];

export class TodosController {
  constructor() {}

  public getTodos(req: Request, res: Response) {
    res.json(todos);
  }

  public getTodoById(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const todo = todos.find((t) => t.id === id);

    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  }

  public createTodo(req: Request, res: Response) {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const newTodo = todos.push({
      id: todos.length + 1,
      text: text,
      completedAt: new Date(),
    });

    res.json({ newTodo });
  }

  public updateTodo(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id) || !id) return res.status(400).json({ error: "Invalid id" });

    const todo = todos.find((t) => t.id === id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    const { text, completedAt } = req.body;
    todo.text = text || todo.text;
    if (completedAt === null) {
      todo.completedAt = null;
    } else {
      todo.completedAt = new Date(completedAt || todo.completedAt);
    }

    res.json({ todo });
  }

  public deleteTodo(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id) || !id) return res.status(400).json({ error: "Invalid id" });

    const todo = todos.find((t) => t.id === id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    
    todos.splice(todos.indexOf(todo), 1);
    res.json({ todo });
  }
}
