'use client'
import { useRef, useEffect } from "react";

export default function Home() {
  const referencia = useRef<HTMLVideoElement>(null);
  const referenciaCanva = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          
        })
        .catch(error => {
          console.log("Error accessing webcam:", error);
        });
    }
  }, []);

  const takePhoto = () => {
    if (referencia.current && referenciaCanva.current) {
      const canvas = referenciaCanva.current.getContext('2d');
      if (canvas) {
        canvas.drawImage(referencia.current, 0, 0, referenciaCanva.current.width, referenciaCanva.current.height);
      }
    }
  };

  return (
    <div>
      <video ref={referencia} autoPlay></video>
      <canvas ref={referenciaCanva} className="w-28 h-28"></canvas>
      <button onClick={takePhoto}>Take Photo</button>
    </div>
  );
}
