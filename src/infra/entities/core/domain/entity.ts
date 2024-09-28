import crypto from 'crypto';

export abstract class Entity<T> {
  public id: string; // Make id public to allow external access

  constructor(props: T, id?: string) {
    this.props = props;
    this.id = id ?? crypto.randomUUID(); // Use the id directly
  }

  public props: T; // Kept props public for access
}
