import ChangeCardButton from "@/components/ChangeCard";
import { CheckoutButton } from "@/components/CheckoutButton";
import NavBar from "@/components/NavBar";
import { useCancelSubscriptionMutation, useMeQuery } from "@/generated/graphql";
import { isServer, urqlConfig } from "@/utils/urqlClient";
import { withUrqlClient } from "next-urql";
import React from "react";

const Account: React.FC<{}> = ({}) => {
  const [{ data }] = useMeQuery({
    pause: isServer(),
  });
  const [, cancelSubscription] = useCancelSubscriptionMutation();

  return (
    <>
      <NavBar />
      <div>
        <div className="flex flex-col text-center mt-10">
          {data?.me?.username ?? ""}
          {data?.me?.type === "free-trial" ? (
            <CheckoutButton />
          ) : (
            <div>
              <div>You are subscribed!</div>
              <div>Last 4 digits of card: {data?.me?.last4}</div>
              <ChangeCardButton />
              <button
                className="w-2/12"
                onClick={() => {
                  cancelSubscription({});
                }}
              >
                Cancel Subscription
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withUrqlClient(urqlConfig)(Account);
