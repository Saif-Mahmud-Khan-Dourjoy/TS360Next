import Common from "@/components/Blog/Common";



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