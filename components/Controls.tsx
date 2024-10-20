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

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY ?? '');

  const parseMessages = async (messages: (JSONMessage | ConnectionMessage)[]) => {
    // ask gemini to summarize the conversation
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const conversation = messages
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
      Please generate a recap of the conversation and map of (up to 5) tasks that the case worker can
      help the homeless person using the following JSON format. Do not include any other special characters:
      {
        "name": "Name of the homeless person",
        "age": "Age of the homeless person",
        "gender": "Gender of the homeless person",
        "location": "Location of the homeless person",
        "profile_description": "Description of the homeless person",
        "tasks": [
          {
            "id": Math.floor(Math.random() * 1000000),
            "case_id": 0,
            "name": "Name of the task",
            "description": "Description of the task",
            "completed": false,
            "createdAt": "YYYY-MM-DDTHH:mm:ss.sssZ",
            "updatedAt": "YYYY-MM-DDTHH:mm:ss.sssZ"
          },
        ]
      }`,
    );

    handleCreateNewCase(response.response.text());
    console.log(response.response.text());
  }

  const handleCreateNewCase = async (response: string) => {
    const demographics = JSON.parse(response);
    const newCase = await createCase({
      ...demographics,
      image_link: null,
      donation_amount: 0,
    });

    console.log(newCase);
    
    if (newCase.success) {
      console.log(`New case created successfully! Case ID: ${newCase.caseId}`);
      // fetchCasesAndTasks(); // Refresh the list after creating a new case
    } else {
      console.log(newCase.error || "Error creating new case. Please try again.");
    }
  }

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
