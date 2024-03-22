import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import gambar from "./assets/img/graffiti_bg_final.jpg";
import {Word1, Word2, Word3, Word4, Word5, Word6, Word7, Word8, Word9} from "./data/text"
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

  const logSlidesInViewOnce = useCallback((emblaApi: any) => {
    console.log('Position Embla = ', emblaApi.selectedScrollSnap())
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


  console.log(`Set Height = ${height}`)
  console.log(`Set Tranfrom X = ${tranfromx}`)
  console.log(`Set Tranfrom Y = ${transfromy}`)
  
  return (
    <main className="bg-black " style={{ overflow: 'unset', backgroundColor: 'black', overflowX: 'hidden', overflowY:'hidden'}}>
        <div className='fixed w-full top-0 lg:px-8 px-4 pt-[18px] z-50'>
            <div className='group flex h-full border-b border-white items-center justify-between  mx-auto relative z-10 border-opacity-0'>
                <div className='flex-shrink-[5] mr-2'>
                    <div className='flex'>
                        <a className='w-min-content' href='/'>
                            <img src="/logo.svg" alt="Logo" className="p-2 rounded hover:bg-red-600 w-32" />
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div className='duration-500 h-screen md:hidden block grid-cols-1' style={{height: '-webkit-fill-available'}}>
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
                            <div className="embla__slide" key={index}>
                                <div className="embla__slide__number">{word}</div>
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
