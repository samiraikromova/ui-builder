import { Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SubscriptionTier } from "@/types/subscription";

interface CreditsDisplayProps {
  tier?: SubscriptionTier;
}

export function CreditsDisplay({ tier = "starter" }: CreditsDisplayProps) {
  const credits = 50993.74;
  const planName = tier === "pro" ? "Pro" : tier === "starter" ? "Starter" : "Free";

  return (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className="bg-primary/20 text-primary-foreground border-primary/30">
        {planName}
      </Badge>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
        <Coins className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-foreground">{credits.toLocaleString()} credits</span>
      </div>
    </div>
  );
}