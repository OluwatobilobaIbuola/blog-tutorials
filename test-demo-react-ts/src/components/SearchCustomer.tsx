import React, { useState } from "react";
import { useSearchCustomersHook } from "../Hooks/useSearchCustomersHook";
import { ReactNode } from "react";

export function SearchCustomer() {
  const [customers] = useState([
    { name: "mike", age: 23 },
    { name: "john", age: 24 },
    { name: "john", age: 35 },
    { name: "peter", age: 25 },
  ]);

  const { searchedCustomers, searchterm, setSearchterm } =
    useSearchCustomersHook(customers);

  return (
    <>
      <div className="layout-row align-items-center justify-content-center mt-30">
        <input
          className="large mx-20 w-20"
          data-testid="search-input"
          value={searchterm}
          placeholder="Enter search term (Eg: Phil)"
          onChange={(e) => setSearchterm(e.target.value)}
        />
      </div>
      {searchterm ? (
        <CustomerList customers={searchedCustomers} />
      ) : (
        <CustomerList customers={customers} />
      )}
    </>
  );
}

function CustomerList({ customers }: { customers: any[] }) {
  return (
    <div className="layout-column align-items-center justify-content-start">
      <div className="card w-40 pt-30 pb-8 mt-20">
        <table>
          <thead>
            <tr>
              <th className="">Name</th>
              <th className="">Age</th>
              <th>Location</th>
              <th>Gender</th>
              <th>Income</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers?.map((customer, i) => {
                return (
                  <tr
                    key={customer?.name + i}
                    className=""
                    data-testid="searched-customers"
                  >
                    <td className="">{customer?.name}</td>
                    <td className="">{customer?.age}</td>
                    <td className="">{customer?.location}</td>
                    <td>{customer?.gender}</td>
                    <td>{customer?.income}</td>
                  </tr>
                );
              })
            ) : (
              <p data-testid="no-results">No Results Found!</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
