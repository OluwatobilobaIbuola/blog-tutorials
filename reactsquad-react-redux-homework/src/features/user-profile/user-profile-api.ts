import { privateRequest } from "@/lib/axios/private-request";
import { DataResponse } from "@/types";
// import { baseUrl } from "@/utils/apiUrls";
// import getDataProperty from "@/utils/get-data-property";
// import { UserProfile } from "./user-profile-types";

/**
 * Get current user
 */

const getCurrentUserRequest = () =>
  privateRequest("https://jsonplaceholder.typicode.com").get("/users/1");

export { getCurrentUserRequest };
