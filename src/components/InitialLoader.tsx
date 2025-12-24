"use client";
import { useEffect, useState } from "react";

export function InitialLoader() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const hasLoadedInSession = sessionStorage.getItem("hasLoadedInSession");
    
    if (hasLoadedInSession) {
      setIsInitialLoad(false);
    } else {
      sessionStorage.setItem("hasLoadedInSession", "true");
      
      const handleLoad = () => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsInitialLoad(false);
        }, 500);
      };

      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }
  }, []);

  if (!isInitialLoad) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0B192C] transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <span className="loader"></span>
    </div>
  );
}

