import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
//https://www.digitalocean.com/community/tutorials/how-to-build-a-blog-with-nest-js-mongodb-and-vue-js
@Module({
  imports: [
    MongooseModule.forRoot('mongod://localhost/nest-blog',{ useNewUrlParser: true})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}