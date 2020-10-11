import { User } from './../entities/User';
import { Resolver, Mutation } from 'type-graphql';

@Resolver()
export class UserResolver {
    @Mutation(() => [User])
    register(): Promise<User[]> {
        return User.find();
    }
}