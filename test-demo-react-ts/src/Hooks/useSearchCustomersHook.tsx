import { useEffect, useState } from "react";

export const useSearchCustomersHook = (customers: any[]) => {
  const [searchterm, setSearchterm] = useState("");
  const [searchedCustomers, setSearchedCustomers] = useState([] as any[]);
  useEffect(() => {
    const newCustomers = customers.filter((item) =>
      item.name.toLowerCase().includes(searchterm)
    );
    setSearchedCustomers(newCustomers);
  }, [searchterm, customers]);
  return { searchterm, searchedCustomers, setSearchterm };
};
