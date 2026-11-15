"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface iPadSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: ReactNode;
  children: ReactNode;
  theme: "dark" | "light";
}

export default function iPadSheet({
  isOpen,
  onClose,
  title,
  icon,
  children,
  theme,
}: iPadSheetProps) {
  const isDark = theme === "dark";

  const panelBackground = isDark
    ? "rgba(28, 28, 30, 0.98)"
    : "rgba(242, 242, 247, 0.98)";

  const titleColor = isDark ? "text-white" : "text-gray-900";
  const borderColor = isDark ? "border-white/10" : "border-black/10";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`absolute inset-0 z-40 flex flex-col overflow-hidden pt-7 pb-6`}
          style={{
            background: panelBackground,
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
          }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} application`}
        >
          {/* Top bar (App title / header) */}
          <div
            className={`flex items-center justify-between px-6 py-3.5 border-b ${borderColor} flex-shrink-0`}
          >
            <div className="flex items-center gap-3">
              {typeof icon === "string" && icon ? (
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-base shadow-md shrink-0 self-center"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(0,0,0,0.08)",
                  }}
                >
                  {icon}
                </div>
              ) : (
                <div className="w-8 h-8 flex items-center justify-center shrink-0 self-center">
                  {icon}
                </div>
              )}
              <h2
                className={`text-base font-semibold tracking-tight leading-none m-0 self-center ${titleColor}`}
              >
                {title}
              </h2>
            </div>

            {/* Subtle top right indicator / option if needed, keeping it clean */}
            <div className="w-8 h-8" />
          </div>

          {/* Scrollable content */}
          <div
            className="flex-1 overflow-y-auto pb-4"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: isDark
                ? "rgba(255,255,255,0.2) transparent"
                : "rgba(0,0,0,0.2) transparent",
            }}
          >
            {children}
          </div>

          {/* iPad Home Indicator Grab Bar at the bottom to quit app */}
          <motion.div
            drag="y"
            dragConstraints={{ top: -150, bottom: 0 }}
            dragElastic={{ top: 0.2, bottom: 0 }}
            dragMomentum={false}
            onDragEnd={(event, info) => {
              // If dragged up by 50px or more, exit the application
              if (info.offset.y < -50) {
                onClose();
              }
            }}
            className="absolute bottom-2.5 w-[140px] h-[5px] bg-zinc-400/60 dark:bg-zinc-500/50 rounded-full cursor-pointer z-50 touch-none"
            style={{ left: "50%", x: "-50%" }}
            whileHover={{
              scaleY: 1.4,
              backgroundColor: isDark
                ? "rgba(255,255,255,0.7)"
                : "rgba(0,0,0,0.7)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            role="button"
            aria-label="Home / Close Application"
            title="Swipe up or click to close application"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
