import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';
import React from 'react';

interface SkeletonProps {
  times: number;
  className: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ times, className }) => {
  /*
  Tailwind CSS Explained
  relative is going to allow us to position the inner element
  overflow hidden is what's going to hide the inner element if they are not overlapping
  shimmer is the little animation
  absolute positions it absolutely
  inset-0 expands to fill the outer div
  -translate-x-full allows the inner div to move far on the left hand side of the outer div
   */
  let outerClassNames = classNames('relative', 'overflow-hidden', 'bg-gray-200', 'rounded', 'mb-2.5', className);
  let innerClassNames = classNames(
    'animate-shimmer',
    'absolute',
    'inset-0',
    'bg-gradient-to-r',
    'from-gray-200',
    'via-white',
    'to-gray-200'
  );
  outerClassNames = twMerge(outerClassNames);
  innerClassNames = twMerge(innerClassNames);

  const skeletons = Array(times)
    .fill(0)
    .map((_, i) => (
      <div key={i} className={outerClassNames}>
        <div className={innerClassNames} />
      </div>
    ));

  return <>{skeletons}</>;
};

export default Skeleton;
