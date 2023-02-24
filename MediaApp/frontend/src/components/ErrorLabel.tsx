import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const ErrorLabel: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <span
      className={`${props.className} text-red-400 italic text-sm -mb-2 mt-1 block`}
      {...props}
    >
      {children}
    </span>
  );
};
