import EquipmentList from "@/components/report/EquipmentList";

type ReportPageProps = {
  params: {
    equipid: string;
    fromdate: string;
    todate: string;
  };
};

export default async function equipmentcard({ params }: ReportPageProps) {

  const { equipid, fromdate, todate } = params;
  const response = await fetch(`${process.env.API_PATH}equipments`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const myresult = await response.json();
  
 


  return (
    <>
    <EquipmentList equipmentdetails={myresult} reporttype="Equipment List"/>

 
    </>
  )
}
