"use client"
import { useState, useEffect, useRef } from "react";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import EmblaCarousel from './device/Mobile'
import { EmblaOptionsType } from 'embla-carousel'
import './assets/css/embla.css'
import Dekstop from "./device/Dekstop";

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Pertama-tama, panggil handleResize untuk menentukan status isMobile saat komponen dipasang
    handleResize();

    // Kemudian, tambahkan event listener untuk menangani perubahan ukuran jendela
    window.addEventListener('resize', handleResize);

    // Jangan lupa untuk membersihkan event listener pada saat komponen dilepas
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Gunakan array kosong agar useEffect hanya dipanggil sekali saat komponen dipasang

  // Function for click to target POV horizontal
  const scrollToPosition = (width: number) => {
    console.log('Clicked 1')
    window.scrollTo({left : width, behavior: 'smooth'})
  };


  return (
    <ReactLenis root options={{ lerp: 0.01, duration: 0.2, smoothWheel: true, orientation: "horizontal", gestureOrientation: 'both'}}>
      {isMobile ? (
                // Mobile Responsive
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            ) : (
                // Dekstop Responsive
                <Dekstop />
            )}
    </ReactLenis>
  );
}
