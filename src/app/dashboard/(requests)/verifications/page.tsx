import { columns } from "@/components/tables/c_verification" 
import { DataTable } from "@/components/tables/data-table"
import { dummyData } from "@/data/verification" 

export default async function page() {
  const data = dummyData;

  return (
    <section className="mx-auto full">
      <h1 className="text-2xl font-bold mb-4">Verifications Management</h1>
      <DataTable columns={columns} data={data} />
    </section>
  );
}