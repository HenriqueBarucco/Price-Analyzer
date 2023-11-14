import { Module } from '@nestjs/common';
import { TasksService } from 'src/services/tasks.service';

@Module({
  providers: [TasksService],
})
export class TasksModule {}
