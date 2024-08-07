import Common from "@/components/Blog/Common";

export const metadata = {
  title: "Blog",
  description: "Experience our all blogs related to test automation",
};

export default function BlogLayout({ children }) {


  return (
    <>

      <div className="lg:px-24 px-7 pt-40 overflow-hidden mb-10">

        <Common />

        <div>
          {children}
        </div>
        </div>
     
      

    </>
  );
}