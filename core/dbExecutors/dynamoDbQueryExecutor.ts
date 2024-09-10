import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, GetCommandOutput, QueryCommand, QueryCommandOutput } from "@aws-sdk/lib-dynamodb";
import DynamoDbErrorHandler from "./dynamoDbErrorHandler";
import AppSettings from "../../helpers/AppSettings";

interface IGetCommandOutput<T> extends Omit<GetCommandOutput, "Item"> {
  Item?: T;
}

interface IQueryCommandOutput<T> extends Omit<QueryCommandOutput, "Items"> {
  Items?: T[];
}

class DynamoDbQueryExecutor extends DynamoDbErrorHandler {
  private readonly client: DynamoDBClient;
  private readonly documentClient: DynamoDBDocumentClient;
  private readonly tableName: string;
  private readonly appSettings: AppSettings;
  constructor(tableName: string) {
    super();
    this.appSettings = AppSettings.GetInstance();
    this.client = new DynamoDBClient({ region: this.appSettings.P1AwsRegion });
    this.documentClient = DynamoDBDocumentClient.from(this.client);
    this.tableName = tableName;
  }

  public async GetItemFromDynamo<T>(primaryKey: string, sortKey: string): Promise<IGetCommandOutput<T>> {
    try {
      const command = new GetCommand({
        TableName: this.tableName,
        Key: {
          p1stonId: primaryKey,
          p1stonType: sortKey,
        },
      });
      const response = await this.documentClient.send(command);
      return response as IGetCommandOutput<T>;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async GetListFromDynamo<T>(primaryKey: string, sortKeyPrefix: string): Promise<IQueryCommandOutput<T>> {
    try {
      const command = new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: "#pk = :pk AND begins_with(#sk, :sk)",
        ExpressionAttributeNames: {
          "#pk": "p1stonId",
          "#sk": "p1stonType",
        },
        ExpressionAttributeValues: {
          ":pk": primaryKey,
          ":sk": sortKeyPrefix,
        },
      });
      const response = await this.documentClient.send(command);
      return response as IQueryCommandOutput<T>;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default DynamoDbQueryExecutor;
