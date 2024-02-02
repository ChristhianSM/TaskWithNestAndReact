import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TaskModule,
    MongooseModule.forRoot(
      'mongodb+srv://user_task:WyxAldjbgZLR72jW@cluster0.r8wpj.mongodb.net/nest_task_react',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
