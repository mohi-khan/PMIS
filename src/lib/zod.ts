import { number, object, string } from "zod"
import {z} from "zod";
export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
    password: string().min(1, { message: "Password is required" }),
}
)
const equipmentListSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  model:z.string(),
  runninghour: z.number(),
  milagemeter: z.string(),
});
export const equipmentSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  model:z.string(),
  status:z.string(),
  manufacturur:z.string(),
  serial:z.string(),
  location:z.string(),
  purchasedate:z.string(),
  runninghour: z.number(),
  milagemeter: z.string(),
  vendor:z.number(),
});
export const woSchema = z.object({
  id: z.number().int(),
  taskname: z.string(),
  completedate:z.string().optional(),
  name:z.string(),
  position:z.string(),
  tel:z.string(),
  problem:z.string(),
  spares:z.array(z.object({
    code:z.number(),
    name:z.string(),
    qty:z.number().optional(),
  })).optional().nullable(),
  procedure:z.string().optional().nullable(),
  observation:z.string().optional().nullable(),
  attachment:z.array(z.string()).optional()
});
export const masterSchema = z.object({
  id: z.string(),
  desc: z.string()});
const vendorslistSchema=z.object({
  id: z.string(),
  name: z.string()
})
const tasklistSchema=z.object({
  id: z.number().int(),
  name: z.string()
})
const taskSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  frequency:z.number().int(),
  frequnit: z.string(),
  advnotice: z.number().int(),
});
const taskschSchema = z.object({
  schid:z.number(),
  id: z.number(),
  name: z.string(),
  freqt: z.number(),
  frequ: z.string(),
  advnott: z.number(),
  lastperford: z.string().transform((str) => new Date(str)),  // Assuming the date is in ISO 8601 format
  lastperformh: z.number(),
  freqkm: z.number(),
  advnotkm: z.number(),
  lastperformkm: z.number(),
  status:z.string(),
});
const overdueSchema = z.object({
  equipmentid:z.number(),
  overdue_count:z.string(),
  advance_notice_count:z.string(),
})
const notificationSchema = z.object({
  equipmenttaskschid:z.number(),
  equipmentid:z.number(),
  equipmentname:z.string(),
  model:z.string(),
  taskname:z.string(),
  status:z.string(),
  wostatus:z.string().nullable(),
  noticestatus:z.string(),
})
const workOrderSchema = z.object({
  id: z.number(),
  equipmentid:z.number(),
  equipmentname: z.string(),
  equipmentmodel: z.string(),
  task: z.string(),
  assignee: z.string(),
  vendors: z.string(),
  scheduledate: z.string(),
  duedate: z.string(),
  notes: z.string(),
  priority: z.string()
})
const completeWorkOrderSchema = z.object({
  workorderid: z.number(),
  taskname: z.string(),
  scheduledate: z.string().optional(), // assuming date as string; you can use z.date() if it's a Date object
  assigneename: z.string(),
  vendorname: z.string().nullable(),
  notes: z.string().optional(),
  status: z.string(),
  workstarttime: z.string().optional().nullable(), // assuming time as string; you can use z.date() if it's a Date object
  workcompletiontime: z.string().optional().nullable(), // assuming time as string; you can use z.date() if it's a Date object
  spare: z.array(z.object({
    code: z.number(),
    name:z.string(),
    qty: z.number().optional(),
  })).optional().nullable(),
  completionnotes: z.string().optional().nullable(),
  attachments: z.array(z.string()).optional().nullable(),
  totalcost: z.string().optional().nullable(),
  metervalue: z.string().optional().nullable(),
  runninghour: z.string().optional().nullable(),
  procedure:z.string().optional().nullable(),
  observation:z.string().optional().nullable(),
});
const partSchema = z.object({
  part_code: z.number(),
  partname: z.string(),
  equipment_id: z.array(z.number()),
  equipmentdesc: z.array(z.string())
});
const workorderCompletionSchema = z.object({
  workorderid:z.number(),
  equipmentdesc:z.string(),
  taskname:z.string(),
  status: z.string().default('open'),
  workstarttime: z.date().optional(),
  workcompletiontime: z.date().optional(),
  spare: z.array(z.object({
    id: z.number(),
    qty: z.number()
  })).optional(),
  notes: z.string().optional(),
  attachment: z.array(z.string()).optional(),
  totalcost: z.number().optional(),
  metervalue: z.number().optional(),
  runninghour: z.number().optional()
});
const equipSpareSchema=z.object(
  {
    partname:z.string(),
    workcompletiontime:z.string().optional().nullable()    

  }
)
const fuelSchema=z.object(
  {
    fueldate:z.string(),
    fuelqty:z.number(),
    fuelunit:z.string().nullable().default('Litres'),
    lastmilage:z.number(),
    currentmilage:z.number(),
    runninghour:z.number(),
    vendorname:z.string().nullable(),      
  }

)
const expenseSchema=z.object({
  description:z.string(),
  equipmentdesc:z.string(),
  workorderid:z.number().optional().nullable(),
  reactivemaintenanceid:z.number().optional().nullable(),
  trandate:z.string(),
  totalcost:z.number(),
  comments:z.string().optional().nullable()
})
const milageSchema=z.object({
  equipmentname:z.string(),
  model:z.string(),
  milage:z.number(),
  runninghour:z.number(),
  trandate:z.string(),
  fuelconsumed:z.number(),
  fuelunit:z.string()
})
const reactiveMaintenanceSchema = z.object({
  datereported: z.string(),
  dateofmaintenance: z.string(),
  problemdescription: z.string(),
  reportedby: z.string(),
  asssigtechnician: z.number(),
  maintenancetype: z.string(),
  workperformed: z.string(),
  partused: z.array(z.object({
    code: z.number().optional(),
    name:z.string().optional(),
    qty: z.number().optional(),
  })).optional(),
  laborhours: z.string(),
  costofparts: z.string(),
  completiondate: z.string(),
  comments: z.string().optional(),
  preventivemeasures: z.string().optional(),
  vendorinformation: z.string().optional(),
  attachments: z.array(z.string()).optional(),
});

