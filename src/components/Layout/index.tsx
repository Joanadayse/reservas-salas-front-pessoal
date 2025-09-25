import Sidebar from "../Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex  ">

  <Sidebar />


  
      <main className="flex-1  overflow-x-auto  ">
        {children}
      </main>
    </div>
  );
}
