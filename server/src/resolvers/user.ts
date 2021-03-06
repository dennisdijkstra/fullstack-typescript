import { MyContext } from './../types';
import { getConnection } from 'typeorm';
import { User } from './../entities/User';
import { Resolver, Mutation, Arg, Field, InputType, ObjectType, Ctx, Query } from 'type-graphql';
import argon2 from 'argon2';

@InputType()
export class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  email: string;
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
    @Query(() => User, { nullable: true })
    me(@Ctx() { req }: MyContext) {
      if (!req.session.userId) {
        return null;
      }

      return User.findOne(req.session.userId);
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { req }: MyContext
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
                           message: 'Username and or email already taken',
                       }
                   ],
               };
           }
        }
        req.session.userId = user.id;

        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('usernameOrEmail') usernameOrEmail: string,
        @Arg('password') password: string,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        const user = await User.findOne(
            usernameOrEmail.includes("@")
                ? { where: { email: usernameOrEmail } }
                : { where: { username: usernameOrEmail } }
        );

        if(!user) {
            return {
                errors: [
                    {
                        field: 'usernameOrEmail',
                        message: 'Username and or email does not exist',
                    },
                ],
            };
        }

        const isValid = await argon2.verify(user.password, password);

        if(!isValid) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'Incorrect password',
                    },
                ],
            };
        }
        req.session.userId = user.id;

        return { user };
    }
}