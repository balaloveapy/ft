'use client'
import { useRef } from "react";
export default function Canva() {
  const referencia = useRef<HTMLVideoElement>(null)
  const referenciaCanva = useRef<HTMLCanvasElement>(null)
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      referencia.current!.srcObject = stream
      referencia.current!.play()

    })
    .catch(error => {
      console.log(error)
    })
  function click() {
    const canva = referenciaCanva.current!.getContext('2d')
    if (canva && referencia.current) {
      canva.drawImage(referencia.current, 0, 0,referencia.current.width,referencia.current.height)

    }
  }
    return (
      <div>
        <video ref={referencia}></video>
        <canvas ref={referenciaCanva}></canvas>
        <button onClick={click}>tirar foto</button>
      </div>
    );
  }
