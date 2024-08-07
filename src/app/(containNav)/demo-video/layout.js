import Common from "@/components/Video/Common";

export const metadata = {
  title: "Demo Video",
  description: "Experience our all videos related to test automation",
};




export default function VideoLayout({ children }) {
 
  return (
    <>
      <div className="lg:px-24 px-7 pt-40 overflow-hidden mb-10">
         <Common/>
   
        <div>
          {children}
        </div>
      </div >

    </>
  );
}