type SuccessProps = {
  statusCode: number;
  message: string;
};

export class Success {
  public statusCode: number;
  public message: string;

  private constructor(props: SuccessProps) {
    this.statusCode = props.statusCode;
    this.message = props.message;
  }
  
  public static create(props: SuccessProps): Success {
    return new Success(props);
  }
}