import Footer from "@/components/footer";
import Navbar from "../../components/navbar";






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
