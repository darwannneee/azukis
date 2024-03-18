import Image from "next/image";
import gambar from "./assets/img/graffiti_bg_final.jpg"
import shao from "./assets/img/shao.png"
import shao1 from "./assets/img/shaos.png"
import shao2 from "./assets/img/shao_e.png"
import Lenis from '@studio-freight/lenis'

export default function Home() {

  
  return (
    
<main className="pointer-events-none n">

<div className="bg-black relative h-screen" style={{ aspectRatio: '6151 / 1080' }}>
  <img src={shao.src} className="absolute z-20 duration-200 select-none left-1" style={{ height: '49%', left: '0.53%', bottom: '5%' }} />
  <img src={shao1.src} className="absolute z-20 duration-200 select-none left-1" style={{ height: '47.6%', left: '22.8%', bottom: '6%' }} />
  <img src={shao2.src} className="absolute z-20 duration-200 select-none left-1" style={{ height: '29%', left: '43.3%', bottom: '5%' }} />
  <img src={gambar.src} />

  <div className="fixed duration-300 z-50 rounded-lg shadow-smooth text-white px-5 py-5 origin-bottom-right overflow-hidden backdrop:blur-lg bg-black/80 scale-100" style={{
    paddingLeft: '20px', paddingRight: '20px', width: '400px', right: '8px', bottom: '8px', transition: 'opacity 0.5s ease-in-out', opacity: '0.95'
  }}>
    <div className="w-full">
      <div className="overflow-hidden" style={{ maxWidth: '360px' }}>
        <div className="overflow-hidden">
          <div className="text-sm opacity-90">
            <div className="duration-[1500ms] opacity-100">
              <p>Soon after, the first adventurers arrived in the Garden, forming the first communities on this new land.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</main>

  )}