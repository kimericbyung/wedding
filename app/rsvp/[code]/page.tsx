import { notFound } from "next/navigation";
import { getPartyByCode } from "../actions";
import RSVPForm from "./RSVPForm";

interface Props {
  params: Promise<{ code: string }>;
}

export default async function RSVPPage({ params }: Props) {
  const { code } = await params;
  const data = await getPartyByCode(code);
  if (!data) notFound();
  return <RSVPForm party={data.party} guests={data.guests} />;
}
