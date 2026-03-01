import React from 'react';

type Entity =
  | 'AINEFF'
  | 'AINEF'
  | 'AINEG'
  | 'AINE'
  | 'WGE'
  | 'Frankmax'
  | 'LPI'
  | 'UniVenture';

interface EntityBadgeProps {
  entity: Entity;
}

function EntityBadge({ entity }: EntityBadgeProps): React.JSX.Element {
  return (
    <span className={`entity-badge entity-badge--${entity.toLowerCase()}`}>
      {entity}
    </span>
  );
}

export default EntityBadge;
