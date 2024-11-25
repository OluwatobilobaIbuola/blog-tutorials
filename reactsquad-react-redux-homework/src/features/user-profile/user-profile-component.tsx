import { connect, ConnectedProps } from "react-redux";
import {
  getCurrentUser,
  removeCurrentUserProfile,
} from "./user-profile-reducer";
import { userIsSignedOut } from "../user-authentication/user-authentication-reducer";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const mapStateToProps = (state: RootState) => ({
  userData: getCurrentUser(state),
});
const mapDispatchToProps = {
  removeCurrentUserProfile,
  userIsSignedOut,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
export type UserProfilePropsFromRedux = ConnectedProps<typeof connector>;
function UserProfile({
  removeCurrentUserProfile,
  userIsSignedOut,
  userData,
}: UserProfilePropsFromRedux) {
  const router = useRouter();
  const handleLogout = () => {
    removeCurrentUserProfile();
    userIsSignedOut();
    router.push("/sign-in");
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center text-[16px]">
      <Button
        onClick={handleLogout}
        className="absolute top-4 right-4 border border-foreground"
      >
        Log out
      </Button>
      <div>
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded p-6">
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            <p>
              <strong>Name:</strong> {userData?.name}
            </p>
            <p>
              <strong>Username:</strong> {userData?.username}
            </p>
            <p>
              <strong>Email:</strong> {userData?.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData?.phone}
            </p>
            {userData?.website && (
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={`https://${userData?.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userData?.website}
                </a>
              </p>
            )}
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">Address</h2>
            <p>
              <strong>Street:</strong> {userData?.address?.street}
            </p>
            <p>
              <strong>Suite:</strong> {userData?.address?.suite}
            </p>
            <p>
              <strong>City:</strong> {userData?.address?.city}
            </p>
            <p>
              <strong>Zipcode:</strong> {userData?.address?.zipcode}
            </p>
            <p>
              <strong>Geo:</strong> Latitude: {userData?.address?.geo.lat},
              Longitude: {userData?.address?.geo.lng}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Company</h2>
            <p>
              <strong>Name:</strong> {userData?.company?.name}
            </p>
            <p>
              <strong>Catchphrase:</strong> {userData?.company?.catchPhrase}
            </p>
            <p>
              <strong>Business:</strong> {userData?.company?.bs}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(UserProfile);
