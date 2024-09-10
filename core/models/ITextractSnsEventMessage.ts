export interface ITextractSnsEventMessage {
  API: string;
  DocumentLocation: {
    S3Bucket: string;
    S3ObjectName: string;
  };
  JobId: string;
  JobTag: string;
  Status: string;
  StTimestampatus: number;
}
