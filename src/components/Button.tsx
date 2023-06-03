import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  outline?: boolean;
  rounded?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  primary = false,
  secondary = false,
  success = false,
  warning = false,
  danger = false,
  outline = false,
  rounded = false,
  ...rest
}) => {
  const primaryOrSecondarySelected = primary || secondary;
  const mutuallyExclusiveProps = [success, warning, danger];
  const buttonShape = outline || rounded;
  const selectedPropsCount = mutuallyExclusiveProps.filter(prop => prop).length;

  if (primaryOrSecondarySelected && primary && secondary) {
    throw new Error('Only one of primary or secondary prop should be provided');
  }

  if (selectedPropsCount > 1) {
    throw new Error('Only one of success, warning, or danger prop should be provided');
  }

  if (buttonShape && outline && rounded) {
    throw new Error('Only one of outline or rounded prop should be provided');
  }

  let classes = classNames(rest.className, 'flex items-center px-3 py-1.5 border', {
    'border-blue-500 bg-blue-500 text-white': primary,
    'border-gray-900 bg-gray-900 text-white': secondary,
    'border-green-500 bg-green-500 text-white': success,
    'border-yellow-400 bg-yellow-400 text-white': warning,
    'border-red-500 bg-red-500 text-white': danger,
    'rounded-full': rounded,
    'bg-white': outline,
    'text-blue-500': outline && primary,
    'text-gray-900': outline && secondary,
    'text-green-500': outline && success,
    'text-yellow-400': outline && warning,
    'text-red-500': outline && danger,
  });

  classes = twMerge(classes);

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
};

export default Button;
