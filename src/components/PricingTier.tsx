import React from 'react';

type Tier = 'starter' | 'growth' | 'enterprise' | 'sovereign';

interface PricingTierProps {
  tier: Tier;
  price?: string;
}

function PricingTier({ tier, price }: PricingTierProps): React.JSX.Element {
  const label = tier.charAt(0).toUpperCase() + tier.slice(1);

  return (
    <span className={`pricing-tier pricing-tier--${tier}`}>
      {label}
      {price && <> &middot; {price}</>}
    </span>
  );
}

export default PricingTier;
