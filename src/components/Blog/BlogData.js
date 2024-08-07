import Agile from "./Agile";
import AllPost from "./AllPost";
import Event from "./Events";
import News from "./News";
import Technicals from "./Technicals";

export default function BlogData({params,searchParams}){
    return(
        <>
          {params.blogType=='allPost' && <AllPost searchParams={searchParams}/>}
          {params.blogType=='technical' && <Technicals />}
          {params.blogType=='agile' && <Agile />}
          {params.blogType=='news' && <News />}
          {params.blogType=='events' && <Event />}
        </>
    )
}