import { Float, Query, Resolver, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query(() => String, {description: 'Hola mundo es lo que retorna', name: 'hello'})
    helloWorld(): string {
        return 'Hello world';
    }

    @Query(() => Float, {name:'randomNumber'})
    getRandomNumber(): number {
        return Math.random() * 100;
    }

    //getRandomFromZeroTo
    @Query(() => Int, {name: 'randomZeroTo'})
    getRandomFromZeroTo( @Args('to', {type: () => Int, nullable: true}) to: number = 6): number {
        return Math.floor(Math.random() * to);
    }
}
