import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import gambar from "../assets/img/graffiti_bg_final.jpg";
import {Word1, Word2, Word3, Word4, Word5, Word6, Word7, Word8, Word9} from "./data/textMobile.js"
type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [positionEmbla, setPositionEmbla] = useState(0)
  const [height, setHeight] = useState(0)
  const [tranfromx, setTransfromx] = useState(0)
  const [transfromy, setTransfromy] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [loadingScreen, setLoadingScreen] = useState(true);

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

  const logSlidesInViewOnce = useCallback((emblaApi: any) => {
    setPositionEmbla(emblaApi.selectedScrollSnap())
    // emblaApi.off('slidesInView', logSlidesInViewOnce)
  }, [])

  useEffect(() => {
    changePositionEmbla();
}, [positionEmbla])

  const changePositionEmbla = () => {
    if (positionEmbla === 0) {
        setHeight(110);
        setTransfromx(0);
        setTransfromy(-10);
    } else if (positionEmbla === 1) {
        setHeight(130);
        setTransfromx(-210);
        setTransfromy(-20);
    } else if (positionEmbla === 2) {
        setHeight(100);
        setTransfromx(-140);
        setTransfromy(0);
    } else if (positionEmbla === 3) {
        setHeight(120);
        setTransfromx(-260);
        setTransfromy(-20);
    } else if (positionEmbla === 4) {
        setHeight(120);
        setTransfromx(-320);
        setTransfromy(-20);
    } else if (positionEmbla === 5) {
        setHeight(110);
        setTransfromx(-340);
        setTransfromy(-10);
    } else if (positionEmbla === 6) {
        setHeight(120);
        setTransfromx(-400);
        setTransfromy(-20);
    } else if (positionEmbla === 7) {
        setHeight(100);
        setTransfromx(-380);
        setTransfromy(0);
    } else if (positionEmbla === 8) {
        setHeight(100);
        setTransfromx(-450);
        setTransfromy(0);
    } else {
        // Default case
    }    
  }

  useEffect(() => {
    if (emblaApi) emblaApi.on('select', logSlidesInViewOnce)


  }, [emblaApi, logSlidesInViewOnce])
  
  return (
    <main className="bg-black " style={{ overflow: 'unset', backgroundColor: 'black', overflowX: 'hidden', overflowY:'hidden'}}>
        <div className='fixed w-full top-0 lg:px-8 px-4 pt-[18px]' style={{zIndex: '70'}}>
            <div className='group flex h-full border-b border-white items-center justify-between  mx-auto relative z-10 border-opacity-0'>
                <div className='flex-shrink-[5] mr-2'>
                    <div className='flex'>
                        <a className='w-min-content'>
                            <img src="/logo.svg" alt="Logo" className="p-2 rounded hover:bg-red-600 w-32" />
                        </a>
                    </div>
                </div>


                <div className='z-50'>
                    <button onClick={() => setIsOpen(!isOpen)} className="mt-2 hamburger block single-small--magnetic " type='button'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-7 h-7">
                            <path className={`${!isOpen ? 'block' : 'hidden'}`} strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            <path className={`${isOpen ? 'block' : 'hidden'}`} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

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
        </div>

        <div className='duration-500 h-screen md:hidden block grid-cols-1' style={{height: '-webkit-fill-available'}}>

            {/* Loading Screen */}
            <div className={`opacity-100 duration-1000 w-full transition-opacity h-screen fixed inset-0 z-[59] bg-black justify-center items-center p-10 ${loadingScreen === true ? 'flex' : 'hidden'}`}>
                <div className='max-w-[454px] flex flex-col items-center duration-1000 opacity-100'>
                    <div className='mb-6 text-center'>
                        <h1 className='uppercase text-yellow-400 font-sans text-2xl md:text-3xl font-black mb-2 duration-[2000ms] opacity-100'>The Origin</h1>
                        <div className='text-sm md:text-base font-sans text-white duration-[2000ms] opacity-100'>
                            <p>People in the Alley walk by this mural daily.</p>
                            <p>But few know its link to the Garden&apos;s origin.</p>
                        </div>
                    </div>
                    <div className='relative w-full flex justify-center'>
                        {loadingScreenNumber ? (
                            <div className="absolute inset-0 flex justify-center items-center bg-gray-200">
                                <p className="text-2xl font-semibold text-white">{loadingNumber}%</p>
                            </div>
                        ) : (
                            <button className='absolute flex font-medium text-sm md:text-base flex-row gap-2.5 text-black bg-white rounded-full items-center px-7 py-3 uppercase group duration-[2000ms] opacity-100' onClick={() => setLoadingScreen(!loadingScreen)}>Explore
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-black transition-transform duration-200 group-hover:translate-x-0.5">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                <img src={gambar.src} className='h-full select-none absolute left-0 top-0 bottom-0 object-cover object-left pointer-events-none duration-500 opacity-20 sm:opacity-10' />
            </div>
            
            <div className='overlay-item overflow-hidden'>
                <div className='overflow-hidden'>
                <img 
                    className='max-w-none bg-olive traionsition-all ease-in-out duration-[1500ms] lg:hidden' 
                    src={gambar.src} 
                    style={{ 
                        height: `calc(${height}vh)`, 
                        transform: `translate(${tranfromx}vh, ${transfromy}vh)`
                    }}
                />
                </div>
            </div>
            <div className='overlay-item'>
                <div className='absolute bottom-8 z-50 h-auto duration-500 bg-opacity-100 w-full text-white'>
                    <div className='pt-28 h-screen overflow-hidden relative' ref={emblaRef}>
                        <div className='embla__container w-full h-auto absolute bottom-0'>
                        {[Word1, Word2, Word3, Word4, Word5, Word6, Word7, Word8, Word9].map((word, index) => (
                            <div className="embla__slide h-auto px-6 flex items-end pb-2" key={index}>
                                <div className="embla__slide__number  h-auto text-white relative overflow-hidden">{word}</div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <div className='w-full h-[350px] absolute bottom-0 bg-gradient-to-t from-black to-black/0'></div>
                <div className='absolute w-full grid grid-cols-9 p-4 gap-3 bottom-0'>
                    <button className={`w-full border-b-2 border-white text-left duration-200 block text-white font-mono text-sm pb-2 shadow bg-whitet ${positionEmbla === 0 ? 'opacity-100' : 'opacity-20'}`}></button>
                    <button className={`w-full border-b-2 border-white text-left duration-200 block text-white font-mono text-sm pb-2 shadow bg-whitet ${positionEmbla === 1 ? 'opacity-100' : 'opacity-20'}`}></button>
                    <button className={`w-full border-b-2 border-white text-left duration-200 block text-white font-mono text-sm pb-2 shadow bg-whitet ${positionEmbla === 2 ? 'opacity-100' : 'opacity-20'}`}></button>
                    <button className={`w-full border-b-2 border-white text-left duration-200 block text-white font-mono text-sm pb-2 shadow bg-whitet ${positionEmbla === 3 ? 'opacity-100' : 'opacity-20'}`}></button>
                    <button className={`w-full border-b-2 border-white text-left duration-200 block text-white font-mono text-sm pb-2 shadow bg-whitet ${positionEmbla === 4 ? 'opacity-100' : 'opacity-20'}`}></button>
                    <button className={`w-full border-b-2 border-white text-left duration-200 block text-white font-mono text-sm pb-2 shadow bg-whitet ${positionEmbla === 5 ? 'opacity-100' : 'opacity-20'}`}></button>
                    <button className={`w-full border-b-2 border-white text-left duration-200 block text-white font-mono text-sm pb-2 shadow bg-whitet ${positionEmbla === 6 ? 'opacity-100' : 'opacity-20'}`}></button>
                    <button className={`w-full border-b-2 border-white text-left duration-200 block text-white font-mono text-sm pb-2 shadow bg-whitet ${positionEmbla === 7 ? 'opacity-100' : 'opacity-20'}`}></button>
                    <button className={`w-full border-b-2 border-white text-left duration-200 block text-white font-mono text-sm pb-2 shadow bg-whitet ${positionEmbla === 8 ? 'opacity-100' : 'opacity-20'}`}></button>
                </div>
            </div>
        </div>
        {/* <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container ">
            {[Word1, Word2, Word3, Word4, Word5, Word6, Word7, Word8, Word9].map((word, index) => (
                <div className="embla__slide" key={index}>
                    <div className="embla__slide__number">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</div>
                </div>
            ))}
            </div>
        </div>
        </section> */}
    </main>
  )
}

export default EmblaCarousel