// Type definition for the schema
export type ReactiveMaintenanceType = z.infer<typeof reactiveMaintenanceSchema>;
export const maintenancehistorydata=z.array(reactiveMaintenanceSchema)
export const tasklist=z.array(taskSchema)
export const taskschlist=z.array(taskschSchema)
export type Tasks=z.infer<typeof tasklist>
export type TaskschType=z.infer<typeof taskschlist>
export const equipmentType=z.array(equipmentListSchema);
export type equipmentlist=z.infer<typeof equipmentListSchema>
export type equipments=z.infer<typeof equipmentSchema>
export const vendorListType=z.array(vendorslistSchema);
export type vendorList=z.infer<typeof vendorListType>

export const taskListType=z.array(tasklistSchema);
export type TaskList=z.infer<typeof taskListType>;
export const overdue=z.array(overdueSchema)
export type OverdueType=z.infer<typeof overdueSchema>
export const notificaionlist=z.array(notificationSchema)
export type NotificaionType=z.infer<typeof notificaionlist>
export const workOrderlist=z.array(workOrderSchema)
export type WorkOrderType=z.infer<typeof workOrderlist>
export const masterlist=z.array(masterSchema)
export type MasterType=z.infer<typeof masterlist>
export const partList=z.array(partSchema)
export type PartType=z.infer<typeof partList>
export const equipspare=z.array(equipSpareSchema)
export type EquipspareType=z.infer<typeof equipspare>
const workorderArraySchema = z.array(workorderCompletionSchema);
type WorkorderArray = z.infer<typeof workorderArraySchema>;
export type FueldataType=z.infer<typeof fuelSchema>;
export type ExpensedataType=z.infer<typeof expenseSchema>;
export type MilagedataType=z.infer<typeof milageSchema>;
export const fuelhistorydata=z.array(fuelSchema);
export const expensehistorydata=z.array(expenseSchema);
export const milagehistorydata=z.array(milageSchema);
export type CompleteWorkOrder=z.infer<typeof completeWorkOrderSchema>;
export const workorderhistorydata=z.array(completeWorkOrderSchema)