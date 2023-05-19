import { useCreateSubscriptionMutation } from "@/generated/graphql";
import React from "react";
import StripeCheckout from "react-stripe-checkout";

export const CheckoutButton = () => {
  const [, subscibe] = useCreateSubscriptionMutation();

  return (
    <StripeCheckout
      token={async (token) => {
        const res = await subscibe({ source: token.id });
        console.log(res);
      }}
      stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE!}
    />
  );
};

// export default withUrqlClient(urqlConfig)(Subscribe);
