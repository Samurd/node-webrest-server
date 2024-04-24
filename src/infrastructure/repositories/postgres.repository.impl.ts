import { TodoDatasource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { TodoRepository } from "../../domain/repositories/todo.repository";

export class PostgresRepositoryImpl implements TodoRepository {
    constructor(
        private readonly datasource: TodoDatasource
    ) {}
    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
       return this.datasource.create(createTodoDto);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: string): Promise<TodoEntity> {
        return this.datasource.findById(id);
    }
    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateById(updateTodoDto);
    }
    deleteById(id: string): Promise<TodoEntity> {
        return this.datasource.deleteById(id);
    }
    
}