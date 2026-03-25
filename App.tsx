import React, { useCallback, useEffect, useState } from "react";
import { SlideLayout } from "./components/SlideLayout";
import { SLIDES } from "./constants";
import { SlideContent } from "./types";

interface AppProps {
  slides?: SlideContent[];
}

const App: React.FC<AppProps> = ({ slides = SLIDES }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [blockNavigation, setBlockNavigation] = useState(false);

  // Navigation Logic
  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) =>
      prev < slides.length - 1 ? prev + 1 : prev,
    );
    setBlockNavigation(false);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setBlockNavigation(false);
  }, []);

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Obchodzimy animację tylko strzałką w dół, kiedy jesteśmy na zablokowanym slajdzie (bruteforce)
      if (blockNavigation && e.key === "ArrowDown") {
        window.dispatchEvent(new CustomEvent("slide-step"));
        return;
      }

      // Blokujemy przejście dalej jeśli animacja nie jest zakończona (Space only, ArrowRight skips)
      if (blockNavigation && e.key === "Space") {
        return;
      }

      // Globalna nawigacja
      if (e.key === "ArrowRight" || e.key === "Space") {
        goToNextSlide();
      } else if (e.key === "ArrowLeft") {
        goToPrevSlide();
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // button 0: Left click
      // button 3: Backward side button
      // button 4: Forward side button
      if (e.button === 0 || e.button === 4) {
        if (blockNavigation) {
          window.dispatchEvent(new CustomEvent("slide-step"));
        } else {
          goToNextSlide();
        }
      } else if (e.button === 3) {
        goToPrevSlide();
      }
    };

    // Prevent browser navigation for mouse side buttons
    const handleContextMenu = (e: MouseEvent) => {
      // If we wanted to override right click (button 2), we'd do it here
      // But for now we just handle side buttons which are handled by mousedown
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [goToNextSlide, goToPrevSlide, blockNavigation]);

  return (
    <main className="relative w-screen h-screen bg-safeblack overflow-hidden flex items-center justify-center text-white selection:bg-safecyan selection:text-black">
      {/* Background Grid Effect */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-[128px] pointer-events-none"></div>

      {/* Global Logo */}
      {currentSlideIndex > 0 && !slides[currentSlideIndex].hideLogo && (
        <div className="absolute top-8 left-44 z-[100] transition-opacity duration-700">
          <a
            href="/"
            className="flex items-center gap-3 cursor-pointer group select-none no-drag text-left"
          >
            <img
              alt="Safe Labs"
              className="h-10 w-auto group-hover:scale-105 transition-transform duration-300 pointer-events-none object-contain"
              src="https://www.safelabs.pl/assets/logo-B8uCK8nm.png"
            />
            <div className="flex flex-col leading-none pointer-events-none">
              <span className="text-white font-bold tracking-widest text-lg font-mono">
                SAFE
              </span>
              <span className="text-cybercyan font-bold tracking-[0.2em] text-sm font-mono -mt-1">
                LABS
              </span>
            </div>
          </a>
        </div>
      )}

      {/* Render All Slides (stacked, handled by opacity in SlideLayout) */}
      <div className="relative z-10 w-full h-full mx-auto">
        {slides.map((slide, index) => (
          <SlideLayout
            key={slide.id}
            data={slide}
            isActive={index === currentSlideIndex}
            setBlockNavigation={
              index === currentSlideIndex ? setBlockNavigation : undefined
            }
          />
        ))}
      </div>
    </main>
  );
};

export default App;
