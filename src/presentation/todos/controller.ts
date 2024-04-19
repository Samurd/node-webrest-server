import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

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

  public async getTodos(req: Request, res: Response) {
    const todos = await prisma.todos.findMany();
    res.json(todos);
  }

  public async getTodoById(req: Request, res: Response) {
    const id = req.params.id;

    const todo = await prisma.todos.findUnique({ where: { id: id } });

    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  }

  public async createTodo(req: Request, res: Response) {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if(error) return res.status(400).json({ error });

    const todo = await prisma.todos.create({
      data: createTodoDto!,
    });

    res.json(todo);
  }

  public async updateTodo(req: Request, res: Response) {
    const id = req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      id,
      ...req.body,
    });

    if(error) return res.status(400).json({ error });

    const todo = await prisma.todos.findUnique({ where: { id: id } });
    if (!todo) return res.status(404).json({ error: "Todo not found" });


    const updatedTodo = await prisma.todos.update({
      where: { id: id },
      data: updateTodoDto!.values
    });

    res.json(updatedTodo);
  }

  public async deleteTodo(req: Request, res: Response) {
    const id = req.params.id;

    const todo = await prisma.todos.findUnique({ where: { id: id } });
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    const todoDeleted = await prisma.todos.delete({ where: { id: id} });

    if(todoDeleted) {
      res.json(todoDeleted)
    } else {
      res.status(400).json({ error: "Todo not found" });
    }
  }
}
