import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
//https://www.digitalocean.com/community/tutorials/how-to-build-a-blog-with-nest-js-mongodb-and-vue-js
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-blog', { useNewUrlParser: true}),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
