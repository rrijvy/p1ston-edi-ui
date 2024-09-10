export interface IPutObjectParam {
  bucket: string;
  key: string;
  objectContent: Uint8Array | string;
  contentType?: string;
}
