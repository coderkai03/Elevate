import Home from '@/components/Home';  // Add this import at the top of the file

export default async function Page() {
  // const accessToken = await getHumeAccessToken();

  // if (!accessToken) {
  //   throw new Error("Failed to get access token");
  // }

  return (
    <div className="grow flex flex-col">
      {/* <Chat accessToken={accessToken} /> */}
      <Home />
    </div>
  );
}
