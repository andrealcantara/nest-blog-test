import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class BlogService {

  constructor(@InjectModel('Post') private readonly postModel: Model<Post> ) {}

  async getPosts(): Promise<Post[]> {
    const post = await this.postModel.find().exec();
    return post;
  }

  async getPost(postID): Promise<Post> {
    const post = await this.postModel.findById(postID).exec();
    return post;
  }

  async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
    const newPost = await new this.postModel(createPostDTO);
    return newPost.save();
  }

  async editPost(postID, createPostDTO: CreatePostDTO): Promise<Post> {
    const post = await this.postModel.findByIdAndUpdate(postID, createPostDTO, {new: true});
    return post;
  }

  async deletePost(postID): Promise<Post> {
      const post = await this.postModel.findByIdAndRemove(postID);
      return post;
  }

}
