import { Controller, Get } from '@nestjs/common';
import { AnalyserService } from 'src/services/analyser.service';

@Controller('analyser')
export class AppController {
  constructor(private readonly analyserService: AnalyserService) {}

  @Get()
  analyser() {
    return this.analyserService.analyser();
  }
}
