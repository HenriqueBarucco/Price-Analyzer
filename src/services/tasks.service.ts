import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AnalyserService } from './analyser.service';

@Injectable()
export class TasksService {
  constructor(private analyserService: AnalyserService) {}

  private readonly logger = new Logger(TasksService.name);

  @Cron('0 */3 8-23 * *')
  handleHourlyJob() {
    this.logger.log('CRON JOB RUNNING');
    this.analyserService.analyser();
    this.logger.log('CRON JOB FINISHED');
  }
}
