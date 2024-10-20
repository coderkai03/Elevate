"use client";
import { cn } from "@/utils";
import { ConnectionMessage, JSONMessage, useVoice } from "@humeai/voice-react";
import { motion } from "framer-motion";
import { ComponentRef, forwardRef, useEffect, useState } from "react";
import { expressionEmojis } from "@/utils/expressionLabels";

// Define the type for props
interface MessagesProps {
  setLoggedMessages: (
    message: (JSONMessage | ConnectionMessage)[] | ((prev: (JSONMessage | ConnectionMessage)[]) => (JSONMessage | ConnectionMessage)[])
  ) => void;
}

// Define a specific interface for Assistant Messages
interface AssistantMessage {
  type: "assistant_message";
  id: string;
  message: {
    role: string;
    content: string;
  };
}

type LoggedMessage = JSONMessage | ConnectionMessage | AssistantMessage;


const Messages = forwardRef<ComponentRef<typeof motion.div>, MessagesProps>(
  function Messages({ setLoggedMessages }, ref) {
    const { messages } = useVoice();
    const [displayedMessage, setDisplayedMessage] = useState<string>("Say Hello To Start!");
    const [processedAssistantIds, setProcessedAssistantIds] = useState<Set<string>>(new Set());
    const processAssistantMessages = () => {
      // Find the latest assistant message by iterating backwards
      let latestAssistantMessage: AssistantMessage | null = null;
    
      for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        if (
          msg.type === "assistant_message" &&
          msg.message &&
          typeof msg.message.content === "string" &&
          typeof msg.id === "string" &&
          !processedAssistantIds.has(msg.id)
        ) {
          latestAssistantMessage = msg as AssistantMessage;
          break; // Once the most recent assistant message is found, stop the loop
        }
      }
    
      // If no new assistant message is found, return
      if (!latestAssistantMessage) return;
    
      // Update the displayed message with only the latest assistant message content
      setDisplayedMessage(latestAssistantMessage.message.content);
    
      // Add the message ID to the processed set to avoid future duplication
      setProcessedAssistantIds((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.add(latestAssistantMessage!.id);
        return updatedSet;
      });
    
      // Update the logged messages with only the latest assistant message
      setLoggedMessages((prevLoggedMessages: (JSONMessage | ConnectionMessage)[]) => [
        ...prevLoggedMessages,
        latestAssistantMessage! as JSONMessage | ConnectionMessage, // Cast to satisfy the type
      ]);
    };
    
    
    

    useEffect(() => {
      processAssistantMessages();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]); // Dependency array ensures this runs whenever 'messages' updates

    return (
      <motion.div
        layoutScroll
        ref={ref}
        className={"flex justify-center items-center mt-[200px] mb-[-50px] text-[#3D364B]"}
      >
        <motion.div
          className={"max-w-2xl mx-auto w-full flex flex-col gap-4 pb-24 text-center"}
        >
          {/* Fade-up effect on new message */}
          <motion.h1
            className="text-3xl font-bold m-auto"
            key={displayedMessage} // Use the message content as a key to trigger the animation on change
            initial={{ opacity: 0, y: 20 }} // Initial state: faded out and below position
            animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
            exit={{ opacity: 0, y: -20 }} // Exit state: fade out and move upward
            transition={{ duration: 0.5 }} // Duration of the transition
          >
            {displayedMessage} {/* Display the entire concatenated assistant messages */}
          </motion.h1>
        </motion.div>
      </motion.div>
    );
  }
);

export default Messages;