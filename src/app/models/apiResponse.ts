export interface ApiResponseModel {
  success: Boolean;
  message: string;
  data: unknown;
  statusCode: number;
  timestamp: string;
  metaData: unknown;
}
