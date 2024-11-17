import { UserTest } from "../../typing/types";

export const UserInfo = ({ element }: { element?: number }) => {
  console.log(element);
  // const { name, age, country, books } = user || {};
  return true ? (
    <div>
      <p className="text-[32px]">{element}</p>
      {/* <h2>{name}</h2>
      <p>Age: {age} years</p>
      <p>Country: {country}</p>
      <h2>Books</h2>
      <ul className="list">{books && books.map((book) => <li key={book}> {book} </li>)}</ul> */}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};
