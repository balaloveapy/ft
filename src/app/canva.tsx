'use client'
import { useRef, useEffect } from "react";
export default function Home() {
    const referencia = useRef<HTMLVideoElement>(null);
    const referenciaCanva = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    console.log(stream)
                    if (referencia.current) {
                        referencia.current.srcObject = stream;
                        referencia.current.play();
                    }
                })
                .catch(error => {
                    console.log("Error accessing webcam:", error);
                });
        }
    }, []);
        let text = ''
    const takePhoto = () => {
        text = referencia.current+''
        if (referencia.current && referenciaCanva.current) {
            const canvas = referenciaCanva.current.getContext('2d');
            if (canvas) {
                canvas.drawImage(referencia.current, 0, 0, referenciaCanva.current.width, referenciaCanva.current.height);
            }
        }
    };

    return (
        <div>
            <video className="" ref={referencia} autoPlay></video>
            <div className="top-0 absolute  bg-black w-full h-full">
                <button className="bg-slate-300 text-white" onClick={takePhoto}>Take Photo</button>
                <canvas ref={referenciaCanva} className="w-28 h-28"></canvas>
                {text}
            </div>
        </div>
    );
}
