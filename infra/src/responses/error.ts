type ErrorProps = {
  statusCode: number;
  message: string;
  data?: string;
};

export class Error {
  public statusCode: number;
  public message: string;
  public data: string;

  private constructor(props: ErrorProps) {
    this.statusCode = props.statusCode;
    this.message = props.message;
    this.data = props.data;
  }
  
  public static create(props: ErrorProps): Error {
    return new Error(props);
  }
}