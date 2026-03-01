import React from 'react';

interface ProductCardProps {
  title: string;
  category: string;
  problemSolved: string;
  entity?: string;
  audienceNum?: number;
}

function ProductCard({
  title,
  category,
  problemSolved,
  entity,
  audienceNum,
}: ProductCardProps): React.JSX.Element {
  return (
    <div className="product-card">
      <div className="product-card__category">{category}</div>
      <div className="product-card__title">{title}</div>
      <p style={{ fontSize: '0.9rem', margin: '8px 0 0' }}>{problemSolved}</p>
      {(entity || audienceNum !== undefined) && (
        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {entity && (
            <span className={`entity-badge entity-badge--${entity.toLowerCase()}`}>
              {entity}
            </span>
          )}
          {audienceNum !== undefined && (
            <span className="naics-tag">Audience {audienceNum}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductCard;
