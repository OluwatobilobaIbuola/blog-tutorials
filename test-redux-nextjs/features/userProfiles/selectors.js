import { converge, pipe, prop, propOr } from "ramda";

const selectUserProfileSlice = (state) => prop("userProfile")(state);

const selectCurrentUserId = pipe(selectUserProfileSlice, prop("currentUserId"));

const selectUsers = pipe(selectUserProfileSlice, prop("users"));

const selectCurrentUser = converge(prop, [selectCurrentUserId, selectUsers]);

const selectCurrentUsersEmail = pipe(selectCurrentUser, propOr("", "email"));

const selectUserById = (id) => pipe(selectUsers, prop(id));

const selectIsLoggedIn = pipe(selectCurrentUserId, Boolean);

// console.log(
//   selectUserById(123)({
//     userProfile: {
//       currentUserId: 123,
//       users: {
//         123: {
//           id: 123,
//           email: "ibuolatobi@gmail.com",
//         },
//       },
//     },
//   })
// );
console.log(
  selectIsLoggedIn({
    userProfile: {
      currentUserId: 123,
      users: {
        123: {
          id: 123,
          email: "ibuolatobi@gmail.com",
        },
      },
    },
  })
);
