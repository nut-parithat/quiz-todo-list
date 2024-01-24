import { DocumentBuilder } from "@nestjs/swagger";

export const AppSwagger = new DocumentBuilder()
  .setTitle('todo list')
  .setVersion('1.0')
  .build();