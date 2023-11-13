import { ReactElement, RefObject } from "react";

export interface TooltipComponent {
  children: ReactElement;
  target: RefObject<HTMLLabelElement>;
}
