import { equipmentSchema } from "@/lib/zod";
import { DataTable } from "@/components/tools/DataTable";
import { fuelcolumns } from "@/components/data/columns/FuelCard";
type ReportPageProps = {
  params: {
    equipid: string;
    fromdate: string;
    todate: string;
  };
};

export default async function fuelcard({ params }: ReportPageProps) {
  console.log(params);
  const { equipid, fromdate, todate } = params;
  const response = await fetch(`${process.env.API_PATH}equipments/${equipid}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const myresult = await response.json();
  const equipmentdata = equipmentSchema.safeParse(myresult[0]);
  if (!equipmentdata.success) {
    console.log("Error parsing Equipment:", equipmentdata.error);
    throw new Error("invalid equipment type");
  }
  const { name, model, serial: serialNumber } = equipmentdata.data;

  const myres = await fetch(
    `${process.env.API_PATH}fuelreports/${equipid}/${fromdate}/${todate}`,
    {
      cache: "no-store",
    }
  );

  if (!myres.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await myres.json();

  return (
    <div className="text-center py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Fuel Report</h1>

      <h2 className="text-2xl font-semibold text-gray-600 mb-2">
        Equipment details: {name}/{model}/{serialNumber}
      </h2>

      <h4 className="text-lg font-medium text-gray-500">
        From: {fromdate} To: {todate}
      </h4>
      <div className="container mx-auto py-10">
        <DataTable columns={fuelcolumns} data={data} />
      </div>
    </div>
  );
}
