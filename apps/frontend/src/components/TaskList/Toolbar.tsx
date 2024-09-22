import { PropsWithChildren } from "react";

type TToolbarProps = {} & PropsWithChildren;

const Toolbar = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex">
      {children}
    </div>
  )
}

export default Toolbar;
