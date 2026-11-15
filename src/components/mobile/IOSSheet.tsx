"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useTranslations } from "next-intl";
import { XMarkSymbol } from "../shared/SFSymbols";

interface IOSSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: ReactNode;
  children: ReactNode;
  theme?: "dark" | "light";
}

export default function IOSSheet({
  isOpen,
  onClose,
  title,
  icon,
  children,
  theme = "dark",
}: IOSSheetProps) {
  const t = useTranslations();
  const isDark = theme === "dark";
  const [swipeProgress, setSwipeProgress] = useState(0);

  const handleHomeBarPan = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y < 0) {
      setSwipeProgress(Math.min(1, Math.abs(info.offset.y) / 90));
    } else {
      setSwipeProgress(0);
    }
  };

  const handleHomeBarPanEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setSwipeProgress(0);
    // Quick upward swipe or flick closes the app like an iPhone home bar
    if (info.offset.y < -28 || info.velocity.y < -180) {
      onClose();
    }
  };

  const sheetBg = isDark ? "#1c1c1e" : "#f2f2f7";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const homeBarColor = isDark ? "bg-white/75" : "bg-black/70";
  const bottomFadeBg = isDark
    ? "linear-gradient(to top, rgba(28, 28, 30, 0.94) 35%, rgba(28, 28, 30, 0) 100%)"
    : "linear-gradient(to top, rgba(242, 242, 247, 0.94) 35%, rgba(242, 242, 247, 0) 100%)";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Frosted Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* iOS Sheet */}
          <motion.div
            className={`fixed bottom-0 left-0 right-0 z-50 flex flex-col overflow-hidden border-t ${borderColor}`}
            style={{
              height: "92vh",
              background: sheetBg,
              borderRadius: "24px 24px 0 0",
              boxShadow: "0 -8px 40px rgba(0, 0, 0, 0.3)",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
            initial={{ y: "100%", scale: 1 }}
            animate={{
              y: -swipeProgress * 18,
              scale: 1 - swipeProgress * 0.04,
            }}
            exit={{ y: "100%", scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between px-6 py-4 border-b ${borderColor} flex-shrink-0`}
            >
              <div className="flex items-center gap-2 h-8">
                {typeof icon === "string" && icon ? (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-lg shadow-inner shrink-0 self-center">
                    {icon}
                  </div>
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center shrink-0 self-center">
                    {icon}
                  </div>
                )}
                <h2
                  className={`text-base font-semibold leading-none self-center m-0 ${textColor}`}
                >
                  {title}
                </h2>
              </div>

              {/* iOS style rounded close button */}
              <button
                className="w-7 h-7 rounded-full flex items-center justify-center transition-colors bg-[#E5E5EA]/85 hover:bg-[#D1D1D6] dark:bg-[#2C2C2E]/90 dark:hover:bg-[#3A3A3C] text-zinc-500 dark:text-zinc-400"
                onClick={onClose}
                aria-label={t("common.close")}
              >
                <XMarkSymbol className="w-3 h-3 shrink-0" />
              </button>
            </div>

            {/* Content Area */}
            <div
              className="flex-1 overflow-y-auto pb-12"
              style={{
                scrollbarWidth: "thin",
              }}
            >
              {children}
            </div>

            {/* Bottom iPhone Swipe-Up Home Bar */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-10 flex items-end justify-center pb-2.5 z-30 cursor-grab active:cursor-grabbing touch-none select-none"
              style={{ background: bottomFadeBg }}
              onPan={handleHomeBarPan}
              onPanEnd={handleHomeBarPanEnd}
              onClick={onClose}
              role="button"
              tabIndex={0}
              aria-label={t("mobile.home.goHome")}
              title={t("mobile.home.goHome")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onClose();
              }}
            >
              <div
                className={`w-[134px] h-[5px] rounded-full transition-transform duration-150 ${homeBarColor}`}
                style={{
                  transform: `scaleX(${1 + swipeProgress * 0.08})`,
                }}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
