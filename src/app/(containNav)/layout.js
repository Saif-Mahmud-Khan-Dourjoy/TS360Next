import Footer from "@/components/partials/footer";
import Navbar from "../../components/partials/navbar";






export default function ContainNavLayout({ children }) {
  return (
      <>
      <Navbar/>
      <div>
        {children}
      </div>
      <Footer/>
      </>
  );
}
