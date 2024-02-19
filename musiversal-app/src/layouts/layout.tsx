import {Fragment, FC} from "react";
import Header from "./Header";
import { ReactChildrenProps } from "../utils/types/types";

const Layout:FC<ReactChildrenProps>= ({ children }) => {
  return (
    <Fragment>
      <Header />
      <div className="bg-layout">{children}</div>
    </Fragment>
  );
};

export default Layout;
