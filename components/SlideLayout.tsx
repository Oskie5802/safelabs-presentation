import React, { useState } from "react";
import logoImg from "../assets/logo.png";
import { SlideContent, SlideType } from "../types";

interface SlideLayoutProps {
  data: SlideContent;
  isActive: boolean;
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
}: {
  url: string;
  caption?: string;
  accentColor: string;
}) => {
  const [src, setSrc] = useState(url);

  React.useEffect(() => {
    setSrc(url);
  }, [url]);

  const handleError = () => {
    setSrc(
      `https://placehold.co/400x700/1a1a1a/${accentColor.replace("#", "")}?text=${encodeURIComponent(caption || "Image Missing")}`,
    );
  };

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
      <div
        className="relative overflow-hidden rounded-xl border-2 bg-safedark shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
        style={{ borderColor: `${accentColor}40` }}
      >
        <img
          src={src}
          alt={caption}
          onError={handleError}
          className="h-[45vh] w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
        />
        {caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4 border-t border-gray-800">
            <p className="text-center font-mono text-base md:text-xl text-gray-300 uppercase tracking-wider font-bold">
              {caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const SlideLayout: React.FC<SlideLayoutProps> = ({ data, isActive }) => {
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
                LIVE ENVIRONMENT :: {data.contentUrl}
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

            <div className="flex flex-wrap justify-center gap-10 w-full mt-2">
              {data.images?.map((img, idx) => (
                <div key={idx} style={stagger(isActive, 300 + idx * 150, "up")}>
                  <SlideImage
                    url={img.url}
                    caption={img.caption}
                    accentColor={accentColor}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case SlideType.WARNING:
      case SlideType.INFO:
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
