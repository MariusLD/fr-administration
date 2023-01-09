import { ApiProperty } from "@nestjs/swagger";

export class UserInput {
    @ApiProperty({
        description: 'The lastname',
        example: "Doe",
        type: String,
    })
    public lastname: string;

    @ApiProperty({
        description: 'The firstname',
        example: "John",
        type: String,
    })
    public firstname: string;

    @ApiProperty({
        description: 'The age',
        minimum: 18,
        default: 18,
        type: Number,
    })
    public age: number;

    @ApiProperty({
        description: 'The password',
        example: 'p9z&Vj@MO0#diu4An7c',
        type : String
    })
    public password : string;
}