import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean, IsOptional } from "class-validator";

@ArgsType()
export class StatusArgs {

    @Field(() => Boolean, { description: 'Get todos by done status', nullable: true})
    @IsOptional()
    @IsBoolean()
    status?: boolean
}