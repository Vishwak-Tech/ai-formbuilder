import SubscriptionHero from "./_components/SubscriptionHero";
import SubscriptionStats from "./_components/SubscriptionStats";
import IncludedFeatures from "./_components/IncludedFeatures";
import PaymentInfo from "./_components/PaymentInfo";
import SubscriptionActions from "./_components/SubscriptionActions";

function SubscriptionDashboard({ subscription }) {
  return (
    <div className="space-y-8">
      <SubscriptionHero subscription={subscription} />

      <SubscriptionStats subscription={subscription} />

      <IncludedFeatures />

      <PaymentInfo subscription={subscription} />

      <SubscriptionActions subscription={subscription} />
    </div>
  );
}

export default SubscriptionDashboard;
