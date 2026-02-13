import React, { useState } from 'react';
import { SlideContent, SlideType } from '../types';

interface SlideLayoutProps {
  data: SlideContent;
  isActive: boolean;
}

// Custom Shield Component
const CustomShieldLogo = () => (
  <svg width="140" height="160" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_25px_rgba(0,243,255,0.4)]">
    <defs>
      <linearGradient id="shieldGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00F3FF" />
        <stop offset="100%" stopColor="#0066FF" />
      </linearGradient>
    </defs>
    <path 
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
      fill="url(#shieldGradient)" 
    />
  </svg>
);

// Helper component to handle image state and fallbacks gracefully
const SlideImage = ({ url, caption, accentColor }: { url: string, caption?: string, accentColor: string }) => {
  const [src, setSrc] = useState(url);

  React.useEffect(() => {
    setSrc(url);
  }, [url]);

  const handleError = () => {
    // If the local asset fails, fall back to a placeholder that matches the theme
    setSrc(`https://placehold.co/400x700/1a1a1a/${accentColor.replace('#','')}?text=${encodeURIComponent(caption || 'Image Missing')}`);
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
  const accentColor = data.accentColor || '#00F3FF';

  // Base transition styles
  // IMPORTANT: pointer-events-auto added for IFRAME interaction if needed, though mostly we use keyboard for nav.
  const containerClasses = `absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500 ease-out ${
    isActive ? 'opacity-100 scale-100 blur-0 z-20 pointer-events-auto' : 'opacity-0 scale-95 blur-sm z-0 pointer-events-none'
  }`;

  const renderContent = () => {
    switch (data.type) {
      case SlideType.TITLE:
        return (
          <div className="flex flex-col items-center text-center space-y-12">
             <div className="relative">
                <div className="absolute inset-0 bg-cybercyan blur-[80px] opacity-20 rounded-full animate-pulse-slow"></div>
                {data.id === 'intro' ? (
                  <CustomShieldLogo />
                ) : (
                  Icon && <Icon size={140} color={accentColor} className="relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
                )}
             </div>
            
            <div className="tracking-wide">
              <h1 className="text-7xl md:text-9xl font-bold text-white mb-4 leading-none uppercase tracking-tighter">
                {data.title} <span style={{ color: accentColor }}>{data.subtitle}</span>
              </h1>
              {data.description && (
                <div className="flex flex-col items-center mt-10">
                  <div className="w-24 h-1.5 bg-gray-800 mb-8"></div>
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
          <div className="w-full h-full flex flex-col">
            <div className="flex-1 bg-white rounded-lg overflow-hidden border-4 relative" style={{ borderColor: accentColor }}>
              <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 font-mono text-sm z-10 rounded-br-lg border-b border-r" style={{ borderColor: accentColor }}>
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
             <div className="text-center space-y-4">
                <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight" style={{ color: accentColor }}>
                  {data.mainText}
                </h2>
                {data.description && <p className="text-gray-300 font-mono text-2xl md:text-4xl max-w-5xl leading-relaxed">{data.description}</p>}
             </div>
             
             <div className="flex flex-wrap justify-center gap-10 w-full mt-2">
                {data.images?.map((img, idx) => (
                  <SlideImage 
                    key={idx} 
                    url={img.url} 
                    caption={img.caption} 
                    accentColor={accentColor} 
                  />
                ))}
             </div>
          </div>
        );

      case SlideType.WARNING:
      case SlideType.INFO:
      default:
        return (
          <div className="max-w-[95vw] w-full">
            <div className={`relative bg-safedark border border-gray-800/50 rounded-2xl p-12 md:p-20 overflow-hidden`}>
              <div 
                className="absolute top-0 left-0 w-full h-2 opacity-80"
                style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
              ></div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
                <div className="flex-shrink-0 flex flex-col items-center gap-6">
                    <div 
                      className="p-8 bg-black/40 border-2 border-gray-800 rounded-2xl shadow-2xl"
                      style={{ borderColor: `${accentColor}40`, boxShadow: `0 0 30px ${accentColor}15` }}
                    >
                      {Icon && <Icon size={100} color={accentColor} />}
                    </div>
                    {data.title && (
                      <span className="font-mono text-xl text-gray-400 tracking-widest uppercase text-center max-w-[200px] font-bold">
                        {data.title}
                      </span>
                    )}
                </div>

                <div className="space-y-8 flex-1 text-center md:text-left">
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight">
                    {data.mainText}
                  </h2>
                  
                  {data.description && (
                    <p className="font-mono text-gray-300 text-2xl md:text-4xl border-l-0 md:border-l-4 border-gray-800 pl-0 md:pl-12 py-2 leading-relaxed font-medium">
                       <span style={{ color: accentColor }} className="hidden md:inline mr-6">{'>'}</span> {data.description}
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

  return (
    <div className={containerClasses}>
      {renderContent()}
    </div>
  );
};
