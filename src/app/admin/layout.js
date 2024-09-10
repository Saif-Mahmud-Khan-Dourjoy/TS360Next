import AdminNavbar from "@/components/partials/AdminNavbar";
export default function AdminLayout({ children }) {
  return (
      <>
      <AdminNavbar/>
      <div className="lg:px-24 px-7 pt-36 overflow-hidden mb-10">

        {children}
      </div>
    
      </>
  );
}
