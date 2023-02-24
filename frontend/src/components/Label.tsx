import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label
      className="block mb-2 text-sm text-left font-semibold text-grey"
      {...props}
    >
      {children}
    </label>
  );
};
