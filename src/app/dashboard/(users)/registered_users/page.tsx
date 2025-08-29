import { columns } from "@/components/tables/c_registered" 
import { DataTable } from "@/components/tables/data-table"
import { dummyData } from "@/data/registered" 

export default async function page() {
  const data = dummyData;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Registered Users Management</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}