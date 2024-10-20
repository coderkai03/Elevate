import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";


const Home = dynamic(() => import('../components/Home'), {
  ssr: false, 
});


export default async function Page() {
  const accessToken = await getHumeAccessToken();

  return (
    <div className={"grow flex flex-col"}>
      <Home /> {/* Corrected JSX syntax */}
    </div>
  );
}