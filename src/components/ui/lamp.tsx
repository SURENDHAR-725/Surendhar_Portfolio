"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("lamp-wrapper", className)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        overflow: "hidden",
        background: "transparent",
        width: "100%",
        zIndex: 0,
        paddingTop: "6rem",
        paddingBottom: "2rem",
      }}
    >
      {/* All lamp effects — use flexbox centering instead of left/transform */}
      <div
        style={{
          position: "absolute",
          top: "2rem",
          left: 0,
          right: 0,
          height: "18rem",
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Wide ambient glow — continuous pulse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.4, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "0",
            width: "30rem",
            maxWidth: "90vw",
            height: "12rem",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(0, 200, 255, 0.3), rgba(0, 200, 255, 0.08) 50%, transparent 70%)",
            filter: "blur(35px)",
          }}
        >
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.95, 1.08, 0.95],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(0, 200, 255, 0.3), rgba(0, 200, 255, 0.08) 50%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Core glow — continuous breathing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.55, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "0.5rem",
            width: "16rem",
            maxWidth: "70vw",
            height: "8rem",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(34, 211, 238, 0.5), rgba(34, 211, 238, 0.12) 50%, transparent 70%)",
            filter: "blur(20px)",
          }}
        >
          <motion.div
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(34, 211, 238, 0.5), rgba(34, 211, 238, 0.12) 50%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* The animated beam line — uses a centering wrapper so width animation stays centered */}
        <div
          style={{
            position: "absolute",
            top: "3rem",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <motion.div
            initial={{ width: "8rem", opacity: 0 }}
            whileInView={{ width: "30rem", opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            style={{
              height: "2px",
              maxWidth: "90vw",
              background:
                "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.8), rgba(0, 220, 255, 1), rgba(34, 211, 238, 0.8), transparent)",
              borderRadius: "9999px",
            }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 15px rgba(34, 211, 238, 0.4), 0 0 30px rgba(34, 211, 238, 0.2), 0 0 60px rgba(34, 211, 238, 0.05)",
                  "0 0 25px rgba(34, 211, 238, 0.8), 0 0 50px rgba(34, 211, 238, 0.4), 0 0 100px rgba(34, 211, 238, 0.15)",
                  "0 0 15px rgba(34, 211, 238, 0.4), 0 0 30px rgba(34, 211, 238, 0.2), 0 0 60px rgba(34, 211, 238, 0.05)",
                ],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "9999px",
                background:
                  "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.8), rgba(0, 220, 255, 1), rgba(34, 211, 238, 0.8), transparent)",
              }}
            />
          </motion.div>
        </div>

        {/* Downward light cone — subtle sway */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0.3 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "3.5rem",
            width: "24rem",
            maxWidth: "85vw",
            height: "14rem",
            transformOrigin: "top center",
          }}
        >
          <motion.div
            animate={{
              opacity: [0.7, 1, 0.7],
              scaleX: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            style={{
              width: "100%",
              height: "100%",
              transformOrigin: "top center",
              background:
                "radial-gradient(ellipse at top center, rgba(0, 200, 255, 0.18) 0%, rgba(0, 200, 255, 0.04) 45%, transparent 70%)",
            }}
          />
        </motion.div>
      </div>

      {/* Children (the heading text) */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "8rem",
        }}
      >
        {children}
      </div>
    </div>
  );
};
