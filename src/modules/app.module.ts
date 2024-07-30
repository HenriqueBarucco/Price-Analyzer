import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { ConfigModule } from '@nestjs/config'
import { AnalyserModule } from './analyser.module'

@Module({
  imports: [ScheduleModule.forRoot(), ConfigModule.forRoot(), AnalyserModule],
})
export class AppModule {}
