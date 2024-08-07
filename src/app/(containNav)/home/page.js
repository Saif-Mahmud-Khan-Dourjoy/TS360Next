
import HomeSection from '@/components/Home/HomeSection'
import '/public/css/home.css'

export async function generateMetadata() {
    return {
        title: "Home",
        description: "Automate your Testing now",
    }
};



export default function Home() {

    return(
        <>
         <HomeSection/>
        </>
    )

}