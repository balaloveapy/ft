'use client'
import { useRef, useEffect } from "react";
import { valores } from "./getall";
export default function Home() {
    const referencia = useRef<HTMLVideoElement>(null);
    const referenciaCanva = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    if (referencia.current) {
                        referencia.current.srcObject = stream;
                        referencia.current.play();
                    }
                })
                .catch(error => {
                    console.log('error');
                });
        }
    }, []);
    
    const takePhoto = () => {
        if (referencia.current && referenciaCanva.current) {
          const canvas = referenciaCanva.current.getContext('2d');
          if (canvas) {
            canvas.drawImage(referencia.current, 0, 0, referenciaCanva.current.width, referenciaCanva.current.height);
            const dataUrl = referenciaCanva.current.toDataURL('image/jpeg');
            const imageBlob = dataURLToBlob(dataUrl); // Convert the data URL to a Blob with the correct MIME type
            const file = new File([imageBlob], 'photo.jpeg', { type: 'image/jpeg' }); // Create a File object from the Blob
            valores(file); // Pass the File object to the valores function
          }
        }
      };
      
      function dataURLToBlob(dataUrl: string) {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/);
        if (!mime) {
          throw new Error('Invalid data URL');
        }
        const mimeType = mime[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mimeType });
      }

    return (
        <div>
            <video className="" ref={referencia} autoPlay></video>
            <div className="top-0 absolute  bg-black w-full h-full">
                <button className="bg-slate-300 text-white" onClick={takePhoto}>Take Photo</button>
                <canvas ref={referenciaCanva} className="w-28 h-28"></canvas>
            </div>
        </div>
    );
}
