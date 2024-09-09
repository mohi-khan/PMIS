import { auth } from "@/auth";

import { notificaionlist, vendorList } from "@/lib/zod";
import { Button } from "@/components/ui/button";
import TaskList from "@/components/data/TaskList";
import TaskAdd from "@/components/data/TaskAdd";
import { ResponsiveDialog } from "@/components/dialogui/Dialogui";
import NotificationList from "@/components/data/NotificationList";

export default async function task() {
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;

  const response = await fetch(`${process.env.API_PATH}notification`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await response.json();
  console.log(result);

  const notifications = notificaionlist.safeParse(result);
  if (!notifications.success) {
    console.log("Error parsing Notificaton:", notifications.error);
    //throw new Error("invalid Notificaton type");
  }

  const venres = await fetch(`${process.env.API_PATH}vendors`, {
    cache: "no-store",
  });

  const venresult: vendorList = await venres.json();
  console.log(venresult);
  const vendors = venresult.map((item) => ({
    id: item.id,
    name: item.name,
  }));
  const empres = await fetch(`${process.env.API_PATH}employees`, {
    cache: "no-store",
  });

  const empresult: vendorList = await empres.json();

  const employees = empresult.map((item) => ({
    id: item.id,
    name: item.name,
  }));
  return (
    <>
      <div>
        <NotificationList
          data={notifications.data || []}
          vendors={vendors}
          employee={employees}
          apipath={process.env.API_PATH || ""}
          username={session.user?.email || ""}
        />
      </div>
    </>
  );
}
