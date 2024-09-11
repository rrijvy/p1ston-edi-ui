import RelayIntegrationRepository from "@/core/repositories/relayIntegrationRepository";
import Constants from "@/helpers/constants";
import EmailDataTable from "./components/emailDataTable";
import { IEmailFileDto } from "@/core/models/dtos/IEmaiDto";

export default async function Home() {
  const relayIntegrationRepository = new RelayIntegrationRepository();
  const response = await relayIntegrationRepository.GetListFromDynamo<IEmailFileDto>(
    Constants.EmailP1stonId,
    Constants.EmailP1stonTypePrefix
  );
  const emailBasicItems = response.filter((x) => x.p1stonType?.match(/^EMAIL:[a-zA-Z0-9]+$/));
  return (
    <div className="container mx-auto font-mono">
      <EmailDataTable renderItem={emailBasicItems} dbItems={response} />
    </div>
  );
}
