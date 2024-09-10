import BaseRepository from "./baseRepository";
import Constants from "../../helpers/constants";
import { IEmailFileDto } from "../models/dtos/IEmaiDto";

class RelayIntegrationRepository extends BaseRepository {
  constructor() {
    super(process.env.Email_DB ?? "relay-integration-db");
  }

  public GetItemsByJobId = async (jobId: string) => {
    const dbRecords = await this.GetListFromDynamoWithFilter<IEmailFileDto>(Constants.EmailP1stonId, Constants.EmailP1stonTypePrefix, {
      textractJobId: jobId,
    });
    return dbRecords;
  };
}

export default RelayIntegrationRepository;
