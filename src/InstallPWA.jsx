import { useEffect, useState } from "react";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowInstall(false);
    }

    setDeferredPrompt(null);
  };

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50">
      <span>Install this app for better experience</span>

      <button
        onClick={handleInstall}
        className="bg-white text-black px-3 py-1 rounded-lg font-medium"
      >
        Install
      </button>

      <button
        onClick={() => setShowInstall(false)}
        className="text-gray-400"
      >
        ✕
      </button>
    </div>
  );
}