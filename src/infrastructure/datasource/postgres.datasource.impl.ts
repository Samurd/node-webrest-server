import { prisma } from "../../data/postgres";
import { TodoDatasource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoEntity } from "../../domain/entities/todo.entity";

export class PostgresDatasourceImpl implements TodoDatasource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todos.create({
      data: createTodoDto,
    });

    return TodoEntity.fromObject(todo);
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todos.findMany();

    return todos.map((todo) => TodoEntity.fromObject(todo));
  }
  async findById(id: string): Promise<TodoEntity> {
    const todo = await prisma.todos.findFirst({ where: { id: id } });

    if (!todo) throw `Todo not found with id: ${id}`;

    return TodoEntity.fromObject(todo);
  }
  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const todo = await this.findById(updateTodoDto.id);

    const updateTodo = await prisma.todos.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto.values,
    });

    return TodoEntity.fromObject(updateTodo);
  }
  async deleteById(id: string): Promise<TodoEntity> {
    await this.findById(id);
    const deleted = await prisma.todos.delete({ where: { id: id } });
    return TodoEntity.fromObject(deleted);
  }
}
