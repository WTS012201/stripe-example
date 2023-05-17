import { urqlConfig } from "@/utils/urqlClient";
import { withUrqlClient } from "next-urql";
import React from "react";
import StripeCheckout from "react-stripe-checkout";

const Subscribe = () => {
  return (
    <div className="min-h-screen flex flex-1 flex-col items-center  px-6 py-12 lg:px-8 w-auto">
      <StripeCheckout
        token={(token) => {
          console.log(token);
        }}
        stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE!}
      />
    </div>
  );
};

export default withUrqlClient(urqlConfig)(Subscribe);
