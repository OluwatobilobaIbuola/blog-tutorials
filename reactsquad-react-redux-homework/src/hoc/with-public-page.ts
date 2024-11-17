import { compose } from "@reduxjs/toolkit";
import withLoading from "./with-loading";
import withMobileBlocking from "./with-mobile-blocking";

export default compose(withLoading, withMobileBlocking);
