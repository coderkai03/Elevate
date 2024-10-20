// "use client";

// import { cn } from "@/utils";
// import { ConnectionMessage, JSONMessage, useVoice } from "@humeai/voice-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ComponentRef, forwardRef, useEffect, useState } from "react";
// import { expressionLabels, expressionEmojis, categorizedExpressions } from "@/utils/expressionLabels";

// interface MessagesProps {
//   setLoggedMessages: (
//     message: (JSONMessage | ConnectionMessage)[] | ((prev: (JSONMessage | ConnectionMessage)[]) => (JSONMessage | ConnectionMessage)[])
//   ) => void;
// }

// interface AssistantMessage {
//   type: "assistant_message";
//   id: string;
//   message: {
//     role: string;
//     content: string;
//   };
// }

// type LoggedMessage = JSONMessage | ConnectionMessage | AssistantMessage;

// interface FloatingEmoji {
//   id: number;
//   emoji: string;
//   x: number;
//   y: number;
//   size: number;
// }

// const Messages = forwardRef<ComponentRef<typeof motion.div>, MessagesProps>(
//   function Messages({ setLoggedMessages }, ref) {
//     const { messages } = useVoice();
//     const [displayedMessage, setDisplayedMessage] = useState<string>("Say Hello To Start!");
//     const [processedAssistantIds, setProcessedAssistantIds] = useState<Set<string>>(new Set());
//     const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
//     const [detectedEmotions, setDetectedEmotions] = useState<string[]>([]);

//     const processAssistantMessages = () => {
//       let latestAssistantMessage: AssistantMessage | null = null;
    
//       for (let i = messages.length - 1; i >= 0; i--) {
//         const msg = messages[i];
//         if (
//           msg.type === "assistant_message" &&
//           msg.message &&
//           typeof msg.message.content === "string" &&
//           typeof msg.id === "string" &&
//           !processedAssistantIds.has(msg.id)
//         ) {
//           latestAssistantMessage = msg as AssistantMessage;
//           break;
//         }
//       }
    
//       if (!latestAssistantMessage) return;

//       // Simulate emotion detection (replace with actual logic)
//       const allEmotions = Object.keys(expressionLabels);
//       const detectedEmotions = allEmotions
//         .sort(() => Math.random() - 0.5)
//         .slice(0, 3)
//         .map(key => expressionLabels[key]);
//       setDetectedEmotions(detectedEmotions);

//       // Create random emojis
//       const emojisToFloat = Object.keys(expressionEmojis)
//         .sort(() => Math.random() - 0.5)
//         .slice(0, 5)
//         .map((key) => ({
//           id: Date.now() + Math.random(),
//           emoji: expressionEmojis[key],
//           x: Math.random() * 100 - 50, // Random position from -50% to 50% of screen width
//           y: Math.random() * 100 - 50, // Random position from -50% to 50% of screen height
//           size: Math.random() * 2 + 1 // Random size between 1rem and 3rem
//         }));

//       setFloatingEmojis(prev => [...prev, ...emojisToFloat]);
    
//       setDisplayedMessage(latestAssistantMessage.message.content);
    
//       setProcessedAssistantIds((prev) => {
//         const updatedSet = new Set(prev);
//         updatedSet.add(latestAssistantMessage!.id);
//         return updatedSet;
//       });
    
//       setLoggedMessages((prevLoggedMessages: (JSONMessage | ConnectionMessage)[]) => [
//         ...prevLoggedMessages,
//         latestAssistantMessage! as JSONMessage | ConnectionMessage,
//       ]);
//     };

//     useEffect(() => {
//       processAssistantMessages();
//     }, [messages]);

//     const getEmotionCategory = (emotion: string): string => {
//       for (const [category, emotions] of Object.entries(categorizedExpressions)) {
//         if (emotions.includes(emotion)) {
//           return category;
//         }
//       }
//       return "neutral";
//     };

