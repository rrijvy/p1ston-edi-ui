import { Block } from "@aws-sdk/client-textract";

export interface IBlockAnalyzeModel {
  keyMap: Record<string, Block>;
  valueMap: Record<string, Block>;
  blockMap: Record<string, Block>;
}

export type IFormAnalyzeModel = Record<string, Array<string>>;

export interface ITableAnalyzeModel {
  structuredTables?: Array<Array<Record<string, string>>>;
  semiStructuredTables?: Array<Array<Record<string, string>>>;
}

export interface ILayoutAnalyzeModel {
  headers?: Array<string>;
  titles?: Array<string>;
  texts?: Array<string>;
  footers?: Array<string>;
}

export interface IEmailParsedDataModel {
  formData: IFormAnalyzeModel;
  tableData: ITableAnalyzeModel;
  layoutData: ILayoutAnalyzeModel;
}
