import { Entity } from "../core/domain/entity";

export type AdminProps = {
  name: string,
  password: string,
}

export class Admin extends Entity<AdminProps> {
  private constructor(props: AdminProps, id?: string){
    super(props, id);
  }

  static create(props: AdminProps, id?: string){
    const admin = new Admin(props);

    return admin;
  }

  public get name(): string {
    return this.name;
  }

}