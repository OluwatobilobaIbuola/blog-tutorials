import React from "react";

type EmployeeProp = {
  name: string;
};

export default function ClassExample() {
  class Person {
    protected name: string;
    id: number;
    constructor(name: string, id: number) {
      this.name = name;
      this.id = id;
    }
    protected getName() {
      console.log(this.name);
    }
  }

  class Employee extends Person {
    salary: number;
    constructor(name: string, id: number, salary: number) {
      super(name, id);
      this.salary = salary;
    }
    protected sayHello() {
      // console.log(this.name);
    }
    displayName() {
      this.getName();
    }
  }

  const persnOne = new Person("John", 1);
  const persnTwo = new Person("James", 2);
  const empOne = new Employee("James", 2, 10000);

  type User = string;
  let name: User = "Tobiloba";

  // console.log(persnOne.name); // Error name is protected
  // console.log(empOne.name); // Error name is private
  // empOne.sayHello();
  // persnOne.getName();
  // empOne.getName();

  return <div></div>;
}
