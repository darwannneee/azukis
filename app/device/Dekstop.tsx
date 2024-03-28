"use client"
import { useState, useEffect, useRef } from "react";
// Import Packgae
import { useSound } from 'use-sound';
import {Word1, Word2, Word3, Word4, Word5, Word6, Word7, Word8, Word9} from "./data/textDekstop"
// Import Image
import {Howl, Howler} from 'howler'

import gambar from "../assets/img/graffiti_bg_final.jpg";
import shao from "../assets/img/shao.png";
import shao1 from "../assets/img/shaos.png";
import shao2 from "../assets/img/shao_e.png";

export default function Dekstop() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxLeftPosition, setMaxLeftPosition] = useState(0);
  const [imageWidth, setimageWidth] = useState(0);
  const roundedRef = useRef(null);
  const imageRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [volumeRange, setVolumeRange] = useState(2);
  const [loadingScreen, setLoadingScreen] = useState(true);

  const [mapsWidth, setMapsWidth] = useState(0)

  useEffect(() => {
    // setFor HandleScroll
    const handleScroll = () => {
      setScrollPosition(window.scrollX);
    };

    window.addEventListener("scroll", handleScroll);

    if (roundedRef.current) {
      const fullWidth = (roundedRef.current as HTMLElement).clientWidth;
      setMaxLeftPosition(fullWidth);
      console.log(`Full Width ${fullWidth}`)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      const fullWidth = (imageRef.current as HTMLElement).clientWidth;
      setimageWidth(fullWidth);
      console.log(`Image Width = ${fullWidth}`)
    }
  }, [imageRef]); // Gunakan imageRef sebagai dependensi untuk memicu efek setiap kali referensinya berubah

  // Tunggu perbaruan state sebelum mencetak lebar gambar
  useEffect(() => { 
    if(imageWidth <= 4089) {
      console.log('hi')
      setMapsWidth(214)
    } else {
      setMapsWidth(68)
    }
  }, [imageWidth]);


  // Function for click to target POV horizontal
  const scrollToPosition = (width: number) => {
    console.log('Clicked 1')
    window.scrollTo({left : width, behavior: 'smooth'})
  };
  

  // Song Audio
  const songs = [
    { title: "Judul Lagu 1", url: "/song.mp3" },
    { title: "Judul Lagu 2", url: "/song2.mp3" },
  ];
  let [current, setCurrent] = useState(0);
  let [currentTitle, setCurrentTitle] = useState(songs[current].title);
  
  const [sound, setsound] = useState(new Howl({ src: [songs[current].url], loop: true, volume: 0.2 * volumeRange}));
  
  useEffect(() => {
    try {
      sound.play()
      setCurrentTitle(songs[current].title); // Update judul lagu saat komponen di-mount dan setiap kali current berubah
      console.log('Playing')
     
    } catch (error) {
      console.error("Error while playing audio:", error);
    }
  }, [sound, current]);
  
  const playSound = () => {
  if (sound) {
    sound.play();
  }
  };

  const pauseSound = () => {
    if (sound) {
      sound.pause();
    }
  };

  const stopSound = () => {
    if (sound) {
      sound.stop();
    }
  };
  
  const playNext = () => {
    sound.stop();
    current = (current + 1 === songs.length ? 0 : current + 1);
    setCurrent(current); // Perbarui nilai current
    console.log(current);
    var newSound = new Howl({ src: [songs[current].url], loop: true });
    setsound(newSound);
  };
  
  const playPrevious = () => {
    sound.stop();
    current = (current - 1 === -1 ? songs.length - 1 : current - 1);
    setCurrent(current); // Perbarui nilai current
    console.log(current);
    var newSound = new Howl({ src: [songs[current].url], loop: true });
    setsound(newSound);
  };


  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setVolumeRange(value);

    sound.volume(0.2 * volumeRange)
    console.log(`Range Value : ${value}`);
  };

  const [loadingScreenNumber, setLoadingScreenNumber] = useState(true);
  const [loadingNumber, setLoadingNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Logika untuk mengupdate angka loading (misal: 0, 1, 2, ..., 100)
      setLoadingNumber(prevNumber => (prevNumber === 100 ? 0 : prevNumber + 1));
    }, 15); // Ganti interval sesuai kebutuhan
    
    // Memberhentikan interval saat komponen di-unmount atau proses loading selesai
    return () => clearInterval(interval);
  }, []);

  // Fungsi untuk menampilkan tombol setelah proses loading selesai
  useEffect(() => {
    if (loadingNumber === 100) {
      setLoadingScreenNumber(false);
    }
  }, [loadingNumber]);


  return (
      <main className="bg-black dekstop" style={{ overflow: 'unset', backgroundColor: 'black'}} >

        {/* Navbar */}
        <nav className="fixed w-full top-0 border-opacity-0 lg:px-8 px-4 pt-[18px] z-50">
          <div className="group flex h-full border-b border-white items-center justify-between mx-auto relative z-10 border-opacity-0">
            <div className="flex">
              <a href="/" className="w-min-content">
                <img src="/logo.svg" alt="Logo" className="p-2 rounded hover:bg-red-600 w-32" />
              </a>
            </div>
            <div className="flex flex-shrink-[5] mr-2 relative">
              <div className="flex justify-end w-full">
                <button onClick={() => setIsOpen(!isOpen)} className="mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-7 h-7">
                    <path className={`${!isOpen ? 'block' : 'hidden'}`} strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    <path className={`${isOpen ? 'block' : 'hidden'}`} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Daftar yang akan muncul ketika tombol diklik */}
              <div className={`absolute text-white right-0 mt-10 ${isOpen ? 'block' : 'hidden'}`}>
                <a href="/psikolog" className="bg-slate-950 w-fit text-md bg-opacity-55 rounded-2xl block px-6 py-2">Home</a>
                <a href="/#feedback" className="bg-slate-950 w-fit bg-opacity-55 rounded-2xl block px-6 py-2 mt-2">About</a>
                <a href="/tentangkami" className=" bg-slate-950 w-fit bg-opacity-55 rounded-2xl block px-6 py-2 mt-2">Gitbook</a>
                <a className="bg-slate-950 bg-opacity-55 w-fit rounded-2xl block px-6 py-2 mt-2">Discord</a>
                <a className="bg-slate-950 bg-opacity-55 w-fit rounded-2xl block px-6 py-2 mt-2">Twitter</a>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Main Content Background Image */}

      
        <div className="bg-black relative h-screen md:block" style={{ aspectRatio: '6151 / 1080' }}>
          
          {/* Loading Screen */}
          <div className={`opacity-100 pointer-events-auto duration-[3000ms] w-full transition-opacity h-screen fixed inset-0 z-[59] bg-black justify-center items-center p-10 ${loadingScreen === true ? 'flex' : 'hidden'}`}>
            <div className="max-w-[454px] flex flex-col items-center duration-1000 opacity-100">
              <div className="mb-6 text-center">
                <h1 className="uppercase text-yellow-400 font-sans text-2xl md:text-3xl font-black mb-2 duration-[2000ms] opacity-100">The Origin</h1>
                <div className="text-sm md:text-base font-sans text-white duration-[2000ms] opacity-100">
                  <p>People in the Alley walk by this mural daily.</p>
                  <p>But few know its link to the Garden&apos;s origin.</p>
                </div>
                <div className="relative w-full flex justify-center">
                  <div className="absolute my-4 duration-500 opacity-0">
                    <div className="w-[100px] h-1 relative rounded-full bg-white/10">
                      <div className="animatedWidthChange absolute left-0 top-0 bottom-0 h-1 rounded-full bg-gray-300 max-w-[100px]" style={{ width: '100%'}}></div>
                    </div>
                  </div>
                  {loadingScreenNumber ? (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-200">
                      <p className="text-2xl font-semibold text-white pt-12">{loadingNumber}%</p>
                    </div>
                  ) : (
                    <button className="absolute flex font-medium text-sm md:text-base flex-row gap-2.5 text-black bg-white rounded-full items-center px-7 py-3 uppercase group duration-[2000ms] opacity-100 mt-3" onClick={() => setLoadingScreen(!loadingScreen)}>Enter World
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-black transition-transform duration-200 group-hover:translate-x-0.5">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <img src={gambar.src} className="h-full select-none absolute left-0 top-0 bottom-0 object-cover object-left pointer-events-none duration-500 opacity-20 sm:opacity-10" />
          </div>

          <img src={shao.src} className="absolute z-20 duration-200 select-none left-1" style={{ height: '49%', left: '0.53%', bottom: '5%', opacity: scrollPosition > 100 ? 0 : 1 }} />
          <img src={shao1.src} className="absolute z-20 select-none left-1 duration-300" style={{ height: '47.6%', left: '22.8%', bottom: '6%', opacity: (scrollPosition > 100 && scrollPosition <= 1600) ? 1 : 0 }} />
          <img src={shao2.src} className="absolute z-20 duration-200 select-none left-1" style={{ height: '29%', left: '43.3%', bottom: '5%', opacity: scrollPosition > 1600 ? 1 : 0 }} />
          <img src={gambar.src} className="w-full" ref={imageRef}/>

          {/* Text Subtitle */}
          <div className="fixed duration-300 z-50 rounded-lg shadow-smooth text-white px-5 py-5 origin-bottom-right overflow-hidden flex backdrop:blur-lg justify-center w-full whitespace-normal md:max-w-[500px] xl:max-w-[720px] md:translate-x-[-90%] xl:translate-x-[-75%]"
          style={{
            paddingLeft: '20px',
            paddingRight: '20px',
            // maxWidth: '720px',
            bottom: '8px',
            transition: 'opacity 0.5s ease-in-out',
            opacity: '0.95',
            left: '50%',
            // transform: 'translateX(-75%)' // Menggeser elemen ke kiri sejauh setengah lebarnya
          }}>
          <div>
            {scrollPosition >= 0 && scrollPosition < 170 ? Word1 : scrollPosition >= 200 && scrollPosition < 305 ? Word2 : scrollPosition >= 305 && scrollPosition < 775 ? Word3 : scrollPosition >= 775 && scrollPosition < 1313 ? Word4 : scrollPosition >= 1313 && scrollPosition < 1500 ? Word5 : scrollPosition >= 1500 && scrollPosition < 2041 ? Word6 : scrollPosition >= 2041 && scrollPosition < 2686 ? Word7 : scrollPosition >= 2686 && scrollPosition < 2871 ? Word8 : scrollPosition >= 2871 ? Word9 : null}
          </div>
        </div>

        {/* Button Click SPAN */}

        {/* Number 1 */}
        <div>
          <div className="absolute z-[49] w-8 h-8" style={{ left: '4%', top: '49%' }}>
            <button className="flex h-full w-full transition-all duration-1000 hover:opacity-100 opacity-0 scale-1">
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gray-100/70"></span>
              <span className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-5 w-5 bg-white"></span>
            </button>
          </div>
        </div>
        {/* Number 2 */}
        <div>
          <div className="absolute z-[49] w-8 h-8" style={{ left: '18%', top: '39%' }}>
            <button className="flex h-full w-full transition-all duration-1000 hover:opacity-100 opacity-0 scale-1">
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gray-100/70"></span>
              <span className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-5 w-5 bg-white"></span>
            </button>
          </div>
        </div>
        {/* Number 3 */}
        <div>
          <div className="absolute z-[49] w-8 h-8" style={{ left: '18%', top: '39%' }}>
            <button className="flex h-full w-full transition-all duration-1000 hover:opacity-100 opacity-0 scale-1">
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gray-100/70"></span>
              <span className="absolute mt-1.5 ml-1.5 inline-flex rounded-full h-5 w-5 bg-white"></span>
            </button>
          </div>
        </div>

          {/* Fixed Navbar */}
          <div className="fixed duration-300 z-50 text-white rounded-lg shadow-2xl px-5 py-5 origin-bottom-right overflow-hidden backdrop-blur-sm bg-black/80 scale-100" style={{
            paddingLeft: '20px', paddingRight: '20px', width: '400px', right: '8px', bottom: '8px', transition: 'opacity 0.5s ease-in-out', opacity: '0.95'
          }}>
            {/* Button Play Music */}
            <div className="">
              <div className="flex flex-row justify-between mt-1 w-full">
                <div className="flex flex-row gap-2.5 mr-1.5 items-end">
                  {/* Image Album */}
                  <button className="w-20 h-20 flex justify-center items-center border border-tertiary-white overlay-secondary-white hover:overlay-primary-white rounded-lg duration-200 disabled:opacity-40 disabled:pointer-events-none" >
                    <div className="bg-white w-full h-full"></div>
                  </button>

                  <div className="grid">
                    <div className="mb-2">
                      <h1 className="text-md">{currentTitle}</h1>
                    </div>
                    <div className="flex flex-row gap-2 mr-1.5">
                      <button className="xl:w-8 xl:h-8 flex justify-center items-center border border-[hsla(0,0%,100%,.05)] bg-[hsla(0,0%,100%,.1)] hover:overlay-primary-white rounded-lg duration-200 disabled:opacity-40 disabled:pointer-events-none" onClick={() => playPrevious() }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg>
                      </button>
                      {/* Button Play & Pause */}
                      <button className="md:w-6 md:h-6 xl:w-8 xl:h-8 flex justify-center items-center border border-[hsla(0,0%,100%,.05)] bg-[hsla(0,0%,100%,.1)] hover:overlay-primary-white rounded-lg duration-200 disabled:opacity-40 disabled:pointer-events-none" onClick={() => playSound() }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                      </button>
                      {/* Button Next */}
                      <button className="md:w-6 md:h-6 xl:w-8 xl:h-8 flex justify-center items-center border border-[hsla(0,0%,100%,.05)] bg-[hsla(0,0%,100%,.1)] hover:overlay-primary-white rounded-lg duration-200 disabled:opacity-40 disabled:pointer-events-none" onClick={()=> playNext()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg>
                      </button>
                      {/* Button Pause */}
                      <button className="md:w-6 md:h-6 xl:w-8 xl:h-8 flex justify-center items-center border border-[hsla(0,0%,100%,.05)] bg-[hsla(0,0%,100%,.1)] hover:overlay-primary-white rounded-lg duration-200 disabled:opacity-40 disabled:pointer-events-none" onClick={() => pauseSound() }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"/></svg>
                      </button>
                      {/* ScrolSpY */}
                      <input type="range" className="md:w-20 xl:w-24 bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
                      [&::-webkit-slider-thumb]:w-2.5
                      [&::-webkit-slider-thumb]:h-2.5
                      [&::-webkit-slider-thumb]:-mt-0.5
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:bg-white
                      [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:transition-all
                      [&::-webkit-slider-thumb]:duration-150
                      [&::-webkit-slider-thumb]:ease-in-out
                      [&::-webkit-slider-thumb]:dark:bg-slate-700

                      [&::-moz-range-thumb]:w-2.5
                      [&::-moz-range-thumb]:h-2.5
                      [&::-moz-range-thumb]:appearance-none
                      [&::-moz-range-thumb]:bg-white
                      [&::-moz-range-thumb]:border-4
                      [&::-moz-range-thumb]:border-yellow-600
                      [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:transition-all
                      [&::-moz-range-thumb]:duration-150
                      [&::-moz-range-thumb]:ease-in-out

                      [&::-webkit-slider-runnable-track]:w-full
                      [&::-webkit-slider-runnable-track]:h-2
                      [&::-webkit-slider-runnable-track]:bg-gray-100
                      [&::-webkit-slider-runnable-track]:rounded-full
                      [&::-webkit-slider-runnable-track]:dark:bg-gray-700

                      [&::-moz-range-track]:w-full
                      [&::-moz-range-track]:h-2
                      [&::-moz-range-track]:bg-gray-100
                      [&::-moz-range-track]:rounded-full" id="steps-range-slider-usage" min="0" max="5" step="1" defaultValue={volumeRange} onChange={handleVolumeChange}></input>
                    </div>
                  </div>
                  {/* Button Prev */}
                  
                </div>
                <div className="flex flex-row gap-1.5"> 
                  {/* <button className="w-10 h-8 flex justify-center items-center border border-tertiary-white overlay-secondary-white hover:overlay-primary-white rounded-lg duration-200 disabled:opacity-40 disabled:pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-4 h-4"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                  <button className="w-10 h-8 flex justify-center items-center border border-tertiary-white overlay-secondary-white hover:overlay-primary-white rounded-lg duration-200 disabled:opacity-40 disabled:pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-4 h-4"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button> */}
                </div>
              </div>
            </div>
            {/* Button */}
            <div>
              <div className="w-full flex justify-center mt-4">
                <div className="w-[360px]">
                  <div className="w-full h-5 relative">
                    <button className={`absolute h-[85px] duration-200 z-[51] ${scrollPosition >= 0 && scrollPosition < 170 ? 'opacity-100' : 'opacity-20'} hover:opacity-50`} style={{left: '0%', width: '4%'}} onClick={() => scrollToPosition(0)}>
                      <div className="w-1 h-1 rounded-full bg-white absolute top-2 left-1/2"></div>
                    </button>
                    <button className={`absolute h-[85px] duration-200 z-[51] ${scrollPosition >= 200 && scrollPosition < 305 ? 'opacity-100' : 'opacity-20'} hover:opacity-50`} style={{left: '7%', width: '14%'}} onClick={() => scrollToPosition(200)}>
                      <div className="w-1 h-1 rounded-full bg-white absolute top-2 left-1/2"></div>
                    </button>
                    <button className={`absolute h-[85px] duration-200 z-[51] ${scrollPosition >= 305 && scrollPosition < 775 ? 'opacity-100' : 'opacity-20'} hover:opacity-50`} style={{left: '9%', width: '27%'}} onClick={() => scrollToPosition(305)}>
                      <div className="w-1 h-1 rounded-full bg-white absolute top-2 left-1/2"></div>
                    </button>
                    <button className={`absolute h-[85px] duration-200 z-[51] ${scrollPosition >= 775 && scrollPosition < 1313 ? 'opacity-100' : 'opacity-20'} hover:opacity-50`} style={{left: '27%', width: '14%'}} onClick={() => scrollToPosition(775)}>
                      <div className="w-1 h-1 rounded-full bg-white absolute top-2 left-1/2"></div>
                    </button>
                    <button className={`absolute h-[85px] duration-200 z-[51] ${scrollPosition >= 1313 && scrollPosition < 1500 ? 'opacity-100' : 'opacity-20'} hover:opacity-50`} style={{left: '35%', width: '17%'}} onClick={() => scrollToPosition(1313)}>
                      <div className="w-1 h-1 rounded-full bg-white absolute top-2 left-1/2"></div>
                    </button>
                    <button className={`absolute h-[85px] duration-200 z-[51] ${scrollPosition >= 1500 && scrollPosition < 2041 ? 'opacity-100' : 'opacity-20'} hover:opacity-50`} style={{left: '48%', width: '17%'}} onClick={() => scrollToPosition(1500)}>
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
                  {/* Maps */}
                  <div>
                    <div id="w-fuls" className="w-full rounded relative h-[65px] border border-primary-white" ref={roundedRef}>
                      <div className="h-full absolute left-0 bg-black/40 z-30" style={{ width: `${Math.min(scrollPosition / 10.430555556, 289)}px`}}></div>
                      <div className="h-full absolute right-0 bg-black/50 z-30" style={{ width: `${maxLeftPosition - Math.min(scrollPosition / 10.430555556, 289)}px`}}></div>
                      <div className={`border-2 border-white rounded h-full absolute z-40`}  style={{ width: `${mapsWidth}px`, left: `${Math.min(scrollPosition / 10.430555556, (289 ))}px`}}></div>
                      <img className="h-full rounded select-none z-20 absolute right-0 top-0 overflow-hidden object-cover object-right duration-200" src={gambar.src} style={{aspectRatio: '6151 / 1080', width: `${maxLeftPosition - Math.min(scrollPosition / 10.430555556, 289) - mapsWidth}px`, filter: 'blur(4px)', transitionProperty: 'filter'}} />
                      <img className="h-full rounded select-none" src={gambar.src} style={{ aspectRatio: '90000 / 1080'}}/>
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
