import { Controller, Get, Post, Body,  Param, Delete, Res, BadRequestException, HttpStatus, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Response } from 'express';
import { AppManageResponseFormat } from 'src/util/mng-response-format';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }
  @Post()
  create(@Res() res: Response, @Body() createTodoDto: CreateTodoDto) {
    try {
      const data = this.todoService.create(createTodoDto)
      return res.status(HttpStatus.CREATED).json(AppManageResponseFormat.data(data))
    } catch (error) {
      throw new BadRequestException(AppManageResponseFormat.error(error))
    }
  }

  @Get()
  findAll(@Res() res: Response) {
    try {
      const data = this.todoService.findAll()
      return res.status(HttpStatus.OK).json(AppManageResponseFormat.data(data))
    } catch (error) {
      throw new BadRequestException(AppManageResponseFormat.error(error))
    }
  }

  @Get(':id')
  findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = this.todoService.findOne(id)
      return res.status(HttpStatus.OK).json(AppManageResponseFormat.data(data))
    } catch (error) {
      throw new BadRequestException(AppManageResponseFormat.error(error))
    }
  }

  @Put(':id')
  update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto
  ) {
    try {
      const data = this.todoService.update(id, updateTodoDto)
      return res.status(HttpStatus.OK).json(AppManageResponseFormat.data(data))
    } catch (error) {
      throw new BadRequestException(AppManageResponseFormat.error(error))
    }
  }

  @Delete(':id')
  remove(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = this.todoService.remove(id)
      return res.status(HttpStatus.OK).json(AppManageResponseFormat.data(data))
    } catch (error) {
      throw new BadRequestException(AppManageResponseFormat.error(error))
    }
  }
}
