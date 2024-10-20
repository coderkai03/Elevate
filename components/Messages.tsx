"use client";
import { cn } from "@/utils";
import { ConnectionMessage, JSONMessage, useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef, useEffect, useState } from "react";

const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  { setLoggedMessages: (message: (JSONMessage | ConnectionMessage)[]) => void }
>(function Messages({ setLoggedMessages }, ref) {
  const { messages } = useVoice();

  useEffect(() => {
    if (messages.length === 0) return;
    
    const lastMessage = messages[messages.length - 1];
    if (
      (lastMessage?.type === "assistant_message" ||
        lastMessage?.type === "user_message") &&
      "message" in lastMessage &&
      lastMessage.message.content
    ) {
      setLoggedMessages([...messages, lastMessage]);
      console.log(lastMessage.message.content);
    }
  }, [messages]);

  return (
    <motion.div
      layoutScroll
      // className={"grow rounded-md overflow-auto p-4"}
      ref={ref}
    >
      <motion.div
        className={"max-w-2xl mx-auto w-full flex flex-col gap-4 pb-24"}
      >
        <AnimatePresence mode={"popLayout"}>
          {messages.map((msg, index) => {
            if (
              msg.type === "user_message" ||
              msg.type === "assistant_message"
            ) {
              return (
                <motion.div
                  key={msg.type + index}
                  className={cn(
                    "w-[80%]",
                    "bg-card",
                    "border border-border rounded",
                    msg.type === "user_message" ? "ml-auto" : ""
                  )}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 0,
                  }}
                >
                  <div
                    className={cn(
                      "text-xs capitalize font-medium leading-none opacity-50 pt-4 px-3"
                    )}
                  >
                    {msg.message.role}
                  </div>
                  <div className={"pb-3 px-3"}>{msg.message.content}</div>
                  <Expressions values={{ ...msg.models.prosody?.scores }} />
                </motion.div>
              );
            }

            return null;
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});

//function that logs the messages to the console
function logMessages(message: string | undefined) {
  if (message) {
    console.log(message);
  }
  return message;
}

export default Messages;
