import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDatasource {
    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

    abstract getAll(): Promise<TodoEntity[]>


    abstract findById(id: string): Promise<TodoEntity>

    abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>

    abstract deleteById(id: string): Promise<TodoEntity>
}