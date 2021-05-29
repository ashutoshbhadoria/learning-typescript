/**
 * INTERSECTION TYPES
 */

// These could be `type` as well instead of `interface`
interface Employee {
  name: string;
  startDate: Date;
}

interface Admin {
  name: string;
  privileges: string[];
}

// interface ElevatedEmployee extends Employee, Admin {}

// Instead of using the above `interface` inheritance we can use intersection types.
type ElevatedEmployee = Employee & Admin;

// Should contain all 3 properties.
const ashutosh: ElevatedEmployee = {
  name: 'Ashutosh',
  privileges: ['drop-tables', 'change-schema'],
  startDate: new Date(),
};

console.log(ashutosh);

// For `union` types, the `intersection` results in selecting the common type.
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; // `Universal` will be of type number.

// --------------------------------------------------------
/**
 * TYPE GUARDS
 */

// Type Guards enable us to use the flexibility of union Types with type safety.

// `typeof` operator safety guard for vanilla JavaScript types.
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

console.log(add('1', '2')); // '12'
console.log(add(1, '2')); // '12'
console.log(add(1, 2)); // 3

// `in` TypeScript keyword safety guard for interfaces / types.
type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('EMPLOYEE DETAILS:');
  console.log(`Name: ${emp.name}`);

  if ('startDate' in emp) {
    console.log(`Start Date: ${emp.startDate}`);
  }

  if ('privileges' in emp) {
    console.log(`Privileges: ${emp.privileges}`);
  }
}

printEmployeeInformation(ashutosh);
printEmployeeInformation({ name: 'Aditya', privileges: ['restart-server'] });
printEmployeeInformation({ name: 'Randy', startDate: new Date() });

// `instanceof` operator safety guard for class instances.
class Car {
  drive() {
    console.log('vroom');
  }
}

class Truck {
  drive() {
    console.log('VROOM');
  }

  loadCargo(weight: number) {
    console.log(`Loading cardo : ${weight} kg(s)`);
  }
}

type Vehicle = Car | Truck;

function operateVehicle(vehichle: Vehicle) {
  console.log('Operating vehicle...');

  vehichle.drive();

  if (vehichle instanceof Truck) {
    vehichle.loadCargo(420);
  }
}

const shelbyGT = new Car();
const fordRaptor = new Truck();

operateVehicle(shelbyGT);
operateVehicle(fordRaptor);

// --------------------------------------------------------
/**
 * DISCRIMINATED UNION TYPES.
 */

// Discriminated Union Types make it easier to implement type guards for objects.

interface Animal {
  type: 'animal';
  runningSpeed: number;
}

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

type Fauna = Animal | Bird;

function moveFauna(fauna: Fauna) {
  let speed: number;

  switch (fauna.type) {
    case 'animal':
      speed = fauna.runningSpeed;
      break;
    case 'bird':
      speed = fauna.flyingSpeed;
      break;
  }

  console.log(`The speed of the fauna is ${speed}`);
}

const horse: Animal = {
  type: 'animal',
  runningSpeed: 20,
};

const sparrow: Bird = {
  type: 'bird',
  flyingSpeed: 10,
};

moveFauna(horse);
moveFauna(sparrow);

// --------------------------------------------------------
/**
 * TYPE CASTING.
 */

// Used to explicity define a specific type when TypeScript cannot figure out.

// const inputElement = document.querySelector('input'); // Correctly inferred as `HTMLInputElement | null`
// const inputElement = document.getElementById('name'); // Inferred as generic `HTMLElement | null`
// const inputElement = document.getElementById('name')!; // To specify that the value won't be `null`.
// const inputElement = <HTMLInputElement>document.getElementById('name')!; // Type cast to `HTMLInputElement`.
const inputElement = document.getElementById('name')! as HTMLInputElement; // Alternate syntax.

inputElement.value = 'Ashutosh';

// --------------------------------------------------------
/**
 * INDEX PROPERTIES.
 */

// Used when we don't know how many properties and what properties will an object have.

// E.g. Object could contain any number of errors
// {email: 'Not a valid email', firstName: 'First name cannot contain numerals'};
interface ErrorContainer {
  // id: string; // The value of any property along with index property, must be same as index property value.
  [key: string]: string; // key can only be `string` or `number`.
}

const errrorBag: ErrorContainer = {
  email: 'Invalid email-id',
  phone: 'Must be 10 characters long',
};

console.log(errrorBag);

// --------------------------------------------------------
/**
 * FUNCTION OVERLOADING.
 */

// Useful in scenarios with uion types when TypeScript cannot infer the correct type.

function addCombinable(a: string, b: string): string;
function addCombinable(a: number, b: string): string;
function addCombinable(a: string, b: number): string;
function addCombinable(a: number, b: number): number;
// addding overloads above
function addCombinable(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = addCombinable('Ashutosh', ' Bhadoria'); // before adding the overloads `result` type is `Combinable`.
// const result = addCombinable('Ashutosh', ' Bhadoria') as string; // can use type-casting to solve the issue.
const [first, last] = result.split(' '); // `split` will be avaialble only when `result` is string.
console.log(first, last);

// --------------------------------------------------------
/**
 * OPTIONAL CHAINING.
 */

// Do null safe operations when we do not if a property exists or not.

// Deliberately set to `any` to simulate weakly typed fetched data.
// object may or may not have `job` property.
const fetchedUserData: any = {
  id: 'u1',
  name: 'Ashutosh',
  // job: {
  //   title: 'Captain',
  //   description: 'Sail ship, drink rum',
  // },
};

console.log(fetchedUserData.job?.title); // Optional chaining supported for TS v>= 3/7

// --------------------------------------------------------
/**
 * NULLISH COALESCING.
 */

const fetchedValue = null;
// const storedValue = fetchedValue || 'DEFAULT'; // has corner cases like `''` or `0`.
const storedValue = fetchedValue ?? 'DEFAULT';
console.log(storedValue);
