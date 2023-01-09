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
        example: 'p9z&Vj@MO0#diu4An7c',
        type: String,
    })
    public password: string;
}