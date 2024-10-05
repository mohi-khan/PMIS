import { auth } from "@/auth";
import SpareList from "@/components/data/SpareList";
import SparePartsAdd from "@/components/data/SparePartsAdd";
import { MasterType, PartType, partList } from "@/lib/zod";

export default async function spareparts() {
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;
  const partslist = await fetch(`${process.env.API_PATH}sparedetails`, {
    cache: "no-store",
  });

  if (!partslist.ok) {
    throw new Error("Network response was not ok");
  }
  const parts = await partslist.json();

  const spares = partList.safeParse(parts);
  if (!spares.success) {
    console.log("Error parsing Spare Parts List:", spares.error);
    //throw new Error("invalid Notificaton type");
  }

  const venres = await fetch(`${process.env.API_PATH}equipmentMasterList`, {
    cache: "no-store",
  });

  const result: MasterType = await venres.json();
  return (
    <>
      <div className="mb-10">
        <SparePartsAdd
          // setIsOpen={void}
          lists={result}
          apipath={process.env.API_PATH || ""}
          username={session.user?.email || ""}
        />
      </div>
      <div>
        <SpareList data={spares.data || []}></SpareList>
      </div>
    </>
  );
}
