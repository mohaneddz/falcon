import { columns } from "@/components/tables/c_verification" 
import { DataTable } from "@/components/tables/data-table"
import { dummyData } from "@/data/verification" 

export default async function page() {
  const data = dummyData;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">SOS Management</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}