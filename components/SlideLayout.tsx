import React, { useState } from "react";
import logoImg from "../assets/logo.png";
import { SlideContent, SlideType } from "../types";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

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
  arrow?: { x: number; y: number; direction?: "up" | "down" | "left" | "right" };
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

  const ArrowIcon = arrow?.direction === 'down' ? ArrowDown :
                    arrow?.direction === 'left' ? ArrowLeft :
                    arrow?.direction === 'right' ? ArrowRight : ArrowUp;

  const getTransformOrigin = () => {
      if (zoomOrigin) {
          return `${zoomOrigin.x}% ${zoomOrigin.y}%`;
      }

      if (!arrow) return 'center center';
      let xOffset = '0px';
      let yOffset = '0px';
      
      if (arrow.direction === 'up' || !arrow.direction) yOffset = '-50px';
      if (arrow.direction === 'down') yOffset = '50px';
      if (arrow.direction === 'left') xOffset = '-50px';
      if (arrow.direction === 'right') xOffset = '50px';
      
      return `calc(${arrow.x}% + ${xOffset}) calc(${arrow.y}% + ${yOffset})`;
  }

  const transformOrigin = getTransformOrigin();
  const scaleValue = typeof zoom === 'number' ? zoom : 2.5;
  
  const zoomStyle: React.CSSProperties = shouldZoom ? {
      transformOrigin,
      transform: `scale(${scaleValue})`, 
      transition: 'transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)'
  } : {
      transformOrigin,
      transform: 'scale(1)',
      transition: 'transform 1s ease-out'
  };

  return (
    <div className="group relative">
      <div
        className="relative overflow-hidden rounded-xl border-2 bg-safedark shadow-2xl transition-transform duration-300"
        style={{ borderColor: `${accentColor}40` }}
      >
        <div style={zoomStyle} className="relative">
            <img
            src={src}
            alt={caption}
            onError={handleError}
            className={`${className || "h-[60vh]"} w-auto object-contain opacity-100 transition-opacity`}
            />
        </div>
        
        {arrow && (
        <div 
            className="absolute z-10 pointer-events-none animate-bounce"
            style={{
            left: `${arrow.x}%`,
            top: `${arrow.y}%`,
            color: accentColor,
            transform: 'translate(-50%, -50%)',
            filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.8))'
            }}
        >
            <ArrowIcon size={64} strokeWidth={3} />
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

const LiveDemoContent = ({ data, accentColor, setBlockNavigation, isActive }: { data: SlideContent; accentColor: string; setBlockNavigation?: (blocked: boolean) => void; isActive: boolean }) => {
  const [password, setPassword] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [isCracking, setIsCracking] = useState(false);
  const [cracked, setCracked] = useState(false);
  
  // Camera/View State: 'panel' | 'terminal' | 'success'
  const [viewState, setViewState] = useState<'panel' | 'terminal' | 'success'>('panel');

  // Initialize and Reset
  React.useEffect(() => {
    if (isActive) {
      setPassword("");
      setLogs([]);
      setIsCracking(false);
      setCracked(false);
      setViewState('panel');
      setBlockNavigation?.(true); 
    } else {
        setBlockNavigation?.(false); 
    }
  }, [isActive, setBlockNavigation]);

  const startCracking = () => {
    if (isCracking || cracked) return;
    
    // Step 1: Start cracking logic
    setIsCracking(true);
    setLogs((prev) => [...prev, "> Inicjowanie ataku słownikowego...", "> Ładowanie wordlisty rockyou.txt..."]);
    
    // Step 2: Move camera to terminal
    setViewState('terminal');
    
    // Unblock navigation after starting attack
    setBlockNavigation?.(false);
  };

  // Listen for custom event from App.tsx
  React.useEffect(() => {
    if (!isActive) return;

    const handleSlideStep = () => {
      startCracking();
    };

    window.addEventListener("slide-step", handleSlideStep);
    return () => window.removeEventListener("slide-step", handleSlideStep);
  }, [isActive, isCracking, cracked, setBlockNavigation]);

  React.useEffect(() => {
    if (!isCracking) return;

    const commonPasswords = [
      "123456", "password", "12345678", "qwerty", "123456789", "12345", "111111", "1234567", "dragon",
      "adobe123", "123123", "football", "qwertyuiop", "monkey", "letmein", "princess", "shadow", "sunshine",
      "666666", "computer", "orange", "pussy", "master", "charlie", "superman", "jordan", "michael",
      "fuckyou", "secret", "harley", "battery", "starwars", "justin", "binker", "liverpool", "arsenal"
    ];

    const interval = setInterval(() => {
      const randomPass = commonPasswords[Math.floor(Math.random() * commonPasswords.length)];
      setLogs((prev) => {
        const newLogs = [...prev, `> Checking: ${randomPass} [FAILED]`];
        if (newLogs.length > 18) return newLogs.slice(newLogs.length - 18); 
        return newLogs;
      });
    }, 40); 

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setIsCracking(false);
      setCracked(true);
      const finalPass = "zaq12wsx";
      setLogs((prev) => [...prev, `> Checking: ${finalPass} [SUCCESS]`, `> PASSWORD FOUND: ${finalPass}`]);
      setPassword(finalPass);
      
      // Step 3: Move camera back to panel after 1s delay
      setTimeout(() => {
          setViewState('success');
      }, 1000);
      
    }, 4000); 

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isCracking]);

  // Calculate transforms based on viewState
  // Smooth translation without zoom
  const getContainerStyle = () => {
      const baseStyle = { transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)' };
      
      if (viewState === 'panel') {
          // Move down to center the panel
          return { ...baseStyle, transform: 'translateY(15vh)' };
      }
      if (viewState === 'terminal') {
          // Move up to center the terminal
          return { ...baseStyle, transform: 'translateY(-15vh)' };
      }
      if (viewState === 'success') {
          // Center everything
          return { ...baseStyle, transform: 'translateY(0)' };
      }
      return baseStyle;
  };

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <div 
            className="w-full max-w-5xl flex flex-col items-center gap-12"
            style={getContainerStyle()}
        >
        {/* Login Panel - Larger for TV */}
        <div className={`w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-700 border-2 ${viewState === 'panel' ? 'shadow-[0_0_60px_rgba(255,255,255,0.4)] border-blue-400 scale-105' : 'opacity-60 border-gray-200 scale-100 grayscale-[0.5]'}`}>
            <div className="bg-gray-100 px-8 py-6 border-b border-gray-200 flex justify-between items-center">
            <span className="font-bold text-gray-700 text-2xl">Panel Logowania</span>
            <div className="flex gap-3">
                <div className="w-4 h-4 rounded-full bg-red-400"></div>
                <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                <div className="w-4 h-4 rounded-full bg-green-400"></div>
            </div>
            </div>
            <div className="p-10 flex flex-col gap-8">
            <div>
                <label className="block text-gray-600 text-xl font-bold mb-3">Email</label>
                <input 
                type="email" 
                value={data.mainText} 
                readOnly 
                className="w-full border-2 border-gray-300 rounded-lg p-4 text-2xl text-gray-800 bg-gray-50 focus:outline-none font-medium"
                />
            </div>
            <div>
                <label className="block text-gray-600 text-xl font-bold mb-3">Hasło</label>
                <input 
                type="password" 
                value={password}
                readOnly
                className={`w-full border-2 rounded-lg p-4 text-2xl text-gray-800 focus:outline-none transition-colors duration-300 ${cracked ? 'border-green-500 bg-green-50 text-green-700 font-bold' : 'border-gray-300'}`}
                placeholder={isCracking ? "Łamanie hasła..." : "••••••••"}
                />
            </div>
            <button 
                onClick={startCracking}
                disabled={isCracking || cracked}
                className={`mt-4 w-full font-bold py-4 px-6 rounded-lg text-xl tracking-wide transition-all duration-300 shadow-lg ${
                isCracking 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : cracked 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
                {isCracking ? 'PRZEPROWADZANIE ATAKU...' : cracked ? 'DOSTĘP UZYSKANY' : 'ZALOGUJ SIĘ'}
            </button>
            </div>
        </div>

        {/* Attacker Terminal - Larger font */}
        <div className={`w-full bg-black rounded-xl border-2 font-mono text-lg p-6 shadow-2xl relative overflow-hidden min-h-[400px] transition-all duration-700 ${viewState === 'terminal' ? 'shadow-[0_0_80px_rgba(0,255,0,0.3)] border-green-500/50 scale-105' : 'opacity-60 border-gray-800 scale-100'}`}>
            <div className="absolute top-0 left-0 right-0 bg-gray-900 px-6 py-3 flex items-center justify-between border-b border-gray-800">
            <span className="text-gray-400 font-bold tracking-wider">root@kali:~/hydra</span>
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            </div>
            
            <div className="mt-10 flex flex-col gap-1.5 text-green-500 font-medium">
            <div className="text-gray-400 mb-4 text-xl">$ hydra -l {data.mainText} -P rockyou.txt smtp://mail.firma.pl</div>
            {logs.map((log, i) => (
                <div key={i} className={`${log.includes('SUCCESS') ? 'text-white bg-green-900/80 font-bold p-2 text-xl animate-pulse' : 'opacity-90'}`}>
                {log}
                </div>
            ))}
            {isCracking && (
                <div className="animate-pulse text-2xl mt-2">_</div>
            )}
            </div>
            
            {!isCracking && !cracked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[2px]">
                <div className="text-gray-500 text-2xl font-mono animate-pulse">
                    OCZEKIWANIE NA ROZPOCZĘCIE ATAKU...
                </div>
            </div>
            )}
        </div>
        </div>
    </div>
  );
};

export const SlideLayout: React.FC<SlideLayoutProps> = ({ data, isActive, setBlockNavigation }) => {
  const Icon = data.icon;
  const accentColor = data.accentColor || "#00F3FF";

  // Base transition styles
  const containerClasses = `absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500 ease-out ${
    isActive
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
          <div className="w-full flex justify-center" style={stagger(isActive, 0, "scale")}>
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

      case SlideType.IMAGE:
        return (
          <div className="w-full max-w-[90vw] flex flex-col items-center gap-10">
            <div
              className="text-center space-y-4"
              style={stagger(isActive, 0, "up")}
            >
              <h2
                className="text-5xl md:text-7xl font-bold uppercase tracking-tight"
                style={{ color: accentColor }}
              >
                {data.mainText}
              </h2>
              {data.description && (
                <p className="text-gray-300 font-mono text-2xl md:text-4xl max-w-5xl leading-relaxed">
                  {data.description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-10 w-full mt-2 items-end">
              {data.images?.map((img, idx) => (
                <div key={idx} style={stagger(isActive, 300 + idx * 150, "up")}>
                  <SlideImage
                    url={img.url}
                    caption={img.caption}
                    accentColor={accentColor}
                    arrow={img.arrow}
                    className={img.className}
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
                      className="text-left space-y-6 mt-8 pl-4 md:pl-12"
                      style={stagger(isActive, 600, "right")}
                    >
                      {data.bulletPoints.map((point, i) => (
                        <li key={i} className="font-mono text-gray-300 text-2xl md:text-4xl flex items-start">
                          <span style={{ color: accentColor }} className="mr-6 font-bold">•</span>
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
