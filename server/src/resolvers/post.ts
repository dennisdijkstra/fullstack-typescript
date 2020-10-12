import { MyContext } from './../types';
import { Post } from '../entities/Post';
import { Resolver, Query, Ctx, Arg, Int, Mutation } from 'type-graphql';

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    async posts(
        @Ctx() { req, res }: MyContext
     ): Promise<Post[]> {
        console.log(req);
        console.log(res);
        return Post.find();
    }

    @Query(() => Post, { nullable: true })
    post(
        @Arg('id', () => Int) id: number
     ): Promise<Post | undefined> {
        return Post.findOne(id);
    }

    @Mutation(() => Post)
    async createPost(
        @Arg('title') title: string
     ): Promise<Post> {
        return Post.create({
            title,
        }).save();
    }
}