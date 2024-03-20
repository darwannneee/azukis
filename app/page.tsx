"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gambar from "./assets/img/graffiti_bg_final.jpg";
import shao from "./assets/img/shao.png";
import shao1 from "./assets/img/shaos.png";
import shao2 from "./assets/img/shao_e.png";
import {Word1, Word2} from "./data/text"
import { useSound } from 'use-sound';


export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxLeftPosition, setMaxLeftPosition] = useState(0);
  const roundedRef = useRef(null);
  const [play, { stop }] = useSound('/song.mp3');
  const [isPlaying, setIsPlaying] = useState(false);
  const [calculatedWidth, setCalculatedWidth] = useState(0);

 
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollX);
    };

    window.addEventListener("scroll", handleScroll);
    
    const maxLeftPosition = 100; // Misalkan maxLeftPosition diisi dengan nilai yang sesuai
    const scrollPosition = 50; // Misalkan scrollPosition diisi dengan nilai yang sesuai
    const calculatedWidthValue = maxLeftPosition - Math.min(scrollPosition / 10.430555556, maxLeftPosition);
    
    // Set calculated width
    setCalculatedWidth(calculatedWidthValue);

    if(scrollPosition > 0) {
      // setDisplayWord()
    }

    if (roundedRef.current) {
      const fullWidth = (roundedRef.current as HTMLElement).clientWidth;
      setMaxLeftPosition(fullWidth);
      console.log(fullWidth)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    
  }, []);

  const handleClick = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

    // Fungsi untuk menggulir ke posisi 2041 piksel secara horizontal
    const scrollToPosition = (width: number) => {
      console.log('Clicked 1')
        window.scrollTo({left : width, behavior: 'smooth'})
    };

  console.log(scrollPosition)

  return (
    <main className="">
      <div className="bg-black relative h-screen" style={{ aspectRatio: '6151 / 1080' }}>
        <img src={shao.src} className="absolute z-20 duration-200 select-none left-1" style={{ height: '49%', left: '0.53%', bottom: '5%', opacity: scrollPosition > 100 ? 0 : 1 }} />
        <img src={shao1.src} className="absolute z-20 select-none left-1 duration-300" style={{ height: '47.6%', left: '22.8%', bottom: '6%', opacity: (scrollPosition > 100 && scrollPosition <= 1600) ? 1 : 0 }} />
        <img src={shao2.src} className="absolute z-20 duration-200 select-none left-1" style={{ height: '29%', left: '43.3%', bottom: '5%', opacity: scrollPosition > 1600 ? 1 : 0 }} />
        <img src={gambar.src} />

        {/* Fixed Navbar */}
        <div className="fixed duration-300 z-50 rounded-lg shadow-smooth text-white px-5 py-5 origin-bottom-right overflow-hidden backdrop:blur-lg bg-black/80 scale-100" style={{
          paddingLeft: '20px', paddingRight: '20px', width: '400px', right: '8px', bottom: '8px', transition: 'opacity 0.5s ease-in-out', opacity: '0.95'
        }}>
          {/* Text */}
          {scrollPosition >= 0 && scrollPosition < 300 ? Word1 : scrollPosition >= 300 ? Word2 : null }

          {/* Button Play Music */}
          <div>
            <div className="flex flex-row justify-between mt-4 w-full">
              <div className="flex flex-row gap-1.5 mr-1.5">
                <button className="w-8 h-8 rounded-full box-border border border-tertiary-white flex items-center justify-center overlay-secondary-white hover:overlay-primary-white duration-200">
                  <div className="bg-white rounded-full w-[13px] h-[13px]"></div>
                </button>
                <button className="w-10 h-8 flex justify-center items-center border border-tertiary-white overlay-secondary-white hover:overlay-primary-white rounded-lg duration-200 disabled:opacity-40 disabled:pointer-events-none" onClick={() => handleClick()}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-4 h-4"><path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
                {/* ReactPlayer */}
              </div>
              <div className="flex flex-row gap-1.5">
                <button className="w-10 h-8 flex justify-center items-center border border-tertiary-white overlay-secondary-white hover:overlay-primary-white rounded-lg duration-200 disabled:opacity-40 disabled:pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-4 h-4"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                </button>
                <button className="w-10 h-8 flex justify-center items-center border border-tertiary-white overlay-secondary-white hover:overlay-primary-white rounded-lg duration-200 disabled:opacity-40 disabled:pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-4 h-4"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="w-full flex justify-center mt-4">
              <div className="w-[360px]">
                <div className="w-full h-5 relative">
                  <button className={`absolute h-[85px] duration-200 z-[51] ${scrollPosition >= 0 && scrollPosition < 305 ? 'opacity-100' : 'opacity-20'} hover:opacity-50`} style={{left: '0%', width: '4%'}} onClick={() => scrollToPosition(0)}>
                    <div className="w-1 h-1 rounded-full bg-white absolute top-2 left-1/2"></div>
                  </button>
                  <button className={`absolute h-[85px] duration-200 z-[51] ${scrollPosition >= 305 && scrollPosition < 775 ? 'opacity-100' : 'opacity-20'} hover:opacity-50`} style={{left: '4%', width: '27%'}} onClick={() => scrollToPosition(305)}>
                    <div className="w-1 h-1 rounded-full bg-white absolute top-2 left-1/2"></div>
                  </button>
                  <button className={`absolute h-[85px] duration-200 z-[51] ${scrollPosition >= 775 && scrollPosition < 1313 ? 'opacity-100' : 'opacity-20'} hover:opacity-50`} style={{left: '21%', width: '14%'}} onClick={() => scrollToPosition(775)}>
                    <div className="w-1 h-1 rounded-full bg-white absolute top-2 left-1/2"></div>
                  </button>
                  <button className={`absolute h-[85px] duration-200 z-[51] ${scrollPosition >= 1313 && scrollPosition < 2041 ? 'opacity-100' : 'opacity-20'} hover:opacity-50`} style={{left: '35%', width: '17%'}} onClick={() => scrollToPosition(1313)}>
                    <div className="w-1 h-1 rounded-full bg-white absolute top-2 left-1/2"></div>
                  </button>
                  <button className={`absolute h-[85px] duration-200 z-[51] ${scrollPosition >= 2041 && scrollPosition < 2686 ? 'opacity-100' : 'opacity-20'} hover:opacity-50`} style={{left: '55%', width: '17%'}} onClick={() => scrollToPosition(2041)}>
                    <div className="w-1 h-1 rounded-full bg-white absolute top-2 left-1/2"></div>
                  </button>
                  <button className={`absolute h-[85px] duration-200 z-[51] ${scrollPosition >= 2686 && scrollPosition < 2871 ? 'opacity-100' : 'opacity-20'} hover:opacity-50`} style={{left: '69%', width: '17%'}} onClick={() => scrollToPosition(2687)}>
                    <div className="w-1 h-1 rounded-full bg-white absolute top-2 left-1/2"></div>
                  </button>
                  <button className={`absolute h-[85px] duration-200 z-[51] ${scrollPosition >= 2871 ? 'opacity-100' : 'opacity-20'} hover:opacity-65`} style={{left: '88%', width: '17%'}} onClick={() => scrollToPosition(3167)}>
                    <div className="w-1 h-1 rounded-full bg-white absolute top-2 left-1/2"></div>
                  </button>
                </div>
                <div>
                  <div id="w-fuls" className="w-full rounded relative h-[65px] border border-primary-white">
                    <div className="h-full absolute left-0 bg-black/40 z-30" style={{ width: `${Math.min(scrollPosition / 10.430555556, maxLeftPosition)}px`}}></div>
                    <div className="h-full absolute right-0 bg-black/50 z-30" style={{ width: `${maxLeftPosition - Math.min(scrollPosition / 10.430555556, maxLeftPosition)}px`}}></div>
                    <div className={`border-2 border-white rounded h-full absolute z-40`}  style={{ width: '68px', left: `${Math.min(scrollPosition / 10.430555556, (maxLeftPosition - 68 ))}px`}}></div>
                    <img className="h-full rounded select-none z-20 absolute right-0 top-0 overflow-hidden object-cover object-right duration-200" src={gambar.src} style={{aspectRatio: '6151 / 1080', width: `${maxLeftPosition - Math.min(scrollPosition / 10.430555556, maxLeftPosition)}px`, filter: 'blur(4px)', transitionProperty: 'filter'}} />
                    <img className="h-full rounded select-none" src={gambar.src} style={{ aspectRatio: '90000 / 1080;'}} ref={roundedRef}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
