import { getConnection } from 'typeorm';
import { User } from './../entities/User';
import { Resolver, Mutation, Arg, Field, InputType, ObjectType } from 'type-graphql';
import argon2 from 'argon2';

@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput
    ): Promise<UserResponse> {
        const hashedPassword = await argon2.hash(options.password)
        let user;

        try {
            const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                username: options.username,
                email: options.email,
                password: hashedPassword,
            })
            .returning('*')
            .execute();

            user = result.raw[0];
        } catch (error) {
           if (error.code === "23505") {
               return {
                   errors: [
                       {
                           field: 'username',
                           message: 'username already taken',
                       }
                   ],
               };
           }
        }

        return { user };
    }
}