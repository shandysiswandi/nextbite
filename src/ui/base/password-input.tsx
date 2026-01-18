"use client";

import { Eye, EyeOff } from "lucide-react";
import { type ComponentProps, useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";

type PasswordInputProps = Omit<ComponentProps<"input">, "type"> & {
  defaultVisible?: boolean;
  groupClassName?: string;
  showLabel?: string;
  hideLabel?: string;
};

const PasswordInput = ({
  className,
  defaultVisible = false,
  disabled,
  groupClassName,
  hideLabel = "Hide password",
  showLabel = "Show password",
  ...props
}: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const toggleLabel = isVisible ? hideLabel : showLabel;

  return (
    <InputGroup
      className={groupClassName}
      data-disabled={disabled ? true : undefined}
    >
      <InputGroupInput
        className={className}
        disabled={disabled}
        type={isVisible ? "text" : "password"}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-pressed={isVisible}
          disabled={disabled}
          onClick={() => setIsVisible((value) => !value)}
          size="icon-sm"
          type="button"
        >
          {isVisible ? <Eye /> : <EyeOff />}
          <span className="sr-only">{toggleLabel}</span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

export { PasswordInput };
