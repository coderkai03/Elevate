"use client";
import { ConnectionMessage, JSONMessage, useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, MicOff, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "./ui/toggle";
import MicFFT from "./MicFFT";
import { cn } from "@/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AssistantMessage } from "hume/api/resources/empathicVoice/types/AssistantMessage";
import { UserMessage } from "hume/api/resources/empathicVoice/types/UserMessage";

export default function Controls({
  loggedMessages,
}: {
  loggedMessages: (JSONMessage | ConnectionMessage)[];
}) {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY ?? '');

  return (
    <div
      className={
        cn(
          "fixed bottom-0 left-0 w-full p-4 flex items-center justify-center",
          "bg-gradient-to-t from-card via-card/90 to-card/0",
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

            <Button
              className={"flex items-center gap-1"}
              onClick={async () => {
                disconnect();
                // ask gemini to summarize the conversation
                const model = genAI.getGenerativeModel({ model: "gemini-pro" });
                const conversation = loggedMessages
                  .filter((msg): msg is (JSONMessage | ConnectionMessage) =>
                    (msg?.type === "user_message" ||
                    msg?.type === "assistant_message") &&
                    "message" in msg &&
                    msg.message?.content !== undefined
                  )
                  .map((msg) => {
                    if (
                      (msg?.type === "assistant_message" ||
                        msg?.type === "user_message") &&
                      "message" in msg &&
                      msg.message.content
                    ) {
                      return msg.message.content;
                    }
                    return '';
                  })
                  .join("\n");
                console.log(conversation);

                const response = await model.generateContent(
                  `This is a conversation between a homeless person and a case worker: ${conversation}.
                  Please summarize the homeless person's story in a few sentences.`,
                );
                console.log(response.response.text());
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
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
