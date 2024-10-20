import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Mic, MicOff } from "lucide-react";

export default function StartCall() {
  const { status, connect } = useVoice();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [volume, setVolume] = useState(0);

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
  }, [isAnimating, volume]);

  const toggleAnimation = async () => {
    if (!isAnimating) {
      setIsAnimating(true);
      connect().catch(console.error);
    }
  };

  return (
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
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// import React, { useEffect, useRef, useState, useMemo } from 'react';
// import { useVoice } from "@humeai/voice-react";
// import { AnimatePresence, motion } from "framer-motion";
// import { Button } from "./ui/button";
// import { Mic, MicOff, Phone } from "lucide-react";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export default function StartCall() {
//   const { status, connect, disconnect, micFft } = useVoice();
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY ?? '');

//   const volume = useMemo(() => {
//     if (!micFft) return 0;
//     const sum = micFft.reduce((acc, val) => acc + val, 0);
//     return sum / micFft.length / 255;
//   }, [micFft]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     canvas.width = 900;
//     canvas.height = 200;

//     let wave1 = {
//       y: canvas.height / 2,
//       length: 0.015,
//       amplitude: 50,
//       frequency: 0.01
//     };

//     let wave2 = {
//       y: canvas.height / 2,
//       length: 0.01,
//       amplitude: 50,
//       frequency: 0.015
//     };

//     let increment1 = wave1.frequency;
//     let increment2 = wave2.frequency;

//     function animate() {
//       if (!ctx || !isAnimating) return;

//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//       gradient1.addColorStop(0, 'rgba(73, 132, 238, 0.6)');
//       gradient1.addColorStop(1, 'rgba(151, 71, 255, 0.6)');

//       const gradientFill = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//       gradientFill.addColorStop(0, 'rgba(73, 132, 238, 0.3)');
//       gradientFill.addColorStop(1, 'rgba(151, 71, 255, 0.3)');

//       wave1.amplitude = 30 + volume * 70;
//       wave2.amplitude = 30 + volume * 70;

//       ctx.beginPath();
//       ctx.moveTo(0, canvas.height / 2);

//       for (let i = 0; i < canvas.width; i++) {
//         ctx.lineTo(
//           i,
//           wave1.y + Math.sin(i * wave1.length + increment1) * wave1.amplitude * Math.sin(increment1)
//         );
//       }

//       ctx.strokeStyle = gradient1;
//       ctx.lineWidth = 4;
//       ctx.stroke();

//       ctx.beginPath();
//       ctx.moveTo(0, canvas.height / 2);

//       for (let i = 0; i < canvas.width; i++) {
//         ctx.lineTo(
//           i,
//           wave2.y + Math.sin(i * wave2.length + increment2) * wave2.amplitude * Math.sin(increment2)
//         );
//       }

//       ctx.lineTo(canvas.width, canvas.height / 2);
//       ctx.lineTo(0, canvas.height / 2);
//       ctx.closePath();

//       ctx.fillStyle = gradientFill;
//       ctx.fill();

//       ctx.strokeStyle = gradientFill;
//       ctx.lineWidth = 2;
//       ctx.stroke();

//       increment1 += wave1.frequency;
//       increment2 += wave2.frequency;

//       requestAnimationFrame(animate);
//     }

//     if (isAnimating) {
//       animate();
//     }

//     return () => {
//       cancelAnimationFrame(animate);
//     };
//   }, [isAnimating, volume]);

//   const toggleAnimation = async () => {
//     if (!isAnimating) {
//       setIsAnimating(true);
//       connect().catch(console.error);
//     }
//   };

//   const handleEndCall = async () => {
//     disconnect();
//     // Here you can implement the logic to summarize the conversation
//     const conversation = "Your conversation data here"; // Replace with actual conversation data
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const response = await model.generateContent(
//       `This is a conversation: ${conversation}. Please summarize it in a few sentences.`
//     );
//     console.log(response.response.text());
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="relative flex items-center justify-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <motion.div
//           initial={{ scale: 0.5 }}
//           animate={{ scale: 1 }}
//           exit={{ scale: 0.5 }}
//           className="relative"
//         >
//           <div className="relative w-[900px] h-[300px]">
//             <canvas
//               ref={canvasRef}
//               className="absolute top-0 left-0 w-full h-[200px]"
//             />
//             <Button
//               className="
//                 absolute bottom-0 left-1/2 transform -translate-x-1/2 
//                 z-50 flex items-center justify-center
//                 w-32 h-32 rounded-full
//                 bg-[#D9D9D9] hover:bg-[#C9C9C9]
//                 shadow-[inset_0px_0px_8px_2px_#9747FF]
//               "
//               onClick={toggleAnimation}
//             >
//               <Mic
//                 className="size-12"
//                 strokeWidth={2}
//                 stroke="#3D364B"
//               />
//             </Button>
//             <Button
//               className="
//                 absolute top-0 right-0 transform translate-x-1/2 translate-y-1/2
//                 z-50 flex items-center justify-center
//                 w-32 h-12 rounded
//                 bg-red-500 text-white
//               "
//               onClick={handleEndCall}
//             >
//               <Phone className="size-4" />
//               <span>End Call</span>
//             </Button>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }