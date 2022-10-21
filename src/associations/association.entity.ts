export class Association {
    id : number;
    idUsers : number[];
    name : string;

    constructor(idUsers : number[], name : string){
        this.idUsers = idUsers;
        this.name = name;
    }
}