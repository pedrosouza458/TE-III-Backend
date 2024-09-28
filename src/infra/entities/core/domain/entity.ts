import crypto from 'crypto'

export abstract class Entity<T> {
  private _id: string;

  constructor(props: T, id?: string){
    this.props = props;
    this.id = id ?? crypto.randomUUID();
  }

  protected get id(): string {
    return this._id;
  }
  
  protected set id(value: string) {
    this._id = value;
  }

  public props: T;

}  

