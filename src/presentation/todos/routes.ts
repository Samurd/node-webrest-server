import { Router } from "express";
import { TodosController } from "./controller";
import { PostgresRepositoryImpl } from "../../infrastructure/repositories/postgres.repository.impl";
import { PostgresDatasourceImpl } from "../../infrastructure/datasource/postgres.datasource.impl";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const postgres = new PostgresDatasourceImpl();
    const todoRepository = new PostgresRepositoryImpl(postgres);
    const todoController = new TodosController(todoRepository);

    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodoById);

    router.post("/", todoController.createTodo);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);

    return router;
  }
}
