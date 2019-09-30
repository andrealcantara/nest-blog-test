import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class BlogService {
    
  constructor(@InjectModel('Post') private readonly postModel: Model<Post> ){};

  async getPosts() : Promise<Post[]>{
    const post = await this.postModel.find().exec();
    return post;
  };

  async getPost(postID) : Promise<Post> {
    let id = Number(postID);
    const post = await this.postModel.findById(id).exec();
    return post;
  }

  async addPost(createPostDTO : CreatePostDTO) : Promise<Post> {
    const newPost = await this.postModel(createPostDTO);
    return newPost;
  }

  async editPost(postID, createPostDTO: CreatePostDTO) : Promise<Post> {
    let id = Number(postID);  
    const post = await this.postModel.findByIdAndUpdate(id, createPostDTO, {new:true});
    return post;
  }

  async deletePost(postID) : Promise<Post> {
      let id = Number(postID);
      const post = await this.postModel.findByIdAndRemove(id);
      return post;
  }

}
