export interface FieldMapping {
  mappingFields?: Array<string>;
  p1stonField: string;
}

export interface IEmailMappingDto {
  acknoledgementEmail: {
    supplierPO?: FieldMapping;
    ackNo?: FieldMapping;
    ackDate?: FieldMapping;
  };
}
