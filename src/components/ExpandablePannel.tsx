import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import React, { ReactNode, useState } from 'react';

interface ExpandablePannelProps {
  header: ReactNode;
  children: ReactNode;
}

const ExpandablePannel: React.FC<ExpandablePannelProps> = ({ header, children }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = (): void => {
    setExpanded(prevValue => !prevValue);
  };

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center">
        <div className="flex flex-row items-center justify-between ">{header}</div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div className=" cursor-pointer" onClick={handleClick}>
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
};

export default ExpandablePannel;
