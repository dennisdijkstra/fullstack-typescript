import { Post } from './../entities/Post';
import { Resolver, Query } from 'type-graphql';

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    async posts(): Promise<Post[]> {
        return Post.find();
    }
}