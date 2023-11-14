import { Module } from '@nestjs/common';
import { AppController } from 'src/controllers/app.controller';
import { AppService } from 'src/services/app.service';
import { BrowserService } from 'src/services/browser.service';
import { BrowserModule } from './browser.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks.module';

@Module({
  imports: [ScheduleModule.forRoot(), TasksModule, BrowserModule],
  controllers: [AppController],
  providers: [AppService, BrowserService],
})
export class AppModule {}
