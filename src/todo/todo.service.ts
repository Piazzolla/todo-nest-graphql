import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { UpdateTodoInput, CreateTodoInput } from './dto/inputs';

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        {id: 1, description: 'Piedra del alma', done:false},
        {id: 2, description: 'Piedra del espacio', done:true},
        {id: 3, description: 'Piedra del poder', done:false},
    ];

    findAll(): Todo[] {
        return this.todos;
    }

    findOne( id: number ): Todo {
        const todo = this.todos.find( todo => todo.id === id );
        if( !todo ) throw new NotFoundException(`Todo with id ${id} not found`);

        return todo;
    }

    create( createTodoInput: CreateTodoInput): Todo {
        const todo = new Todo();
        todo.description = createTodoInput.description;
        todo.id = Math.max( ...this.todos.map( todo => todo.id ), 0 ) + 1
        this.todos.push( todo );
        return todo;
    }

    update( {id, description, done}: UpdateTodoInput) {
        const todoToUpdate = this.findOne(id);
        if(description) todoToUpdate.description = description;
        if(done !== undefined) todoToUpdate.done = done;

        this.todos = this.todos.map( todo => { 
            return ( todo.id === id )? todoToUpdate : todo;
        });

        return todoToUpdate;
    }

    delete( id: number): Boolean {
        const todo = this.findOne(id);
        this.todos = this.todos.filter( todo => todo.id !== id);
        return true;
    }

}
