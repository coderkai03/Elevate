"use client";

import { ConnectionMessage, JSONMessage, VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef, useState } from "react";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);

  const [loggedMessages, setLoggedMessages] = useState<
    (JSONMessage | ConnectionMessage)[]
  >([]);

  // optional: use configId from environment variable
  const configId = process.env['NEXT_PUBLIC_HUME_CONFIG_ID'];
  
  return (
    <div
      className={
        "relative flex flex-col mx-auto w-full overflow-auto h-full"
      }
    >
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId={configId}
        onMessage={() => {
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }

          timeout.current = window.setTimeout(() => {
            if (ref.current) {
              const scrollHeight = ref.current.scrollHeight;

              ref.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
              });
            }
          }, 200);
        }}
      >
        <Messages ref={ref} setLoggedMessages={setLoggedMessages} />
        <Controls loggedMessages={loggedMessages} />
        <StartCall loggedMessages={loggedMessages} />
      </VoiceProvider>
    </div>
  );
}