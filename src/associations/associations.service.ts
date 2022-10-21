import { Injectable } from '@nestjs/common';
import { Association } from './association.entity';

const users : Association[] = [
    {
        id: 0,
        idUsers : [0],
        name : "Les ptits filous"
    }
]

@Injectable()
export class AssociationsService {}
