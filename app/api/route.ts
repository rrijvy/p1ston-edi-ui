import RelayIntegrationRepository from "@/core/repositories/relayIntegrationRepository";
import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse<object>) {
  const relayIntegrationRepository = new RelayIntegrationRepository();
  const flatEmailsData = await relayIntegrationRepository.GetListFromDynamo("EMAIL:LIST", "EMAIL:");
  console.log(flatEmailsData);
  return res.status(200).json({ flatEmailsData });
}
