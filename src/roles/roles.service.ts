import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private repository: Repository<Role>
    ) { }

    async create(name: string, idUser: number, idAssociation: number): Promise<Role> {
        const newRole = this.repository.create({
            name: name,
            idUser: idUser,
            idAssociation: idAssociation
        })
        return this.repository.save(newRole);
    }

    async get(idUser: number, idAssociation: number): Promise<Role> {
        return this.repository.findOne({ where: { idUser: Equal(idUser), idAssociation: Equal(idAssociation) } });
    }

    async update(idUser: number, idAssociation: number, name: string): Promise<Role> {
        let role = await this.repository.findOne({ where: { idUser: Equal(idUser), idAssociation: Equal(idAssociation) } });
        if (name !== undefined) {
            role.name = name;
        }
        return this.repository.save(role);
    }

    async delete(idUser: number, idAssociation: number): Promise<boolean> {
        let role = await this.get(idUser, idAssociation);
        if (role !== null) {
            this.repository.delete(role);
            return true;
        }
        return false;
    }
}