//     const getCategoryColor = (category: string): string => {
//       switch (category) {
//         case "positive":
//           return "bg-green-100 text-green-600 fill-green-400";
//         case "negative":
//           return "bg-red-100 text-red-600 fill-red-400";
//         case "drive":
//           return "bg-yellow-100 text-yellow-600 fill-yellow-400";
//         case "complexSocial":
//           return "bg-purple-100 text-purple-600 fill-purple-400";
//         case "reflective":
//           return "bg-blue-100 text-blue-600 fill-blue-400";
//         default:
//           return "bg-gray-100 text-gray-600 fill-gray-400";
//       }
//     };

//     return (
//       <motion.div
//         layoutScroll
//         ref={ref}
//         className="flex flex-col items-center justify-center mt-[200px] mb-[-50px] text-[#3D364B] relative w-full h-screen"
//       >
//         <AnimatePresence>
//           {floatingEmojis.map(({ id, emoji, x, y, size }) => (
//             <motion.span
//               key={id}
//               className="absolute"
//               initial={{ opacity: 1, x: `${x}%`, y: `${y}%` }}
//               animate={{
//                 opacity: 0,
//                 x: `${x + (Math.random() - 0.5) * 20}%`,
//                 y: `${y - 20}%`,
//               }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 2 }}
//               style={{ fontSize: `${size}rem` }}
//               onAnimationComplete={() => setFloatingEmojis(prev => prev.filter(e => e.id !== id))}
//             >
//               {emoji}
//             </motion.span>
//           ))}
//         </AnimatePresence>

//         <motion.div className="max-w-2xl mx-auto w-full flex flex-col gap-4 pb-24 text-center">
//           <motion.h1
//             className="text-3xl font-bold m-auto bg-gradient-to-r from-[#3D364B] to-[#818080] bg-clip-text text-transparent"
//             key={displayedMessage}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//           >
//             {displayedMessage}
//           </motion.h1>
//         </motion.div>

//         <div className="flex flex-wrap justify-center gap-2 mt-4">
//           {detectedEmotions.map((emotion, index) => {
//             const category = getEmotionCategory(emotion);
//             const categoryColor = getCategoryColor(category);
//             return (
//               <motion.span
//                 key={index}
//                 className={cn(
//                   "inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium",
//                   categoryColor
//                 )}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5">
//                   <circle r={3} cx={3} cy={3} />
//                 </svg>
//                 {emotion}
//               </motion.span>
//             );
//           })}
//         </div>
//       </motion.div>
//     );
//   }
// );

// export default Messages;

"use client";

import { cn } from "@/utils";
import { ConnectionMessage, JSONMessage, useVoice } from "@humeai/voice-react";
import { motion, AnimatePresence } from "framer-motion";
import { ComponentRef, forwardRef, useEffect, useState } from "react";
import { expressionLabels, expressionEmojis, categorizedExpressions } from "@/utils/expressionLabels";

interface MessagesProps {
  setLoggedMessages: (
    message: (JSONMessage | ConnectionMessage)[] | ((prev: (JSONMessage | ConnectionMessage)[]) => (JSONMessage | ConnectionMessage)[])
  ) => void;
}

interface AssistantMessage {
  type: "assistant_message";
  id: string;
  message: {
    role: string;
    content: string;
  };
}

type LoggedMessage = JSONMessage | ConnectionMessage | AssistantMessage;

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
}

