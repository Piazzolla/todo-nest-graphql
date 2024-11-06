import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, MaxLength } from "class-validator";

@InputType()
export class CreateTodoInput {

    @Field(() => String, { description: 'What need to be done'})
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    description: string;
}