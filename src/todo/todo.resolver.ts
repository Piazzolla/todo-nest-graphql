import { Args, Query, Resolver, Int, Mutation } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args/status.args';

@Resolver(() => Todo)
export class TodoResolver {

    constructor( 
        private readonly todoService: TodoService
    ) {}

    @Query( () => [Todo], { name: 'todos'})
    findAll(
        @Args() statusArgs: StatusArgs
    ): Todo[] {
        return this.todoService.findAll(statusArgs);
    }

    @Query( () => Todo, { name: 'todo'} )
    findOne( @Args('id', {type: () => Int}) id: number) {
        return this.todoService.findOne( id );
    }

    @Mutation( () => Todo, { name: 'createTodo'})
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput) {

        return  this.todoService.create( createTodoInput );
    }

    @Mutation( () => Todo, { name: 'updateTodo'})
    updateTodo(
        @Args('updateTodoInput') updateTodoInput:UpdateTodoInput
    ) {
        return this.todoService.update( updateTodoInput );
    }
    
    @Mutation( () => Boolean, { name: 'removeTodo'})
    removeTodo(
        @Args('id', { type: () => Int}) id: number
    ) {
        return this.todoService.delete(id);
    }


    // Aggregations

    @Query( () => Int, { name: 'totalTodos'})
    totalTodos() {
        return this.todoService.totalTodos;
    }
    @Query( () => Int, { name: 'completedTodos'})
    completedTodos() {
        return this.todoService.completedTodos;
    }
    @Query( () => Int, { name: 'pendingTodos'})
    pendingTodos() {
        return this.todoService.pendingTodos;
    }
}
