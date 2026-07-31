import { memo, useEffect, useState, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { playMacbookClickSound } from "../../utils/sound";

interface CSSCustomProperties extends React.CSSProperties {
  "--keycap-height"?: string;
}

type KeycapProps = {
  height?: string;
  keylightColor?: "default" | "red" | "blue" | "green" | "purple" | "rgb";
  char?: string;
  secondaryChar?: string;
  className?: string;
  onClick?: () => void;
  isPressed?: boolean;
} & VariantProps<typeof keycapVariants>;

const keycapVariants = cva(
  "relative flex flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-[5px] bg-gradient-to-b p-2 leading-4 bg-blend-overlay transition-all duration-200 ease-out select-none",
  {
    variants: {
      variant: {
        default: "aspect-square",
        double: "aspect-square",
        tab: "aspect-[1.77] [&_span]:text-[calc(var(--keycap-height)/3.5)]",
        caps: "aspect-[1.85] [&_span]:text-[calc(var(--keycap-height)/3.5)]",
        shift: "aspect-[2.32] [&_span]:text-[calc(var(--keycap-height)/3.5)]",
        command: "aspect-[1.34] [&_span]:text-[calc(var(--keycap-height)/3.5)]",
        space: "aspect-[8.3] [&_span]:text-[calc(var(--keycap-height)/3.5)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const keylightColors = {
  default: {
    light: "before:shadow-[0px_1px_3px_0px_#00000015]",
    dark: "dark:before:shadow-[0px_2px_5px_0px_#ffffff20]",
  },
  red: {
    light: "before:shadow-[0px_1px_3px_0px_#ff000040]",
    dark: "dark:before:shadow-[0px_2px_5px_0px_#ff0000]",
  },
  blue: {
    light: "before:shadow-[0px_1px_3px_0px_#0000ff40]",
    dark: "dark:before:shadow-[0px_2px_5px_0px_#0000ff]",
  },
  green: {
    light: "before:shadow-[0px_1px_3px_0px_#00ff0040]",
    dark: "dark:before:shadow-[0px_2px_5px_0px_#00ff00]",
  },
  purple: {
    light: "before:shadow-[0px_1px_3px_0px_#80008040]",
    dark: "dark:before:shadow-[0px_2px_5px_0px_#800080]",
  },
  rgb: {
    light:
      "before:shadow-[0px_1px_3px_0px_var(--rgb-color)] before:transition-[box-shadow] before:duration-300 before:ease-in-out",
    dark: "dark:before:shadow-[0px_2px_5px_0px_var(--rgb-color)] before:transition-[box-shadow] before:duration-300 before:ease-in-out",
  },
};

const rgbColors = [
  "#ff0000",
  "#ff00ff",
  "#0000ff",
  "#00ffff",
  "#00ff00",
  "#ffff00",
];

const RGBAnimation = memo(function RGBAnimation({
  currentColorIndex,
  keylightColor,
}: {
  currentColorIndex: number;
  keylightColor: string;
}) {
  if (keylightColor !== "rgb") return null;

  return (
    <style>{`
      :root {
        --rgb-color: ${rgbColors[currentColorIndex]};
      }
    `}</style>
  );
});

export const Keycap = memo(function Keycap({
  height = "48px",
  keylightColor = "default",
  char,
  secondaryChar,
  variant,
  className,
  onClick,
  isPressed,
}: KeycapProps) {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  if (secondaryChar && variant !== "double") {
    console.warn("secondaryChar should only be used with variant 'double'");
    secondaryChar = undefined;
  }

  useEffect(() => {
    if (keylightColor !== "rgb") return;

    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % rgbColors.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [keylightColor]);

  return (
    <>
      <RGBAnimation
        currentColorIndex={currentColorIndex}
        keylightColor={keylightColor}
      />
      <div
        onClick={() => {
          playMacbookClickSound(char || secondaryChar);
          if (onClick) onClick();
        }}
        style={
          {
            "--keycap-height": height,
          } as CSSCustomProperties
        }
        className={cn(
          keycapVariants({ variant }),
          "dark:from-secondary dark:to-background/50 gap-0.5 from-white to-neutral-50 text-neutral-800/80 drop-shadow-sm dark:text-[#D8D8D8]",
          "shadow-[0_1.5px_0.5px_2.5px_rgb(163_163_163/0.08),0_0_0.5px_1px_rgb(163_163_163/0.12),inset_0_2px_1px_1px_rgb(163_163_163/0.06),inset_0_1px_1px_1px_rgb(255_255_255/0.6)] dark:shadow-[0_1.5px_0.5px_2.5px_rgba(0,0,0,0.5),0_0_0.5px_1px_#000,inset_0_2px_1px_1px_rgba(0,0,0,0.25),inset_0_1px_1px_1px_rgba(255,255,255,0.2)]",
          "hover:translate-y-px hover:bg-gradient-to-b hover:from-neutral-50/40 hover:to-neutral-100/30 dark:hover:from-[rgba(255,255,255,0.04)] dark:hover:to-[rgba(255,255,255,0.016)]",
          "hover:shadow-[0_1.5px_1px_0px_rgb(163_163_163/0.06),0_0_0.5px_1px_rgb(163_163_163/0.1),inset_0_0.5px_1px_0.5px_rgb(255_255_255/0.5)] dark:hover:shadow-[0_1.5px_1px_0px_rgba(0,0,0,0.2),0_0_0.5px_1px_#000,inset_0_0.5px_1px_0.5px_rgba(255,255,255,0.2)]",
          isPressed && "translate-y-1 scale-[0.98] border-cyan-400/50 shadow-[0_0_12px_rgba(0,212,255,0.6)] !bg-cyan-500/20 text-cyan-300",
          "before:absolute before:inset-0 before:rounded-[inherit]",
          keylightColors[keylightColor].light,
          keylightColors[keylightColor].dark,
          "h-[var(--keycap-height)]",
          "will-change-transform",
          className
        )}
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-center pointer-events-none">
          {variant === "double" ? (
            <div className="flex h-full w-full flex-col items-center justify-between p-[15%]">
              <span className="text-[calc(var(--keycap-height)/4)] leading-none font-medium">
                {secondaryChar}
              </span>
              <span className="text-[calc(var(--keycap-height)/3.5)] leading-none font-medium">
                {char}
              </span>
            </div>
          ) : (
            <span className="text-[calc(var(--keycap-height)/2.75)] leading-none font-medium">
              {char}
            </span>
          )}
        </div>
      </div>
    </>
  );
});

type KeyboardProps = {
  children: ReactNode;
  className?: string;
  gap?: "sm" | "md" | "lg";
};

export function Keyboard({ children, className, gap = "md" }: KeyboardProps) {
  return (
    <div
      className={cn(
        "border-border rounded-[10px] border !bg-white p-2.5 dark:!bg-[#21222550]",
        className
      )}
    >
      <div
        className={cn("relative flex flex-col", {
          "gap-1": gap === "sm",
          "gap-2.5": gap === "md",
          "gap-3": gap === "lg",
        })}
      >
        {children}
      </div>
    </div>
  );
}

type KeyRowProps = {
  children: ReactNode;
  className?: string;
  gap?: "sm" | "md" | "lg";
};

export function KeyRow({ children, className, gap = "md" }: KeyRowProps) {
  return (
    <div
      className={cn(
        "flex flex-nowrap",
        {
          "gap-1": gap === "sm",
          "gap-2.5": gap === "md",
          "gap-3": gap === "lg",
        },
        className
      )}
    >
      {children}
    </div>
  );
}

const KEY_HEIGHT = "44px";

const TOP_ROW_KEYS = [
  { char: "§", secondaryChar: "±" },
  { char: "1", secondaryChar: "!" },
  { char: "2", secondaryChar: "@" },
  { char: "3", secondaryChar: "£" },
  { char: "4", secondaryChar: "$" },
  { char: "5", secondaryChar: "%" },
  { char: "6", secondaryChar: "^" },
  { char: "7", secondaryChar: "&" },
  { char: "8", secondaryChar: "*" },
  { char: "9", secondaryChar: "(" },
  { char: "0", secondaryChar: ")" },
  { char: "-", secondaryChar: "_" },
  { char: "=", secondaryChar: "+" },
];

const SECOND_ROW_KEYS = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];

const THIRD_ROW_KEYS = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];

const FOURTH_ROW_KEYS = ["Z", "X", "C", "V", "B", "N", "M"];

const SPECIAL_KEYS = {
  SECOND_ROW_END: [
    { char: "[", secondaryChar: "{" },
    { char: "]", secondaryChar: "}" },
    { char: "\\", secondaryChar: "|" },
  ],
  THIRD_ROW_END: [
    { char: ";", secondaryChar: ":" },
    { char: "'", secondaryChar: '"' },
  ],
  FOURTH_ROW_END: [
    { char: ",", secondaryChar: "<" },
    { char: ".", secondaryChar: ">" },
    { char: "/", secondaryChar: "?" },
  ],
};

interface KeyboardDemoProps {
  onKeyPress?: (char: string) => void;
  activeKey?: string | null;
}

export function AnimatedKeyboard({ onKeyPress, activeKey }: KeyboardDemoProps) {
  const handleKey = (char: string) => {
    if (onKeyPress) onKeyPress(char);
  };

  return (
    <div className="flex w-full overflow-x-auto py-2 px-1 items-center justify-center scrollbar-none">
      <div className="min-w-[680px] transform scale-90 sm:scale-95 md:scale-100 transition-transform origin-center">
        <Keyboard className="bg-[#121829]/80 border-cyan-500/20 backdrop-blur-md shadow-2xl shadow-cyan-950/40">
          {/* Top Row */}
          <KeyRow>
            {TOP_ROW_KEYS.map((key) => (
              <Keycap
                key={key.char}
                char={key.char}
                secondaryChar={key.secondaryChar}
                variant="double"
                height={KEY_HEIGHT}
                keylightColor="rgb"
                isPressed={activeKey?.toUpperCase() === key.char || activeKey === key.secondaryChar}
                onClick={() => handleKey(key.char)}
                className="w-10 sm:w-12"
              />
            ))}
            <Keycap
              char="delete"
              variant="tab"
              height={KEY_HEIGHT}
              keylightColor="rgb"
              onClick={() => handleKey("Backspace")}
              className="w-[64px] sm:w-[76px] items-end text-xs"
            />
          </KeyRow>

          {/* Second Row */}
          <KeyRow>
            <Keycap
              char="⇥"
              variant="tab"
              height={KEY_HEIGHT}
              keylightColor="rgb"
              onClick={() => handleKey("Tab")}
              className="w-[64px] sm:w-[76px] items-start text-xs"
            />
            {SECOND_ROW_KEYS.map((char) => (
              <Keycap
                key={char}
                char={char}
                height={KEY_HEIGHT}
                keylightColor="rgb"
                isPressed={activeKey?.toUpperCase() === char}
                onClick={() => handleKey(char)}
                className="w-10 sm:w-12"
              />
            ))}
            {SPECIAL_KEYS.SECOND_ROW_END.map((key) => (
              <Keycap
                key={key.char}
                char={key.char}
                secondaryChar={key.secondaryChar}
                variant="double"
                height={KEY_HEIGHT}
                keylightColor="rgb"
                isPressed={activeKey === key.char || activeKey === key.secondaryChar}
                onClick={() => handleKey(key.char)}
                className="w-10 sm:w-12"
              />
            ))}
          </KeyRow>

          {/* Third Row */}
          <KeyRow>
            <Keycap
              char="⇧"
              variant="caps"
              height={KEY_HEIGHT}
              keylightColor="rgb"
              onClick={() => handleKey("Shift")}
              className="w-20 sm:w-24 items-start text-xs"
            />
            {THIRD_ROW_KEYS.map((char) => (
              <Keycap
                key={char}
                char={char}
                height={KEY_HEIGHT}
                keylightColor="rgb"
                isPressed={activeKey?.toUpperCase() === char}
                onClick={() => handleKey(char)}
                className="w-10 sm:w-12"
              />
            ))}
            {SPECIAL_KEYS.THIRD_ROW_END.map((key) => (
              <Keycap
                key={key.char}
                char={key.char}
                secondaryChar={key.secondaryChar}
                variant="double"
                height={KEY_HEIGHT}
                keylightColor="rgb"
                isPressed={activeKey === key.char || activeKey === key.secondaryChar}
                onClick={() => handleKey(key.char)}
                className="w-10 sm:w-12"
              />
            ))}
            <Keycap
              char="⏎"
              variant="shift"
              height={KEY_HEIGHT}
              keylightColor="rgb"
              onClick={() => handleKey("Enter")}
              className="w-[72px] sm:w-[86px] items-end text-xs"
            />
          </KeyRow>

          {/* Fourth Row */}
          <KeyRow>
            <Keycap
              char="⇧"
              variant="shift"
              height={KEY_HEIGHT}
              keylightColor="rgb"
              onClick={() => handleKey("Shift")}
              className="w-[54px] sm:w-[66px] items-start text-xs"
            />
            <Keycap
              char="`"
              secondaryChar="~"
              variant="double"
              height={KEY_HEIGHT}
              keylightColor="rgb"
              isPressed={activeKey === "`" || activeKey === "~"}
              onClick={() => handleKey("`")}
              className="w-10 sm:w-12"
            />
            {FOURTH_ROW_KEYS.map((char) => (
              <Keycap
                key={char}
                char={char}
                height={KEY_HEIGHT}
                keylightColor="rgb"
                isPressed={activeKey?.toUpperCase() === char}
                onClick={() => handleKey(char)}
                className="w-10 sm:w-12"
              />
            ))}
            {SPECIAL_KEYS.FOURTH_ROW_END.map((key) => (
              <Keycap
                key={key.char}
                char={key.char}
                secondaryChar={key.secondaryChar}
                variant="double"
                height={KEY_HEIGHT}
                keylightColor="rgb"
                isPressed={activeKey === key.char || activeKey === key.secondaryChar}
                onClick={() => handleKey(key.char)}
                className="w-10 sm:w-12"
              />
            ))}
            <Keycap
              char="⇧"
              variant="shift"
              height={KEY_HEIGHT}
              keylightColor="rgb"
              onClick={() => handleKey("Shift")}
              className="w-[96px] sm:w-[116px] items-end text-xs"
            />
          </KeyRow>

          {/* Bottom Row */}
          <KeyRow>
            <Keycap
              char="fn"
              variant="command"
              height={KEY_HEIGHT}
              keylightColor="rgb"
              className="w-10 sm:w-12 text-xs"
            />
            <Keycap
              char="⌃"
              variant="command"
              height={KEY_HEIGHT}
              keylightColor="rgb"
              className="w-10 sm:w-12 text-xs"
            />
            <Keycap
              char="⌥"
              variant="command"
              height={KEY_HEIGHT}
              keylightColor="rgb"
              className="w-10 sm:w-12 text-xs"
            />
            <Keycap
              char="⌘"
              variant="command"
              height={KEY_HEIGHT}
              keylightColor="rgb"
              className="w-[54px] sm:w-[66px] text-xs"
            />
            <Keycap
              char=""
              variant="space"
              height={KEY_HEIGHT}
              keylightColor="rgb"
              isPressed={activeKey === " "}
              onClick={() => handleKey(" ")}
              className="flex-1"
            />
            <Keycap
              char="⌘"
              variant="command"
              height={KEY_HEIGHT}
              keylightColor="rgb"
              className="w-[54px] sm:w-[66px] text-xs"
            />
            <Keycap
              char="⌥"
              variant="command"
              height={KEY_HEIGHT}
              keylightColor="rgb"
              className="w-10 sm:w-12 text-xs"
            />
            <Keycap
              char="fn"
              variant="command"
              height={KEY_HEIGHT}
              keylightColor="rgb"
              className="w-10 sm:w-12 text-xs"
            />
          </KeyRow>
        </Keyboard>
      </div>
    </div>
  );
}

export default AnimatedKeyboard;
