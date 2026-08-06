import { Button } from "@/components/ui/button"
import CreateForm from "./_components/CreateForm"
import FormList from "./_components/FormList";

function Dashboard() {
  return (
    <div className="space-y-8 p-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight">
            Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-gray-600">
            Manage your AI-generated forms, monitor submissions, and share forms
            with your audience.
          </p>
        </div>

        <CreateForm />
      </div>

      {/* Forms */}
      <FormList />
    </div>
  );
}

export default Dashboard;
