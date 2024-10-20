import React, { useEffect, useRef, useState, useMemo } from 'react';
import { ConnectionMessage, JSONMessage, useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Mic, Phone } from "lucide-react";
import TaskManager from '@/components/TaskManager';
import { createCase } from '@/app/test/actions/caseActions';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function StartCall({ loggedMessages }: { loggedMessages: (JSONMessage | ConnectionMessage)[] }) {
  const { status, connect } = useVoice();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [volume, setVolume] = useState(0);
  const [question, setQuestion] = useState("Say Hello!");
  const [isMuted, setIsMuted] = useState(false); // New state to track mute/unmute
  const [isCallStarted, setIsCallStarted] = useState(false); // Track if the call is started

  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 900;
    canvas.height = 200;

    let wave1 = {
      y: canvas.height / 2,
      length: 0.015,
      amplitude: 50,
      frequency: 0.01
    };

    let wave2 = {
      y: canvas.height / 2,
      length: 0.01,
      amplitude: 50,
      frequency: 0.015
    };

    let increment1 = wave1.frequency;
    let increment2 = wave2.frequency;

    function animate() {
      if (!ctx || !isAnimating) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient1.addColorStop(0, 'rgba(73, 132, 238, 0.6)');
      gradient1.addColorStop(1, 'rgba(151, 71, 255, 0.6)');

      const gradientFill = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradientFill.addColorStop(0, 'rgba(73, 132, 238, 0.3)');
      gradientFill.addColorStop(1, 'rgba(151, 71, 255, 0.3)');

      wave1.amplitude = 30 + volume * 70;
      wave2.amplitude = 30 + volume * 70;

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(
          i,
          wave1.y + Math.sin(i * wave1.length + increment1) * wave1.amplitude * Math.sin(increment1)
        );
      }

      ctx.strokeStyle = gradient1;
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(
          i,
          wave2.y + Math.sin(i * wave2.length + increment2) * wave2.amplitude * Math.sin(increment2)
        );
      }

      ctx.lineTo(canvas.width, canvas.height/2);
      ctx.lineTo(0, canvas.height/2);
      ctx.closePath();

      ctx.fillStyle = gradientFill;
      ctx.fill();

      ctx.strokeStyle = gradientFill;
      ctx.lineWidth = 2;
      ctx.stroke();

      increment1 += wave1.frequency;
      increment2 += wave2.frequency;

      requestAnimationFrame(animate);
    }

    if (isAnimating) {
      animate();
    }

    return () => {
      cancelAnimationFrame(animate);
    };
  }, [isAnimating, volume, isMuted]);

  const toggleAnimation = async () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsCallStarted(true); // Hide the button once the call starts
      connect().catch(console.error);
    }
  };

  // Toggle mute/unmute state
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleExit = () => {
    console.log("Exit button clicked");
    parseMessages(loggedMessages);
    return <TaskManager/>
  };

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
        "profile_description": "Description of the homeless person",
        "tasks": [
          {
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
    try {
      const demographics = JSON.parse(response);
      const location = await fetchLocation(); // Properly await the location
      const id = Math.floor(Math.random() * 1000000)
      const caseData = {
        ...demographics,
        id: id,
        location: JSON.stringify(location),
        image_link: null,
        donation_amount: 0,
      };

      // Log the caseData object with all properties expanded
      console.log('Case Data:', JSON.parse(JSON.stringify(caseData)));

      const newCase = await createCase(caseData);

      console.log('New Case Result:', newCase);
      
      if (newCase.success) {
        console.log(`New case created successfully! Case ID: ${newCase.caseId}`);
        // fetchCasesAndTasks(); // Refresh the list after creating a new case
      } else {
        console.error(newCase.error || "Error creating new case. Please try again.");
      }
    } catch (error) {
      console.error('Error in handleCreateNewCase:', error);
    }
  };

  const fetchLocation = (): Promise<{ lat: number; lon: number } | null> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ lat: latitude, lon: longitude });
          },
          (err) => {
            console.error(`Geolocation error: ${err.message}`);
            resolve(null); // Resolve with null in case of error
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        resolve(null);
      }
    });
  };

  return (
    <div className="relativex">
      <Button
        onClick = {handleExit}
        className = {`
            absolute bottom-4 right-4 z-50 
          bg-[#74D680] text-[#F7F7F7] hover:bg-[#4E8354]
            px-6 py-3 text-xl font-bold
        `}
      >  
        COMPLETE
      </Button>
      <AnimatePresence>
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            className="relative"
          >
            <div className="relative w-[900px] h-[300px]">
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-[200px]"
              />
              <Button
                className="
                  absolute bottom-0 left-1/2 transform -translate-x-1/2 
                  z-50 flex items-center justify-center
                  w-[150px] h-[50px] rounded-md
                  bg-[#9687EC] hover:bg-[#9687ec95]
                "
                onClick={toggleAnimation}
              >
                <Phone
                  className="size-6 mr-4"
                  strokeWidth={2}
                  stroke="#F7F7F7"
                />
                Start Call
              </Button>
              {/* <Button
                className="
                  absolute bottom-0 left-1/2 transform -translate-x-1/2 
                  z-50 flex items-center justify-center
                  w-32 h-32 rounded-full
                  bg-[#D9D9D9] hover:bg-[#C9C9C9]
                  shadow-[inset_0px_0px_8px_2px_#9747FF]
                "
                onClick={toggleAnimation}
              >
                <Mic
                  className="size-12"
                  strokeWidth={2}
                  stroke="#3D364B"
                />
              </Button> */}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