const Messages = forwardRef<ComponentRef<typeof motion.div>, MessagesProps>(function Messages(
  { setLoggedMessages },
  ref
) {
  const { messages } = useVoice();
  const [displayedMessage, setDisplayedMessage] = useState<string>("Say Hello To Start!");
  const [processedAssistantIds, setProcessedAssistantIds] = useState<Set<string>>(new Set());
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [detectedEmotions, setDetectedEmotions] = useState<string[]>([]);

  const processAssistantMessages = () => {
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
        break;
      }
    }

    if (!latestAssistantMessage) return;

    // Simulate emotion detection (replace with actual logic)
    const allEmotions = Object.keys(expressionLabels);
    const detectedEmotions = allEmotions
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((key) => expressionLabels[key]);
    setDetectedEmotions(detectedEmotions);

    // Create random emojis
    const emojisToFloat = Object.keys(expressionEmojis)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
      .map((key) => ({
        id: Date.now() + Math.random(),
        emoji: expressionEmojis[key],
        x: Math.random() * 100 - 50, // Random position from -50% to 50% of screen width
        y: Math.random() * 100 - 50, // Random position from -50% to 50% of screen height
        size: Math.random() * 2 + 1, // Random size between 1rem and 3rem
      }));

    setFloatingEmojis((prev) => [...prev, ...emojisToFloat]);

    setDisplayedMessage(latestAssistantMessage.message.content);

    setProcessedAssistantIds((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.add(latestAssistantMessage!.id);
      return updatedSet;
    });

    setLoggedMessages((prevLoggedMessages: (JSONMessage | ConnectionMessage)[]) => [
      ...prevLoggedMessages,
      latestAssistantMessage! as JSONMessage | ConnectionMessage,
    ]);
  };

  useEffect(() => {
    processAssistantMessages();
  }, [messages]);

  const getEmotionCategory = (emotion: string): string => {
    for (const [category, emotions] of Object.entries(categorizedExpressions)) {
      if (emotions.includes(emotion)) {
        return category;
      }
    }
    return "neutral";
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "positive":
        return "bg-green-100 text-green-600 fill-green-400";
      case "negative":
        return "bg-red-100 text-red-600 fill-red-400";
      case "drive":
        return "bg-yellow-100 text-yellow-600 fill-yellow-400";
      case "complexSocial":
        return "bg-purple-100 text-purple-600 fill-purple-400";
      case "reflective":
        return "bg-blue-100 text-blue-600 fill-blue-400";
      default:
        return "bg-gray-100 text-gray-600 fill-gray-400";
    }
  };

  return (
    <motion.div
      layoutScroll
      ref={ref}
      className="flex flex-col items-center justify-center mt-[150px] text-[#3D364B] relative"
    >
      <AnimatePresence>
      {floatingEmojis.map(({ id, emoji, x, y, size }) => (
        <motion.span
          key={id}
          className="absolute"
          initial={{ opacity: 1, x: `${x}`, y: `${y}` }} // Random start position
          animate={{
            opacity: 0,
            x: `${x + (Math.random() - 0.5) * 300}%`, // Larger random horizontal movement
            y: `${y + (Math.random() - 0.5) * 300}%`, // Larger random vertical movement
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          style={{ fontSize: `${size}rem` }}
          onAnimationComplete={() => setFloatingEmojis(prev => prev.filter(e => e.id !== id))}
        >
          {emoji}
        </motion.span>
      ))}

      </AnimatePresence>

      <motion.div className="max-w-2xl mx-auto w-full flex flex-col gap-4 pb-12 text-center">
        <motion.h1
          className="text-3xl font-bold bg-gradient-to-r from-[#3D364B] to-[#818080] bg-clip-text text-transparent"
          key={displayedMessage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {displayedMessage}
        </motion.h1>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {detectedEmotions.map((emotion, index) => {
          const category = getEmotionCategory(emotion);
          const categoryColor = getCategoryColor(category);
          return (
            <motion.span
              key={index}
              className={cn(
                "inline-flex items-center gap-x-2 rounded-full px-4 py-2 text-sm font-medium", // Increased padding, gap, and text size
                categoryColor
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <svg viewBox="0 0 6 6" aria-hidden="true" className="h-3 w-3"> {/* Increased icon size */}
                <circle r={3} cx={3} cy={3} />
              </svg>
              {emotion}
            </motion.span>
          );
        })}
      </div>

    </motion.div>
  );
});

export default Messages;
