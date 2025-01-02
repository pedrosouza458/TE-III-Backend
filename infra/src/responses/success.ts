type SuccessProps = {
  statusCode: number;
  message: string;
  data?: string;
};

export class Success {
  public statusCode: number;
  public message: string;
  public data: string;

  private constructor(props: SuccessProps) {
    this.statusCode = props.statusCode;
    this.message = props.message;
    this.data = props.data;
  }
  
  public static create(props: SuccessProps): Success {
    return new Success(props);
  }
}