import { useChangeCardMutation } from "@/generated/graphql";
import React from "react";
import StripeCheckout from "react-stripe-checkout";

export const ChangeCardButton = () => {
  const [, changeCard] = useChangeCardMutation();

  return (
    <div className="sm:">
      <StripeCheckout
        label="Change Card"
        token={async (token) => {
          const res = await changeCard({
            source: token.id,
            last4: token.card.last4,
          });
        }}
        stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE!}
      />
    </div>
  );
};

export default ChangeCardButton;
