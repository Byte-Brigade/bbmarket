import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main id="layout" className="p-4 sm:ml-64">
        {children}
      </main>
    </>
  );
}
