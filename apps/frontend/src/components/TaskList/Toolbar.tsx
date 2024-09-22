import { PropsWithChildren } from "react";

type TToolbarProps = {} & PropsWithChildren;

const Toolbar = ({ children }: TToolbarProps) => {
  return (
    <div className="flex">
      {children}
    </div>
  )
}

export default Toolbar;
