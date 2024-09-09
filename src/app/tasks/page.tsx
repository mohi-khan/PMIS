import { auth } from "@/auth";

import { tasklist, Tasks } from "@/lib/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TaskList from "@/components/data/TaskList";
import TaskAdd from "@/components/data/TaskAdd";
import { ResponsiveDialog } from "@/components/dialogui/Dialogui";

export default async function task() {
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;

  const response = await fetch(`${process.env.API_PATH}tasks`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await response.json();
  console.log(result);

  const tasks = tasklist.safeParse(result);
  if (!tasks.success) {
    console.log("Error parsing Tasks:", tasks.error);
    //throw new Error("invalid Tasks type");
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-black">{`Tasks(${tasks.data?.length})`}</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add new Task</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add new Task</DialogTitle>
              <DialogDescription>
                Add new Task Here. Click save when you have done.
              </DialogDescription>
            </DialogHeader>
            <TaskAdd apipath={process.env.API_PATH || ""} />
            <DialogFooter className="sm: justify-center">
              <DialogClose asChild>
                <Button
                  className=" bg-blue-500 text-white text-xs rounded-md"
                  type="button"
                  variant="secondary"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <TaskList data={tasks.data || []} />
      </div>
    </>
  );
}
