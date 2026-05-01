import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <AnimatePresence>
      {showInstall && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
        >
          <div
            className="
              w-full sm:w-auto sm:max-w-md
              bg-white/10 backdrop-blur-xl
              border border-white/20
              text-white
              px-5 py-4
              sm:rounded-2xl
              rounded-t-2xl
              shadow-2xl
              flex items-center gap-4
              safe-bottom
            "
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold">
              +
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="text-sm font-semibold">Install App</p>
              <p className="text-xs text-gray-300">
                Get faster access & better experience
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleInstall}
                className="bg-white text-black px-3 py-1.5 rounded-lg text-sm font-medium active:scale-95 transition"
              >
                Install
              </button>

              <button
                onClick={() => setShowInstall(false)}
                className="text-gray-300 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}