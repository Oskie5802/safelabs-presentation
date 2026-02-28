import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import React, { useState } from "react";
import logoImg from "../assets/logo.png";
import { SlideContent, SlideType } from "../types";

interface SlideLayoutProps {
  data: SlideContent;
  isActive: boolean;
  setBlockNavigation?: (blocked: boolean) => void;
}

// Utility: staggered transition style for child elements
const stagger = (
  isActive: boolean,
  delayMs: number,
  direction: "up" | "left" | "right" | "scale" = "up",
): React.CSSProperties => {
  const transforms: Record<string, string> = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    scale: "scale(0.85)",
  };
  return {
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms`,
    opacity: isActive ? 1 : 0,
    transform: isActive
      ? "translateY(0) translateX(0) scale(1)"
      : transforms[direction],
  };
};

// Animated top accent bar
const AccentBar = ({
  accentColor,
  isActive,
}: {
  accentColor: string;
  isActive: boolean;
}) => (
  <div
    className="absolute top-0 left-0 h-1.5 opacity-80"
    style={{
      background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
      transition: "width 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
      width: isActive ? "100%" : "0%",
    }}
  />
);

// Helper component to handle image state and fallbacks gracefully
const SlideImage = ({
  url,
  caption,
  accentColor,
  arrow,
  className,
  zoom,
  zoomOrigin,
  isActive,
}: {
  url: string;
  caption?: string;
  accentColor: string;
  arrow?: {
    x: number;
    y: number;
    direction?: "up" | "down" | "left" | "right";
  };
  className?: string;
  zoom?: boolean | number;
  zoomOrigin?: { x: number; y: number };
  isActive: boolean;
}) => {
  const [src, setSrc] = useState(url);
  const [shouldZoom, setShouldZoom] = useState(false);

  React.useEffect(() => {
    setSrc(url);
  }, [url]);

  React.useEffect(() => {
    if (isActive && zoom) {
      const timeout = setTimeout(() => setShouldZoom(true), 1500);
      return () => clearTimeout(timeout);
    } else {
      setShouldZoom(false);
    }
  }, [isActive, zoom]);

  const handleError = () => {
    setSrc(
      `https://placehold.co/400x700/1a1a1a/${accentColor.replace("#", "")}?text=${encodeURIComponent(caption || "Image Missing")}`,
    );
  };

  const ArrowIcon =
    arrow?.direction === "down"
      ? ArrowDown
      : arrow?.direction === "left"
        ? ArrowLeft
        : arrow?.direction === "right"
          ? ArrowRight
          : ArrowUp;

  const getTransformOrigin = () => {
    if (zoomOrigin) {
      return `${zoomOrigin.x}% ${zoomOrigin.y}%`;
    }

    if (!arrow) return "center center";
    let xOffset = "0px";
    let yOffset = "0px";

    if (arrow.direction === "up" || !arrow.direction) yOffset = "-50px";
    if (arrow.direction === "down") yOffset = "50px";
    if (arrow.direction === "left") xOffset = "-50px";
    if (arrow.direction === "right") xOffset = "50px";

    return `calc(${arrow.x}% + ${xOffset}) calc(${arrow.y}% + ${yOffset})`;
  };

  const transformOrigin = getTransformOrigin();
  const scaleValue = typeof zoom === "number" ? zoom : 2.5;

  const zoomStyle: React.CSSProperties = shouldZoom
    ? {
      transformOrigin,
      transform: `scale(${scaleValue})`,
      transition: "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
    }
    : {
      transformOrigin,
      transform: "scale(1)",
      transition: "transform 1s ease-out",
    };

  return (
    <div className="group relative">
      <div
        className="relative overflow-hidden rounded-xl border-2 shadow-2xl transition-transform duration-300"
        style={{ borderColor: `${accentColor}40` }}
      >
        <div style={zoomStyle} className="relative">
          <img
            src={src}
            alt={caption}
            onError={handleError}
            className={`${className || "max-h-[65vh]"} w-auto object-contain opacity-100 transition-opacity`}
          />
        </div>

        {arrow && (
          <div
            className="absolute z-10 pointer-events-none animate-bounce"
            style={{
              left: `${arrow.x}%`,
              top: `${arrow.y}%`,
              color: accentColor,
              transform: "translate(-50%, -50%)",
              filter: "drop-shadow(0 0 15px rgba(0,0,0,0.9))",
            }}
          >
            <ArrowIcon size={110} strokeWidth={4} />
          </div>
        )}

        {caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4 border-t border-gray-800 min-h-[8rem] flex items-center justify-center z-20">
            <p className="text-center font-mono text-base md:text-xl text-gray-300 uppercase tracking-wider font-bold">
              {caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const LiveDemoContent = ({
  data,
  accentColor,
  setBlockNavigation,
  isActive,
}: {
  data: SlideContent;
  accentColor: string;
  setBlockNavigation?: (blocked: boolean) => void;
  isActive: boolean;
}) => {
  const [password, setPassword] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [isCracking, setIsCracking] = useState(false);
  const [cracked, setCracked] = useState(false);

  // Camera/View State: 'panel' | 'terminal' | 'success'
  const [viewState, setViewState] = useState<"panel" | "terminal" | "success">(
    "panel",
  );

  // Initialize and Reset
  React.useEffect(() => {
    if (isActive) {
      setPassword("");
      setLogs([]);
      setIsCracking(false);
      setCracked(false);
      setViewState("panel");
      setBlockNavigation?.(true);
    } else {
      setBlockNavigation?.(false);
    }
  }, [isActive, setBlockNavigation]);

  const startCracking = () => {
    if (isCracking || cracked) {
      // If already cracked and view is success, the NEXT right arrow should unblock navigation and move to the next slide.
      // But App.tsx handles ArrowRight. We only get slide-step if blockNavigation is true.
      if (cracked && viewState === "success") {
        setBlockNavigation?.(false);
        // We need to trigger the next slide manually since we intercepted it.
        // Wait, if we setBlockNavigation(false), the next slide arrow will work.
        // Or we can programmatically go to next slide here.
        // Wait, it's better to unblock navigation once "success" state is reached, so the user can just press right arrow to advance!
      }
      return;
    }

    // Step 1: Start cracking logic
    setIsCracking(true);
    setLogs((prev) => [
      ...prev,
      "> Inicjowanie ataku słownikowego...",
      "> Ładowanie wordlisty rockyou.txt...",
    ]);

    // Step 2: Move camera to terminal
    setViewState("terminal");
  };

  // Listen for custom event from App.tsx
  React.useEffect(() => {
    if (!isActive) return;

    const handleSlideStep = () => {
      startCracking();
    };

    window.addEventListener("slide-step", handleSlideStep);
    return () => window.removeEventListener("slide-step", handleSlideStep);
  }, [isActive, isCracking, cracked, viewState, setBlockNavigation]);

  React.useEffect(() => {
    if (!isCracking) return;

    const commonPasswords = [
      "123456",
      "password",
      "12345678",
      "qwerty",
      "123456789",
      "12345",
      "111111",
      "1234567",
      "dragon",
      "adobe123",
      "123123",
      "football",
      "qwertyuiop",
      "monkey",
      "letmein",
      "princess",
      "shadow",
      "sunshine",
      "666666",
      "computer",
      "orange",
      "pussy",
      "master",
      "charlie",
      "superman",
      "jordan",
      "michael",
      "fuckyou",
      "secret",
      "harley",
      "battery",
      "starwars",
      "justin",
      "binker",
      "liverpool",
      "arsenal",
      "pancakes",
      "dinosaur",
      "pikachu",
      "pokemon",
      "snoopy",
      "1234567890",
      "iloveyou",
      "mustang",
      "hannah",
      "jessica",
      "ashley",
      "daniel",
      "andrew",
      "admin",
      "qazwsx",
      "zaq123",
      "haslo",
      "haslo123",
      "wiosna2024",
      "lato2024",
      "jesien2024",
      "zima2024",
      "polska",
      "krakow",
      "warszawa",
      "wroclaw",
      "buziaczek",
      "kotek",
      "piesek",
      "misio",
      "sloneczko",
    ];

    const interval = setInterval(() => {
      const randomPass =
        commonPasswords[Math.floor(Math.random() * commonPasswords.length)];
      setLogs((prev) => {
        const newLogs = [...prev, `> Checking: ${randomPass} [FAILED]`];
        if (newLogs.length > 25) return newLogs.slice(newLogs.length - 25);
        return newLogs;
      });
    }, 30);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setIsCracking(false);
      setCracked(true);
      const finalPass = "oskar123";
      setLogs((prev) => [
        ...prev,
        `> Checking: ${finalPass} [SUCCESS]`,
        `> PASSWORD FOUND: ${finalPass}`,
      ]);
      setPassword(finalPass);

      // Step 3: Move camera back to panel after 3s delay
      setTimeout(() => {
        setViewState("success");
        // Navigation is unblocked so next right arrow proceeds to next slide
        setBlockNavigation?.(false);
      }, 3000);
    }, 7000); // Increased cracking time from 4s to 7s

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isCracking]);

  return (
    <div className="w-full h-[80vh] relative flex items-center justify-center overflow-visible perspective-[1000px]">
      {/* Login Panel */}
      <div
        className={`absolute w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-[1200ms] ease-in-out border-2 z-20
          ${viewState === "panel"
            ? "shadow-[0_0_60px_rgba(255,255,255,0.4)] border-blue-400 scale-100 translate-y-0 opacity-100"
            : viewState === "terminal"
              ? "opacity-30 border-gray-200 scale-[0.6] -translate-y-[80%] blur-[4px] grayscale-[0.8]"
              : "shadow-[0_0_80px_rgba(0,255,0,0.5)] border-green-500 scale-110 translate-y-0 opacity-100 z-30"
          }
        `}
      >
        <div className="bg-gray-100 px-8 py-6 border-b border-gray-200 flex justify-between items-center">
          <span className="font-bold text-gray-700 text-2xl">
            Panel Logowania
          </span>
          <div className="flex gap-3">
            <div className="w-4 h-4 rounded-full bg-red-400"></div>
            <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
            <div className="w-4 h-4 rounded-full bg-green-400"></div>
          </div>
        </div>
        <div className="p-10 flex flex-col gap-8 relative">
          {cracked && viewState === "success" && (
            <div className="absolute inset-x-0 inset-y-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-[6px] rounded-b-xl border-t-0 p-8 transition-all duration-700 opacity-0 animate-fade-in">
              <div className="bg-green-100 border-4 border-green-500 text-green-800 px-8 py-8 rounded-xl font-bold text-4xl text-center shadow-[0_0_40px_rgba(0,255,0,0.6)] w-full transform scale-50 animate-scale-in">
                Zalogowano pomyślnie
              </div>
            </div>
          )}
          <div>
            <label className="block text-gray-600 text-xl font-bold mb-3">
              Email
            </label>
            <input
              type="email"
              value={data.mainText}
              readOnly
              className="w-full border-2 border-gray-300 rounded-lg p-4 text-2xl text-gray-800 bg-gray-50 focus:outline-none font-medium"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-xl font-bold mb-3">
              Hasło
            </label>
            <input
              type="password"
              value={password}
              readOnly
              className={`w-full border-2 rounded-lg p-4 text-2xl focus:outline-none transition-colors duration-300 ${cracked ? "border-green-500 bg-green-50 text-green-700 font-bold" : "border-gray-300 text-gray-800 bg-gray-50 font-medium"}`}
              placeholder={isCracking ? "Łamanie hasła..." : "••••••••"}
            />
          </div>
          <button
            onClick={startCracking}
            disabled={isCracking || cracked}
            className={`mt-4 w-full font-bold py-4 px-6 rounded-lg text-xl tracking-wide transition-all duration-300 shadow-lg ${isCracking
              ? "bg-gray-400 cursor-not-allowed text-white"
              : cracked
                ? "bg-blue-600 opacity-50 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            {isCracking ? "PRZEPROWADZANIE ATAKU..." : "ZALOGUJ SIĘ"}
          </button>
        </div>
      </div>

      {/* Attacker Terminal */}
      <div
        className={`absolute w-full max-w-5xl bg-black rounded-xl border-2 font-mono text-xl p-6 shadow-2xl overflow-hidden min-h-[600px] transition-all duration-[1200ms] ease-in-out z-10
          ${viewState === "panel"
            ? "opacity-0 border-gray-800 scale-75 translate-y-[50%] pointer-events-none"
            : viewState === "terminal"
              ? "opacity-100 border-green-500 shadow-[0_0_120px_rgba(0,255,0,0.2)] scale-110 translate-y-[-5%] z-30"
              : "opacity-0 border-green-500 scale-125 translate-y-[60%] blur-[10px] pointer-events-none"
          }
        `}
      >
        <div className="absolute top-0 left-0 right-0 bg-gray-900 px-6 py-4 flex items-center justify-between border-b border-gray-800">
          <span className="text-gray-400 font-bold tracking-wider text-xl">
            root@kali:~/hydra
          </span>
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500/50"></div>
            <div className="w-4 h-4 rounded-full bg-yellow-500/50"></div>
            <div className="w-4 h-4 rounded-full bg-green-500/50"></div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 text-green-500 font-medium h-[500px] overflow-hidden justify-end">
          <div className="text-gray-400 mb-2 text-2xl shrink-0">
            $ hydra -l {data.mainText} -P rockyou.txt smtp://mail.firma.pl
          </div>
          <div className="flex flex-col gap-1.5 justify-end">
            {logs.map((log, i) => {
              const isSuccess = log.includes("[SUCCESS]");
              const isFound = log.includes("PASSWORD FOUND");

              if (isSuccess || isFound) {
                return (
                  <div
                    key={i}
                    className="text-white bg-green-900/90 font-bold p-3 text-3xl shadow-[0_0_20px_rgba(0,255,0,0.6)] rounded border border-green-400 animate-[pulse_1s_ease-in-out_infinite] transform scale-105 my-2 w-full text-center tracking-widest"
                  >
                    {log}
                  </div>
                );
              }

              return (
                <div key={i} className="opacity-90 leading-tight">
                  {log.includes("[FAILED]") ? (
                    <>
                      {log.split("[FAILED]")[0]}
                      <span className="text-red-500 font-bold">[FAILED]</span>
                    </>
                  ) : (
                    log
                  )}
                </div>
              );
            })}
            {isCracking && <div className="animate-pulse text-2xl mt-1">_</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const SplitIframeContent = ({
  data,
  accentColor,
  isActive,
}: {
  data: SlideContent;
  accentColor: string;
  isActive: boolean;
}) => {
  const [key, setKey] = useState(0);

  React.useEffect(() => {
    if (!isActive || !data.refreshInterval) return;

    setKey(0);

    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, data.refreshInterval);

    return () => clearInterval(interval);
  }, [isActive, data.refreshInterval]);

  return (
    <div className="w-[95vw] h-[85vh] flex flex-col md:flex-row gap-6 p-0 relative z-20">
      <div className="flex-1 flex flex-col items-center gap-4">
        <h3 className="text-3xl font-bold font-mono text-gray-300 tracking-wider">OFIARA (PHISHING)</h3>
        <div className="w-full h-full bg-white rounded-xl overflow-hidden border-4 relative shadow-2xl transition-transform hover:scale-[1.01] duration-700" style={{ borderColor: accentColor }}>
          <iframe src={data.contentUrl} className="w-full h-full" sandbox="allow-same-origin allow-scripts allow-forms" />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center gap-4">
        <h3 className="flex items-center gap-3 text-3xl font-bold font-mono text-red-500 tracking-wider">HAKER (PANEL)<span className="animate-pulse">🔴</span></h3>
        <div className="w-full h-full bg-white rounded-xl overflow-hidden border-4 relative shadow-[0_0_60px_rgba(255,42,42,0.4)] transition-transform hover:scale-[1.01] duration-700" style={{ borderColor: '#FF2A2A' }}>
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/80 px-3 py-1.5 rounded-full border border-red-500 shadow-[0_0_15px_rgba(255,42,42,0.4)]">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-red-500 font-bold tracking-widest">LIVE</span>
          </div>
          <iframe key={key} src={data.rightContentUrl} className="w-full h-full" sandbox="allow-same-origin allow-scripts allow-forms" />
        </div>
      </div>
    </div>
  );
};

export const SlideLayout: React.FC<SlideLayoutProps> = ({
  data,
  isActive,
  setBlockNavigation,
}) => {
  const Icon = data.icon;
  const accentColor = data.accentColor || "#00F3FF";

  // Base transition styles
  const containerClasses = `absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500 ease-out ${isActive
    ? "opacity-100 scale-100 blur-0 z-20 pointer-events-auto"
    : "opacity-0 scale-95 blur-sm z-0 pointer-events-none"
    }`;

  const renderContent = () => {
    switch (data.type) {
      case SlideType.TITLE:
        return (
          <div className="flex flex-col items-center text-center space-y-12">
            {/* Icon / Logo with scale entrance */}
            <div className="relative" style={stagger(isActive, 0, "scale")}>
              <div className="absolute inset-0 bg-cybercyan blur-[80px] opacity-20 rounded-full animate-pulse-slow"></div>
              {data.id === "intro" ? (
                <img
                  src={logoImg}
                  alt="SafeLabs Logo"
                  className="w-[280px] h-auto object-contain drop-shadow-[0_0_45px_rgba(0,243,255,0.6)]"
                />
              ) : (
                Icon && (
                  <Icon
                    size={140}
                    color={accentColor}
                    className="relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  />
                )
              )}
            </div>

            {/* Title text with slide-up entrance */}
            <div className="tracking-wide" style={stagger(isActive, 200, "up")}>
              <h1 className="text-7xl md:text-9xl font-bold text-white mb-4 leading-none uppercase tracking-tighter">
                {data.title}{" "}
                <span style={{ color: accentColor }}>{data.subtitle}</span>
              </h1>
              {data.description && (
                <div
                  className="flex flex-col items-center mt-10"
                  style={stagger(isActive, 500, "up")}
                >
                  <div
                    className="h-1.5 bg-gray-800 mb-8"
                    style={{
                      transition: "width 0.6s cubic-bezier(0.16,1,0.3,1) 0.6s",
                      width: isActive ? "6rem" : "0rem",
                    }}
                  />
                  <p className="font-mono text-gray-300 text-2xl md:text-4xl tracking-[0.15em] uppercase font-bold max-w-4xl leading-relaxed">
                    {data.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case SlideType.LIVE_DEMO:
        return (
          <div
            className="w-full flex justify-center"
            style={stagger(isActive, 0, "scale")}
          >
            <LiveDemoContent
              data={data}
              accentColor={accentColor}
              setBlockNavigation={setBlockNavigation}
              isActive={isActive}
            />
          </div>
        );

      case SlideType.IFRAME:
        return (
          <div
            className="w-full h-full flex flex-col"
            style={stagger(isActive, 100, "scale")}
          >
            <div
              className="flex-1 bg-white rounded-lg overflow-hidden border-4 relative"
              style={{ borderColor: accentColor }}
            >
              <div
                className="absolute top-0 left-0 bg-black text-white px-4 py-2 font-mono text-sm z-10 rounded-br-lg border-b border-r"
                style={{ borderColor: accentColor }}
              >
                {data.contentUrl}
              </div>
              <iframe
                src={data.contentUrl}
                className="w-full h-full"
                title="Live Demo"
                sandbox="allow-same-origin allow-scripts allow-forms"
              />
            </div>
          </div>
        );

      case SlideType.SPLIT_IFRAME:
        return (
          <div
            className="w-full flex justify-center"
            style={stagger(isActive, 100, "scale")}
          >
            <SplitIframeContent
              data={data}
              accentColor={accentColor}
              isActive={isActive}
            />
          </div>
        );

      case SlideType.IMAGE:
        return (
          <div className="w-full max-w-[95vw] flex flex-col items-center gap-6 mt-8">
            <div
              className="text-center space-y-2 mb-2"
              style={stagger(isActive, 0, "up")}
            >
              <h2
                className="text-5xl md:text-7xl font-bold uppercase tracking-tight"
                style={{ color: accentColor }}
              >
                {data.mainText}
              </h2>
              {data.description && (
                <p className="text-gray-300 font-mono text-2xl md:text-3xl max-w-5xl leading-relaxed">
                  {data.description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-6 w-full items-end">
              {data.images?.map((img, idx) => (
                <div key={idx} style={stagger(isActive, 300 + idx * 150, "up")}>
                  <SlideImage
                    url={img.url}
                    caption={img.caption}
                    accentColor={accentColor}
                    arrow={img.arrow}
                    className={img.className || "max-h-[80vh]"}
                    zoom={img.zoom}
                    zoomOrigin={img.zoomOrigin}
                    isActive={isActive}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case SlideType.WARNING:
      case SlideType.INFO:
      case SlideType.LIST:
      default:
        return (
          <div
            className="max-w-[95vw] w-full"
            style={stagger(isActive, 0, "scale")}
          >
            <div
              className={`relative bg-safedark border border-gray-800/50 rounded-2xl p-12 md:p-20 overflow-hidden`}
            >
              {/* Animated accent bar */}
              <AccentBar accentColor={accentColor} isActive={isActive} />

              <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
                {/* Icon with left entrance */}
                <div
                  className="flex-shrink-0 flex flex-col items-center gap-6"
                  style={stagger(isActive, 200, "left")}
                >
                  <div
                    className="p-8 bg-black/40 border-2 border-gray-800 rounded-2xl shadow-2xl"
                    style={{
                      borderColor: `${accentColor}40`,
                      boxShadow: `0 0 30px ${accentColor}15`,
                    }}
                  >
                    {Icon && <Icon size={100} color={accentColor} />}
                  </div>
                  {data.title && (
                    <span className="font-mono text-xl text-gray-400 tracking-widest uppercase text-center max-w-[200px] font-bold">
                      {data.title}
                    </span>
                  )}
                </div>

                {/* Text with right entrance */}
                <div className="space-y-8 flex-1 text-center md:text-left">
                  <h2
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight"
                    style={stagger(isActive, 300, "right")}
                  >
                    {data.mainText}
                  </h2>

                  {data.description && (
                    <p
                      className="font-mono text-gray-300 text-2xl md:text-4xl border-l-0 md:border-l-4 border-gray-800 pl-0 md:pl-12 py-2 leading-relaxed font-medium"
                      style={stagger(isActive, 500, "right")}
                    >
                      <span
                        style={{ color: accentColor }}
                        className="hidden md:inline mr-6"
                      >
                        {">"}
                      </span>{" "}
                      {data.description}
                    </p>
                  )}

                  {data.bulletPoints && (
                    <ul
                      className="text-left space-y-4 mt-8 pl-4 md:pl-12"
                      style={stagger(isActive, 600, "right")}
                    >
                      {data.bulletPoints.map((point, i) => (
                        <li
                          key={i}
                          className="font-mono text-gray-200 text-xl md:text-3xl flex items-center bg-black/20 p-4 rounded-xl border border-gray-800 shadow-lg"
                          style={stagger(isActive, 800 + i * 250, "right")}
                        >
                          <span
                            style={{
                              color: accentColor,
                              textShadow: `0 0 15px ${accentColor}`,
                            }}
                            className="mr-4 font-bold text-2xl md:text-3xl"
                          >
                            •
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="absolute bottom-6 right-6 flex gap-2">
                <div className="w-2 h-2 bg-gray-700"></div>
                <div className="w-2 h-2 bg-gray-700"></div>
                <div className="w-2 h-2 bg-gray-700"></div>
              </div>
            </div>
          </div>
        );
    }
  };

  return <div className={containerClasses}>{renderContent()}</div>;
};
