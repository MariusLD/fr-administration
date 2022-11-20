import { ApiProperty } from '@nestjs/swagger';

export class Login {
    @ApiProperty({
        description: 'The username',
        example: '1',
        type: String,
    })
    public username: string;

    @ApiProperty({
        description: 'The password',
        example: 'password',
        type: String,
    })
    public password: string;
}