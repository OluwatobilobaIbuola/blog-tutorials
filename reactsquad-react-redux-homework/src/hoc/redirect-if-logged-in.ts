"use client";

import { getIsAuthenticated } from "@/features/user-profile/user-profile-reducer";
import redirect from "./redirect";

export default redirect(getIsAuthenticated);
