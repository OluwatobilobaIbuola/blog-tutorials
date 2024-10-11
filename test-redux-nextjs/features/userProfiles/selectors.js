const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((acc, fn) => fn(acc), x);

const propUtil = (prop) => (obj) => obj[prop];

const selectCurrentUser = (state) => state["users"];

const selectUserById = (id) => pipe(selectCurrentUser, propUtil(id));

const selectCurrentUsersEmail = (id) =>
  pipe(selectUserById(id), propUtil("email"));

console.log(
  selectCurrentUsersEmail("123")({
    currentUserId: 123,
    users: {
      123: {
        id: 123,
        email: "ibuolatobi@gmail.com",
      },
    },
  })
);
