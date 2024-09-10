class AppSetttings {
  private static instance: AppSetttings | undefined;

  public static GetInstance(): AppSetttings {
    if (!AppSetttings.instance) {
      AppSetttings.instance = new AppSetttings();
    }
    return AppSetttings.instance;
  }

  constructor() {
    this.P1AwsRegion = process.env.P1_AWS_Region || "";
    this.EmailDb = process.env.Email_DB || "";
    this.EmailAttachmentBucket = process.env.Email_Attachment_Bucket || "";
    this.TextractAnalyzeViaSnsArn = process.env.Textract_Analysis_Completion_ARN || "";
    this.P1RoleArn = process.env.P1_Role_ARN || "";
    this.TextractRoleArn = process.env.Textract_Role_ARN || "";
    this.P1Workspace = process.env.P1_WORKSPACE || "";
  }

  P1AwsRegion: string;
  EmailDb: string;
  EmailAttachmentBucket: string;
  TextractAnalyzeViaSnsArn: string;
  P1RoleArn: string;
  TextractRoleArn: string;
  P1Workspace: string;
}

export default AppSetttings;
