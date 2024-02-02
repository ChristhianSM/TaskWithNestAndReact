import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ConflictException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { TaskService } from './task.service';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private TaskService: TaskService) {}

  @Get()
  findAll() {
    return this.TaskService.finalAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const task = await this.TaskService.findOne(id);
    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  @Post()
  async create(@Body() body: CreateTaskDto) {
    try {
      console.log(body);
      return await this.TaskService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Task already exists');
      }
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    const task = this.TaskService.update(id, body);
    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const task = await this.TaskService.delete(id);
    if (!task) throw new NotFoundException('Task not found');

    return task;
  }
}
