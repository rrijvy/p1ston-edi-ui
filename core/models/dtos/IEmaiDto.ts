import { EmailFileType } from "../../../helpers/enums";
import { IFile } from "../IFile";

export interface IEmailDto {
  p1stonId?: string;
  p1stonType?: string;
  emailSubject?: string;
  emailBody?: string;
  fromEmail?: string;
  toEmails: Array<string>;
  attachments: Array<string>;
}

export interface IEmailFileBasicDto extends IFile {
  emailId: string;
  s3FileName: string;
  s3Key: string;
  fileType: EmailFileType;
  textractJobId?: string;
}

export interface IEmailFileDto extends Omit<IEmailFileBasicDto, "content"> {
  p1stonId?: string;
  p1stonType?: string;
}
