
import SideNav from "./_components/SideNav";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <SideNav />

      <main className="ml-72 p-4">
        {children}
      </main>
    </div>
  );
}