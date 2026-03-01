import React from 'react';

interface NAICSTagProps {
  code: string;
}

function NAICSTag({ code }: NAICSTagProps): React.JSX.Element {
  return <span className="naics-tag">{code}</span>;
}

export default NAICSTag;
