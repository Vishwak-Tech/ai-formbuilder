
import SideNav from "./_components/SideNav";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <SideNav />

      <main className="ml-72 mt-20 p-8">
        {children}
      </main>
    </div>
  );
}