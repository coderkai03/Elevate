"use client";
import { ConnectionMessage, JSONMessage, useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, MicOff, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "./ui/toggle";
import MicFFT from "./MicFFT";
import { GoogleGenerativeAI } from "@google/generative-ai"
import { cn } from "@/utils";
import { AssistantMessage } from "hume/api/resources/empathicVoice/types/AssistantMessage";
import { UserMessage } from "hume/api/resources/empathicVoice/types/UserMessage";
import { createCase } from "@/app/test/actions/caseActions";

export default function Controls({
  loggedMessages,
}: {
  loggedMessages: (JSONMessage | ConnectionMessage)[];
}) {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();

  return (
    <div
      className={
        cn(
          "fixed bottom-0 left-80 p-4",
        )
      }
    >
      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: "100%",
              opacity: 0,
            }}
            className={
              "p-4 bg-card border border-border rounded-lg shadow-sm flex items-center gap-4"
            }
          >
            <Toggle
              pressed={!isMuted}
              onPressedChange={() => {
                if (isMuted) {
                  unmute();
                } else {
                  mute();
                }
              }}
            >
              {isMuted ? (
                <MicOff className={"size-4"} />
              ) : (
                <Mic className={"size-4"} />
              )}
            </Toggle>

            <div className={"relative grid h-8 w-48 shrink grow-0"}>
              <MicFFT fft={micFft} className={"fill-current"} />
            </div>

            {/* <Button
              className={"flex items-center gap-1"}
              onClick={async () => {
                disconnect();
                parseMessages(loggedMessages);
              }}
              variant={"destructive"}
            >
              <span>
                <Phone
                  className={"size-4 opacity-50"}
                  strokeWidth={2}
                  stroke={"currentColor"}
                />
              </span>
              <span>End Call</span>
            </Button> */}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
