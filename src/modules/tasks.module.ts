import { Module } from '@nestjs/common';
import { TasksService } from 'src/services/tasks.service';
import { EasyWhatsAppModule } from './easy-whatsapp.module';
import { BrowserModule } from './browser.module';

@Module({
  imports: [EasyWhatsAppModule, BrowserModule],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
