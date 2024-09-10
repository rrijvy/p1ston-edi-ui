import { IFile } from "./IFile";

export interface IUser {
  name?: string;
  address?: string;
}

export interface IParsedDataModel {
  emailId?: string;
  sender?: IUser;
  receivers?: Array<IUser>;
  emailReceivedAt?: Date;
  emailSubject?: string;
  emailBody?: string;
  attachments?: Array<IFile>;
}