import React from 'react';

interface BPMNDiagramProps {
  chart: string;
  title?: string;
}

function BPMNDiagram({ chart, title }: BPMNDiagramProps): React.JSX.Element {
  return (
    <div style={{ margin: '16px 0' }}>
      {title && (
        <div
          style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#CADCFC',
            marginBottom: '8px',
          }}
        >
          {title}
        </div>
      )}
      <pre>
        <code className="language-mermaid">{chart}</code>
      </pre>
    </div>
  );
}

export default BPMNDiagram;
