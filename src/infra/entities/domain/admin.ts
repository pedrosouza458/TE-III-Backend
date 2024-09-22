import { Entity } from "../core/domain/entity";

type AdminProps = {
  name: string,
  password: string,
}

export class Admin extends Entity<AdminProps> {

}