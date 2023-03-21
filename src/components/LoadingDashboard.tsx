import Sidebar from "./Sidebar";

export default function LoadingDashboard() {
  return (
    <>
      <Sidebar />
      <main id="layout" className="sm:ml-64">
        <div className="flex items-center justify-center h-screen text-white bg-gray-800 animate-pulse">
          <h1 className="text-xl font-medium">Loading ...</h1>
        </div>
      </main>
    </>
  );
}
