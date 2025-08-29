import { columns } from "@/components/tables/c_verified" 
import { DataTable } from "@/components/tables/data-table"
import { dummyUserData } from "@/data/verified" 

export default async function page() {
  const data = dummyUserData;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Verified Users Management</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}