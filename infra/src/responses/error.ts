type SuccessProps = {
  statusCode: number;
  message: string;
};

export class Error {
  public statusCode: number;
  public message: string;

  private constructor(props: SuccessProps) {
    this.statusCode = props.statusCode;
    this.message = props.message;
  }
  
  public static create(props: SuccessProps): Error {
    return new Error(props);
  }
}