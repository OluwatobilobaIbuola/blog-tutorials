import { compose } from "@reduxjs/toolkit";
import withMobileBlocking from "./with-mobile-blocking";
import authenticatedPage from "./authenticated-page";
import withLayout from "./with-layout";

export default compose(withMobileBlocking, authenticatedPage, withLayout);
