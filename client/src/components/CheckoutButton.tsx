import { useCreateSubscriptionMutation } from "@/generated/graphql";
import React from "react";
import StripeCheckout from "react-stripe-checkout";

export const CheckoutButton = () => {
  const [, subscibe] = useCreateSubscriptionMutation();

  return (
    <div className="sm:">
      <StripeCheckout
        label="Subscribe"
        token={async (token) => {
          const res = await subscibe({
            last4: token.card.last4,
            source: token.id,
          });
        }}
        stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE!}
      />
    </div>
  );
};
