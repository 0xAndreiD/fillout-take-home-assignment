import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import config from "@/config";

import { FormModule } from "./form/form.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    FormModule,
  ],
})
export class AppModule {}
