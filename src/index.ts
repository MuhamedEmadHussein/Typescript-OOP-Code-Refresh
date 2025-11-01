// -------------------- Enums --------------------
enum UserRole {
  ADMIN = "Admin",
  USER = "User",
  GUEST = "Guest",
}

// -------------------- Interfaces --------------------
interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  phone?: string; // optional property
  address: Address;
  role: UserRole;
  getData(): string;
}

// -------------------- Generic Class --------------------
class ApiResponse<T> {
  constructor(public data: T, public status: number, public message: string) {}

  printResponse(): void {
    console.log(`Status: ${this.status}, Message: ${this.message}`);
    console.log("Data:", this.data);
  }
}

// -------------------- Base Class --------------------
class Person {
  constructor(public name: string, public email: string) {}

  displayInfo(): void {
    console.log(`Name: ${this.name}, Email: ${this.email}`);
  }
}

// -------------------- Inheritance --------------------
class User extends Person implements IUser {
  id: number;
  phone?: string;
  address: Address;
  role: UserRole;

  constructor(
    id: number,
    name: string,
    email: string,
    address: Address,
    role: UserRole,
    phone?: string
  ) {
    super(name, email);
    this.id = id;
    this.address = address;
    this.role = role;
    this.phone = phone;
  }

  getData(): string {
    return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Role: ${this.role}`;
  }

  // -------------------- Method --------------------
  getFullAddress(): string {
    const { street, city, state, zip } = this.address;
    return `${street}, ${city}, ${state} - ${zip}`;
  }

  displayUser(): void {
    console.log(`ID: ${this.id}`);
    this.displayInfo();
    console.log(`Role: ${this.role}`);
    console.log(`Address: ${this.getFullAddress()}`);
  }
}

// -------------------- Inheritance (Parameter Properties) --------------------
class User2 extends Person implements IUser {
  constructor(
    public id: number,
    name: string,
    email: string,
    public address: Address,
    public role: UserRole,
    public phone?: string
  ) {
    super(name, email);
  }

  getData(): string {
    return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Role: ${this.role}`;
  }

  getFullAddress(): string {
    const { street, city, state, zip } = this.address;
    return `${street}, ${city}, ${state} - ${zip}`;
  }

  displayUser(): void {
    console.log(`ID: ${this.id}`);
    this.displayInfo();
    console.log(`Role: ${this.role}`);
    console.log(`Address: ${this.getFullAddress()}`);
  }
}

// -------------------- Objects --------------------
const user1 = new User(
  1,
  "John Doe",
  "john.doe@example.com",
  {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  },
  UserRole.ADMIN,
  "+1234567890"
);

console.log("User " + user1.getData());

const a: Address = {
  street: "123 Main St",
  city: "Town",
  state: "CA",
  zip: "12345",
};

const user2 = new User2(1, "John", "john@example.com", a, UserRole.ADMIN, "+123");
console.log("User 2 " + user2.getData());

// -------------------- Generics Example --------------------
const userResponse = new ApiResponse<User>(user1, 200, "User fetched successfully");

// -------------------- Execution --------------------
user1.displayUser();
userResponse.printResponse();

// -------------------- Type Inference Example --------------------
let count = 10; // inferred as number
count += 5;
console.log("Count:", count);

// -------------------- Generic Function --------------------
function identity<T>(value: T): T {
  return value;
}

const numberIdentity = identity<number | string>(42);
const stringIdentity = identity<number | string>("Hello TypeScript!");
console.log(numberIdentity, stringIdentity);

// ====================================================================
// 🧱 ENCAPSULATION, GETTER/SETTER, and STATIC EXAMPLE
// ====================================================================

// -------------------- BankAccount Class (Encapsulation + Static) --------------------
class BankAccount {
  private _balance: number;
  private static _bankName: string = "TypeScript National Bank";

  constructor(initialBalance: number) {
    this._balance = initialBalance;
  }

  // Getter
  get balance(): number {
    return this._balance;
  }

  // Setter
  set balance(amount: number) {
    if (amount < 0) throw new Error("Balance cannot be negative!");
    this._balance = amount;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Deposit must be positive!");
    this._balance += amount;
  }

  withdraw(amount: number): void {
    if (amount > this._balance) throw new Error("Insufficient funds!");
    this._balance -= amount;
  }

