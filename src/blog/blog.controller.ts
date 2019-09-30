import { Controller, Get, Res, HttpStatus, Param, Post, Body, Put, Query, NotFoundException, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { ValidateObjectID } from '../shared/pipes/validate-object-id.pipes';
import { CreatePostDTO } from './dto/create-post.dto';
import { POINT_CONVERSION_HYBRID } from 'constants';

@Controller('blog')
export class BlogController {

    constructor(private blogSerivce : BlogService){};

    @Get('post')
    async getPosts(@Res() res){
        const post = await this.blogSerivce.getPosts();
        return res.status(HttpStatus.OK).json(post);
    }

    
    @Get('post/:postID')
    async getPost(@Res() res, @Param('postID', new ValidateObjectID())postID){
        const post = await this.blogSerivce.getPost(postID);
        return res.status(HttpStatus.OK).json(post);
    }

    @Post("post")
    async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const newPost = this.blogSerivce.addPost(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message:"Post foi adicionado com sucesso",
            post: newPost
        });
    }

    @Put("/edit")
    async editPost(
        @Res() res,
        @Query('postID', new ValidateObjectID()) postID,
        @Body() createPostDTO : CreatePostDTO ) {
            const editPost = await this.blogSerivce.editPost(postID, createPostDTO);
            if(!editPost) throw new NotFoundException("Post não encontrado");
            return res.status(HttpStatus.OK).json({
                message : "Post Editado com sucesso",
                post : editPost
            });
    }

    @Delete()
    async deletePost(@Res() res, 
    @Query('postID', new ValidateObjectID()) postID ){
        const deletePost = this.blogSerivce.deletePost(postID);
        if(!postID) throw new NotFoundException("Post não encontrado");
        return res.status(HttpStatus.OK).json({
            message : "Post Deletado com sucesso",
            post : deletePost
        });
    }



}
