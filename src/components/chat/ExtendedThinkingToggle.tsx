import { useState, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExtendedThinkingToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function ExtendedThinkingToggle({ enabled, onToggle }: ExtendedThinkingToggleProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors hover:bg-surface-hover",
          enabled && "bg-accent/10 text-accent"
        )}
      >
        <Sparkles className="h-4 w-4" />
        <span>Thinking</span>
      </button>

      {open && (
        <div className="absolute bottom-full right-0 mb-2 w-64 rounded-2xl border border-border bg-popover p-3 shadow-xl">
          <div className="mb-2 text-sm font-medium text-foreground">Extended thinking</div>
          <div className="mb-3 text-xs text-muted-foreground">
            Enable for complex reasoning tasks that require deeper analysis
          </div>
          <button
            onClick={() => {
              onToggle();
              setOpen(false);
            }}
            className={cn(
              "w-full rounded-xl px-4 py-2 text-sm transition-colors",
              enabled
                ? "bg-accent text-accent-foreground hover:bg-accent-hover"
                : "bg-surface text-foreground hover:bg-surface-hover"
            )}
          >
            {enabled ? "Disable" : "Enable"}
          </button>
        </div>
      )}
    </div>
  );
}
