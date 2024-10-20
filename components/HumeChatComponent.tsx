"use server";
import dynamic from "next/dynamic";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken"; // Import the token fetching function

// Dynamically import the Chat component
const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: false,
});

// A reusable component that fetches the Hume access token and renders the Chat component
const HumeChatComponent = async () => {
  const accessToken = await getHumeAccessToken(); // Fetch the access token

  if (!accessToken) {
    throw new Error("Failed to fetch access token");
  }

  return (
    // <div className="grow flex flex-col">
      <Chat accessToken={accessToken} />
    // </div>
  );
};

export default HumeChatComponent;