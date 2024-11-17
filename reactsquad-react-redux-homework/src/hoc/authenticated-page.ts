import { compose } from "@reduxjs/toolkit";

import withLoading from "./with-loading";
import withAuth from "./with-auth";

export default compose(withLoading, withAuth);
