import { privateRequest } from "@/lib/axios/private-request";
import { ServerUser } from "@/types";
import { baseUrl } from "@/utils/apiUrls";
import getDataProperty from "@/utils/get-data-property";

/**
 * Get current user
 */

const currentUserRoute = `${baseUrl}/users/me`;

const getCurrentUserRequest = () =>
  privateRequest(baseUrl!).get<ServerUser>(`/users/me`).then(getDataProperty);

export { currentUserRoute, getCurrentUserRequest };
