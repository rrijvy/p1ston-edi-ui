import DynamoDbQueryExecutor from "../dbExecutors/dynamoDbQueryExecutor";
import DynamoDbWriteExecutor, { StrictObject } from "../dbExecutors/dynamoDbWriteExecutor";

abstract class BaseRepository {
  dynamodbQueryExecutor: DynamoDbQueryExecutor;
  dynamoDbWriteExecutor: DynamoDbWriteExecutor;

  constructor(tableName: string) {
    this.dynamodbQueryExecutor = new DynamoDbQueryExecutor(tableName);
    this.dynamoDbWriteExecutor = new DynamoDbWriteExecutor(tableName);
  }

  GetItemFromDynamo = async <T extends object>(p1stonId: string, p1stonType: string) => {
    const response = await this.dynamodbQueryExecutor.GetItemFromDynamo(p1stonId, p1stonType);
    return response.Item as T;
  };

  GetListFromDynamo = async <T extends object>(p1stonId: string, p1stonTypePrefix: string) => {
    const response = await this.dynamodbQueryExecutor.GetListFromDynamo(p1stonId, p1stonTypePrefix);
    return response.Items as Array<T>;
  };

  AddRecordInDynamo = async <T extends object>(item: StrictObject<T>) => {
    await this.dynamoDbWriteExecutor.AddRecordInDynamo(item);
  };

  UpdateRecordInDynamo = async <T extends object>(p1stonId: string, p1stonType: string, modifiedItems: StrictObject<T>) => {
    await this.dynamoDbWriteExecutor.UpdateRecordInDynamo(p1stonId, p1stonType, modifiedItems);
  };

  DeleteRecordInDynamo = async (p1stonId: string, p1stonType: string) => {
    await this.dynamoDbWriteExecutor.DeleteRecordInDynamo(p1stonId, p1stonType);
  };
}

export default BaseRepository;
