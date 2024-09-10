import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandOutput,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import DynamoDbErrorHandler from "./dynamoDbErrorHandler";
import AppSettings from "../../helpers/AppSettings";

type AllowedTypes = string | number | boolean | Date | undefined;
type DisallowTypes =
  | null
  | ArrayBuffer
  | Blob
  | Buffer
  | DataView
  | File
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

type Disallow<T> = T extends DisallowTypes ? never : T;

export type StrictObject<T> = {
  [K in keyof T]: Disallow<T[K]> extends AllowedTypes
    ? Disallow<T[K]>
    : Disallow<T[K]> extends Array<infer U>
      ? StrictArray<U>
      : Disallow<T[K]> extends object
        ? StrictObject<Disallow<T[K]>>
        : never;
};

type StrictArray<T> = undefined | Disallow<T> extends AllowedTypes
  ? Disallow<T>[]
  : Disallow<T> extends Array<infer U>
    ? StrictArray<U>[]
    : Disallow<T> extends object
      ? StrictObject<Disallow<T>>
      : never;

class DynamoDbWriteExecutor extends DynamoDbErrorHandler {
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

  public async AddRecordInDynamo<T extends object>(item: StrictObject<T>): Promise<PutCommandOutput> {
    try {
      const command = new PutCommand({
        TableName: this.tableName,
        Item: item,
      });
      const response = await this.documentClient.send(command);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async UpdateRecordInDynamo<T extends object>(primaryKey: string, srotKey: string, modifiedItems: StrictObject<T>) {
    try {
      const params: UpdateCommandInput = {
        TableName: this.tableName,
        Key: {
          p1stonId: primaryKey,
          p1stonType: srotKey,
        },
        UpdateExpression: "",
        ExpressionAttributeValues: {},
        ReturnValues: "ALL_NEW",
      };

      if (params.UpdateExpression !== undefined) {
        for (const key in modifiedItems) {
          const expressionAttributeKey = `:${key}`;
          const expressionAttributeKeyValue = modifiedItems[key];
          if (params.UpdateExpression.length > 0) {
            params.UpdateExpression.concat(`, #${key} = :${expressionAttributeKeyValue}`);
          } else {
            params.UpdateExpression.concat(`SET #${key} = :${expressionAttributeKeyValue}`);
          }
          params.ExpressionAttributeValues = {
            ...params.ExpressionAttributeValues,
            [expressionAttributeKey]: expressionAttributeKeyValue,
          };
        }
      }

      const response = await this.documentClient.send(new UpdateCommand(params));
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async DeleteRecordInDynamo(primaryKey: string, srotKey: string) {
    try {
      const command = new DeleteCommand({
        TableName: this.tableName,
        Key: {
          p1stonId: primaryKey,
          p1stonType: srotKey,
        },
      });
      const response = await this.documentClient.send(command);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default DynamoDbWriteExecutor;
