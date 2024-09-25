import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import Landing from "../components/landing";
import { BackgroundLines } from "../components/ui/background-lines";
import ShowToast from '../components/showToast';


export default async function Page() {

  return (
    <>
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <Landing />
    </BackgroundLines>
    </>
  );
}
