import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.entity";

export class AssociationInput {
    @ApiProperty({
        description: 'The list of users\' ids',
        example: "{0, 1, 2",
        type: [Number],
    })
    public idUsers: number[];

    @ApiProperty({
        description: 'The name of the associaiton',
        example: "Les ptits filous",
        type: String,
    })
    public name: string;
}