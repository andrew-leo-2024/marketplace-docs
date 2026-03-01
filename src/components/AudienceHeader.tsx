import React from 'react';

interface AudienceHeaderProps {
  audienceNum: number;
  name: string;
  naics: string;
  sic: string;
  budgetCycle: string;
  decisionMaker: string;
}

function AudienceHeader({
  audienceNum,
  name,
  naics,
  sic,
  budgetCycle,
  decisionMaker,
}: AudienceHeaderProps): React.JSX.Element {
  return (
    <div className="audience-header">
      <h2 style={{ marginBottom: '8px' }}>
        Audience {audienceNum}: {name}
      </h2>
      <div className="audience-header__naics">
        NAICS: {naics} &middot; SIC: {sic} &middot; Budget Cycle: {budgetCycle}
      </div>
      <div className="audience-header__decision-maker">
        Decision Maker: {decisionMaker}
      </div>
    </div>
  );
}

export default AudienceHeader;
