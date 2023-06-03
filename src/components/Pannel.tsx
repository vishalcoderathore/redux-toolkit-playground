import React, { ReactNode, HTMLProps } from 'react';
import classNames from 'classnames';

interface PanelProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Panel: React.FC<PanelProps> = ({ children, className, ...rest }) => {
  const finalClassNames = classNames('border rounded p-3 shadow bg-white w-full', className);

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
};

export default Panel;
