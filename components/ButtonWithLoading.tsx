import React from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

interface ButtonWithLoadingProps {
  isLoading: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonWithLoading: React.FC<ButtonWithLoadingProps> = ({
  isLoading,
  className = "",
  type = "submit",
  children,
  onClick,
}) => {
  return (
    <Button
      disabled={isLoading}
      className={`${className}`}
      type={type}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default ButtonWithLoading;
