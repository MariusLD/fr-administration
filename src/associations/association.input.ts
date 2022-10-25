import { ApiProperty } from "@nestjs/swagger";

export class AssociationInput {
    @ApiProperty({
        description: 'The list of users\' ids',
        example: "{0, 1, 2}",
        type: "Number[]",
    })
    public idUsers: number[];

    @ApiProperty({
        description: 'The firtname of the user',
        example: "John",
        type: String,
    })
    public name: string;
}