import { cn } from "@/lib/utils";

interface ModeSwitcherProps {
  currentMode: "chat" | "learn";
  onModeChange: (mode: "chat" | "learn") => void;
}

export const ModeSwitcher = ({ currentMode, onModeChange }: ModeSwitcherProps) => {
  return (
    <div className="bg-surface/80 backdrop-blur-sm rounded-full p-0.5 flex gap-0.5 border border-border/50">
      <button
        onClick={() => onModeChange("chat")}
        className={cn(
          "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
          currentMode === "chat"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Chat
      </button>
      <button
        onClick={() => onModeChange("learn")}
        className={cn(
          "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
          currentMode === "learn"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Learn
      </button>
    </div>
  );
};
