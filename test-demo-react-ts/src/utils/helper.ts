// import { DeepPartial, User, Me } from "../types";
// const find = <T, U>(users: Array<U>, credentials: DeepPartial<T>) => {
//   const found = users.reduce((acc, key) => {
//     if (credentials[key]) {
//       acc[key] = credentials[key];
//     }
//     return acc;
//   });
//   return found;
// };

export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password1",
    phone: "+1-555-123-4567",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      country: "USA",
    },
  },

  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    password: "password2",
    phone: "+1-555-987-6543",
    address: {
      street: "456 Elm St",
      city: "Otherville",
      state: "NY",
      country: "USA",
    },
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bobjohnson@example.com",
    password: "password3",
    phone: "+44-20-1234-5678",
    address: {
      street: "789 High St",
      city: "London",
      state: "",
      country: "UK",
    },
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alicebrown@example.com",
    password: "password4",
    phone: "+61-2-1234-5678",
    address: {
      street: "1 Queen St",
      city: "Sydney",
      state: "NSW",
      country: "Australia",
    },
  },

  {
    id: 5,
    name: "David Lee",
    email: "davidlee@example.com",
    password: "password5",
    phone: "+81-3-1234-5678",
    address: {
      street: "10-1 Shibuya",
      city: "Tokyo",
      state: "",
      country: "Japan",
    },
  },
  {
    id: 6,
    name: "Emily Chen",
    email: "emilychen@example.com",
    password: "password6",
    phone: "+86-10-1234-5678",
    address: {
      street: "100 Pudong Rd",
      city: "Shanghai",
      state: "",
      country: "China",
    },
  },

  {
    id: 7,
    name: "Juan Garcia",
    email: "juangarcia@example.com",
    password: "password7",
    phone: "+52-55-1234-5678",
    address: {
      street: "123 Reforma Ave",
      city: "Mexico City",
      state: "CDMX",
      country: "Mexico",
    },
  },
  {
    id: 8,
    name: "Sophie Dupont",
    email: "sophiedupont@example.com",
    password: "password8",
    phone: "+33-1-1234-5678",
    address: {
      street: "2 Champs-Elysees",
      city: "Paris",
      state: "",
      country: "France",
    },
  },

  {
    id: 9,
    name: "Mohammed Khan",
    email: "mohammedkhan@example.com",
    password: "password9",
    phone: "+91-22-1234-5678",
    address: {
      street: "2 Champs-Elysees",
      city: "Paris",
      state: "",
      country: "Nigeria",
    },
  },
];

// const usersByCity = find(users, { address: { city: "New York" } });
