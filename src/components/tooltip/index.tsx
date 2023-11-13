import { FC } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import TooltipBootstrap from "react-bootstrap/Tooltip";
import { TooltipComponent } from "./index.types.ts";

const Tooltip: FC<TooltipComponent> = ({ children }) => (
  <OverlayTrigger
    delay={{ show: 250, hide: 400 }}
    placement="right"
    overlay={
      <TooltipBootstrap id="button-tooltip">
        После подтверждения почты получите скидку 10% на следующий заказ
      </TooltipBootstrap>
    }
  >
    {children}
  </OverlayTrigger>
);

export default Tooltip;
