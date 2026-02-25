import React, { useCallback, useEffect, useState } from "react";
import { SlideLayout } from "./components/SlideLayout";
import { SLIDES } from "./constants";

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Navigation Logic
  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) =>
      prev < SLIDES.length - 1 ? prev + 1 : prev,
    );
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
        goToNextSlide();
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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [goToNextSlide, goToPrevSlide]);

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

      {/* Render All Slides (stacked, handled by opacity in SlideLayout) */}
      <div className="relative z-10 w-full h-full max-w-[80vw] mx-auto">
        {SLIDES.map((slide, index) => (
          <SlideLayout
            key={slide.id}
            data={slide}
            isActive={index === currentSlideIndex}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
