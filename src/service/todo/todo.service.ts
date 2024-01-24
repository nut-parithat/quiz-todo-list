import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoDto } from 'src/model/todo.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  todoList: TodoDto[] = []

  create(createTodoDto: CreateTodoDto): TodoDto {
    try {
      const prepareTodo: TodoDto = {
        id: uuidv4(),
        message: createTodoDto?.message
      }

      this.todoList?.push(prepareTodo)
      return prepareTodo

    } catch (error) {
      throw error
    }
  }

  findAll(): TodoDto[] {
    return this.todoList
  }

  findOne(id: string): TodoDto {
    try {
      const findTodo = this.todoList?.find(todo => todo?.id === id)
      if (!findTodo) {
        throw new Error(`Id (${id}) is not found`)
      }

      return findTodo

    } catch (error) {
      throw error
    }
  }

  update(id: string, updateTodoDto: UpdateTodoDto): TodoDto {
    try {
      this.findOne(id)
      this.todoList = this.todoList?.map(todo => {
        if (todo?.id !== id) return todo
        return { ...todo, message: updateTodoDto?.message }
      })

      return { id, message: updateTodoDto?.message }

    } catch (error) {
      throw error
    }
  }

  remove(id: string): string {
    try {
      this.findOne(id)
      this.todoList = this.todoList?.filter(todo => todo?.id !== id)

      return 'success'

    } catch (error) {
      throw error
    }
  }
}
