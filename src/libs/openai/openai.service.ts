import { Injectable, Logger } from '@nestjs/common'
import OpenAI from 'openai'

@Injectable()
export class OpenAIService {
  private readonly logger = new Logger(OpenAIService.name)

  constructor() {
    this.ai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  private ai: OpenAI

  async getValue(base64: string): Promise<number | null> {
    const response = await this.ai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Análise a seguinte imagem e retorne apenas o valor do produto, sem o cifrão ou nenhuma outra informação. ex: 499.99',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64}`,
              },
            },
          ],
        },
      ],
    })

    const content = response.choices[0].message.content
    const price = parseFloat(content)

    if (isNaN(price)) {
      this.logger.error(`Unable to identify the price: ${content}`)
      return null
    }

    return price
  }
}
