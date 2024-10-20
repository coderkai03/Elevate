import React, { useEffect, useRef, useState } from 'react';

const Waveform: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [volume, setVolume] = useState(0); // Volume based on user input

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let wave1 = {
      y: canvas.height / 2,
      length: 0.015,
      amplitude: 50,
      frequency: 0.01
    };

    let wave2 = {
      y: canvas.height / 2,
      length: 0.01, // Different length for the second wave
      amplitude: 50, // Different amplitude for the second wave
      frequency: 0.015 // Different frequency for the second wave
    };

    let increment1 = wave1.frequency;
    let increment2 = wave2.frequency;

    function animate() {
      if (!ctx || !isAnimating) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient for the first waveform
      const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient1.addColorStop(0, 'rgba(73, 132, 238, 0.6)'); // Blue
      gradient1.addColorStop(1, 'rgba(151, 71, 255, 0.6)'); // Purple

      // Create gradient for the second waveform
      const gradientFill = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradientFill.addColorStop(0, 'rgba(73, 132, 238, 0.3)'); // Orange
      gradientFill.addColorStop(1, 'rgba(151, 71, 255, 0.3)');   // Blue

      // Adjust wave amplitude based on volume (from mic input)
      wave1.amplitude = 30 + volume * 70;
      wave2.amplitude = 30 + volume * 70;

      // Draw first waveform
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

      // Draw second waveform (overlay)
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(
          i,
          wave2.y + Math.sin(i * wave2.length + increment2) * wave2.amplitude * Math.sin(increment2)
        );
      }

      // Connect the end of the waveform back to the baseline
      ctx.lineTo(canvas.width, canvas.height/2);  //Draw a line to the bottom-right corner
      ctx.lineTo(0, canvas.height/2);             //Draw a line back to the starting point
      ctx.closePath();

      // Fill the area under the waveform
      ctx.fillStyle = gradientFill;
      ctx.fill();   // Fill the area with the gradient

      ctx.strokeStyle = gradientFill;   // Optionally, you can outline the filled wave
      ctx.lineWidth = 2;
      ctx.stroke();

      // Increment for both waves
      increment1 += wave1.frequency;
      increment2 += wave2.frequency;

      requestAnimationFrame(animate);
    }

    if (isAnimating){
        animate();
    }

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animate);
    };
  }, [isAnimating, volume]);

  const toggleAnimation = async () => {
    if (isAnimating) {
        setIsAnimating(false);
        audioContext?.close(); // Stop audio processing
      } else {
        setIsAnimating(true);
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(audioCtx);
  
        const analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 256;
        setAnalyser(analyserNode);
  
        // Access the microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyserNode);
  
        // Get the volume from the mic input
        const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
        const updateVolume = () => {
          if (analyserNode) {
            analyserNode.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
            setVolume(average / 256); // Normalize to a range of 0-1
            requestAnimationFrame(updateVolume);
          }
        };
        updateVolume();
      }
  };

  // Inline CSS for canvas and body
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        overflow: 'hidden',
    }}>
        <canvas
        ref={canvasRef}
        style={{
            display: 'block',
            width: '50vw',
            height: '100vh',
        }}
        />
        <button
            onClick={toggleAnimation}
            style={{
                marginTop: '20px',
                padding: '10px 20px',
                fontSize: '18px',
                cursor: 'pointer',
            }}
        >
            {isAnimating ? 'Start' : 'Stop'}
        </button>
    </div>
  );
};

export default Waveform;
