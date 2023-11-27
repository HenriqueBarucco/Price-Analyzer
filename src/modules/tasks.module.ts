import { Module } from '@nestjs/common';
import { TasksService } from 'src/services/tasks.service';
import { AnalyserModule } from './analyser.module';

@Module({
  imports: [AnalyserModule],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
