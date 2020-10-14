// import { MyContext } from './../types';
import { Post } from '../entities/Post';
import { Resolver, Query, Ctx, Arg, Int, Mutation } from 'type-graphql';
import { getConnection } from 'typeorm';

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    async posts(
        // @Ctx() { req, res }: MyContext
     ): Promise<Post[]> {
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

    @Mutation(() => Post, { nullable: true})
    async updatePost(
        @Arg('id') id: number,
        @Arg('title') title: string
     ): Promise<Post | null> {
        const result = await getConnection()
            .createQueryBuilder()
            .update(Post)
            .set({ title })
            .where("id = :id", { id })
            .execute();

            return result.raw[0];
    }

    @Mutation(() => Post)
    async deletePost(
        @Arg('id') title: string
     ): Promise<Post> {
        return Post.create({
            title,
        }).save();
    }
}