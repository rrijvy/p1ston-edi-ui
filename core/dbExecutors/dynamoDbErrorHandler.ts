import { ResourceNotFoundException, ProvisionedThroughputExceededException, DynamoDBServiceException } from "@aws-sdk/client-dynamodb";

class DynamoDbErrorHandler {
  public handleError(error: unknown): never {
    if (error instanceof ResourceNotFoundException) {
      console.error(`${error.name}: ${error.message}`);
      throw error;
    } else if (error instanceof ProvisionedThroughputExceededException) {
      console.error(`${error.name}: ${error.message}`);
      throw error;
    } else if (error instanceof DynamoDBServiceException) {
      console.error(`${error.name}: ${error.message}`);
      throw error;
    } else if (error instanceof Error) {
      console.error(`${error.name}: ${error.message}`);
      throw error;
    } else {
      if (this.isTimeoutError(error)) {
        console.error("Timeout error");
        throw new Error("Timeout error");
      } else {
        console.error("Unknown error");
        throw new Error("Unknown error");
      }
    }
  }

  private isTimeoutError(error: unknown): boolean {
    return typeof error === "object" && error !== null && "name" in error && error.name === "TimeoutError";
  }
}

export default DynamoDbErrorHandler;
