import BaseRepository from "./baseRepository";

class RelayIntegrationRepository extends BaseRepository {
  constructor() {
    super(process.env.Email_DB ?? "relay-integration-db");
  }
}

export default RelayIntegrationRepository;
