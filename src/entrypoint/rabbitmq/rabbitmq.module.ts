import { Module } from '@nestjs/common'
import { RabbitMQService } from './rabbitmq.service'
import { AnalyserModule } from 'src/domain/analyser.module'

@Module({
  imports: [AnalyserModule],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMqModule {}