  printStatement(): void {
    console.log(`🏦 ${BankAccount._bankName} | Current Balance: $${this._balance}`);
  }

  // Static method
  static getBankName(): string {
    return BankAccount._bankName;
  }
}

// -------------------- Encapsulated User Example --------------------
class SecureUser extends Person implements IUser {
  private _id: number;
  private _role: UserRole;
  private _address: Address;
  private _phone?: string;

  constructor(
    id: number,
    name: string,
    email: string,
    address: Address,
    role: UserRole,
    phone?: string
  ) {
    super(name, email);
    this._id = id;
    this._address = address;
    this._role = role;
    this._phone = phone;
  }

  // Getters and Setters for Encapsulation
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    if (value <= 0) throw new Error("ID must be positive!");
    this._id = value;
  }

  get role(): UserRole {
    return this._role;
  }
  set role(value: UserRole) {
    this._role = value;
  }

  get address(): Address {
    return this._address;
  }
  set address(value: Address) {
    this._address = value;
  }

  get phone(): string | undefined {
    return this._phone;
  }
  set phone(value: string | undefined) {
    if (value && !value.startsWith("+")) {
      throw new Error("Phone number must start with +");
    }
    this._phone = value;
  }

  getData(): string {
    return `Secure User [${this._id}] - ${this.name} (${this._role})`;
  }

  displayUser(): void {
    console.log(this.getData());
    console.log(`📧 ${this.email}`);
    console.log(`🏠 ${this.address.city}, ${this.address.state}`);
  }
}

// -------------------- Run Encapsulation Example --------------------
console.log("\n================= ENCAPSULATION & STATIC EXAMPLES =================");
const secureUser = new SecureUser(
  101,
  "Alice",
  "alice@example.com",
  { street: "7th Ave", city: "New York", state: "NY", zip: "10001" },
  UserRole.USER,
  "+201098765432"
);

secureUser.displayUser();
secureUser.id = 202; // uses setter
console.log("Updated ID:", secureUser.id);

const account = new BankAccount(500);
account.deposit(200);
account.withdraw(100);
account.printStatement();
console.log("Current Balance:", account.balance);
console.log("Bank Name:", BankAccount.getBankName());


// ====================================================================
// 🧱 POLYMORPHISM and ABSTRACTION EXAMPLES
// ====================================================================

// -------------------- Abstraction Example --------------------
// Abstract class defines a contract that derived classes must follow
abstract class Shape {
  abstract area(): number;
  abstract perimeter(): number;

  describe(): void {
    console.log(`This is a ${this.constructor.name}.`);
  }
}

// Concrete subclass 1
class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

// Concrete subclass 2
class Rectangle extends Shape {
  constructor(public width: number, public height: number) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// -------------------- Polymorphism Example --------------------
// Both Circle and Rectangle are treated as Shape (common interface)
function printShapeInfo(shape: Shape): void {
  shape.describe();
  console.log(`Area: ${shape.area().toFixed(2)}`);
  console.log(`Perimeter: ${shape.perimeter().toFixed(2)}\n`);
}

console.log("\n================= ABSTRACTION & POLYMORPHISM EXAMPLES =================");

const shapes: Shape[] = [
  new Circle(5),
  new Rectangle(4, 6),
];

for (const s of shapes) {
  printShapeInfo(s); // <-- polymorphism in action (different implementations)
}

// -------------------- More Polymorphism: Using Interfaces --------------------
// Shared interface for polymorphic behavior
interface PaymentMethod {
  pay(amount: number): void;
}

class CreditCardPayment implements PaymentMethod {
  constructor(private cardNumber: string) {}

  pay(amount: number): void {
    console.log(`💳 Paid $${amount} using Credit Card [${this.cardNumber.slice(-4)}]`);
  }
}

class PayPalPayment implements PaymentMethod {
  constructor(private email: string) {}

  pay(amount: number): void {
    console.log(`🅿️ Paid $${amount} via PayPal (${this.email})`);
  }
}

console.log("\n================= INTERFACE-BASED POLYMORPHISM =================");

function processPayment(payment: PaymentMethod, amount: number): void {
  payment.pay(amount); // same method call, different behavior (polymorphism)
}

const creditCard = new CreditCardPayment("1234-5678-9012-3456");
const paypal = new PayPalPayment("user@example.com");

processPayment(creditCard, 150);
processPayment(paypal, 89.99);
