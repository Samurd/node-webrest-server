import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain/repositories/todo.repository";

export class TodosController {
  constructor(private todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const todo = await this.todoRepository.findById(id);

      return res.json(todo);
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const todo = await this.todoRepository.create(createTodoDto!);

    return res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      id,
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    try {
      const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);

      return res.json(updatedTodo);
    } catch (error) {}
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const deleted = await this.todoRepository.deleteById(id);
      return res.json(deleted);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}
