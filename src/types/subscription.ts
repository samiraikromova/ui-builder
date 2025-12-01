export type SubscriptionTier = "free" | "starter" | "pro";

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  price: number;
  features: string[];
}

export const PLANS: Record<SubscriptionTier, SubscriptionPlan> = {
  free: {
    tier: "free",
    name: "Free",
    price: 0,
    features: [
      "Basic tools access",
      "5 chats per day",
      "Community support"
    ]
  },
  starter: {
    tier: "starter",
    name: "Starter",
    price: 29,
    features: [
      "All basic tools",
      "Unlimited chats",
      "Email support",
      "50 AI requests per day"
    ]
  },
  pro: {
    tier: "pro",
    name: "Pro",
    price: 99,
    features: [
      "All tools including premium",
      "Unlimited chats",
      "Priority support",
      "Unlimited AI requests",
      "Early access to new features",
      "Advanced analytics"
    ]
  }
};
