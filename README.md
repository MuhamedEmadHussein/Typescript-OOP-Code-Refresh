# 🧠 TypeScript Advanced OOP, Generics & Core Concepts

This project demonstrates **TypeScript fundamentals and advanced OOP principles** — covering **classes**, **inheritance**, **interfaces**, **enums**, **generics**, **encapsulation**, **abstraction**, **polymorphism**, **type inference**, and **static properties/methods** — all within one comprehensive example.

---

## 📘 Concepts Covered

| Concept | Description |
|----------|--------------|
| **Enums** | Define named constants such as roles (`Admin`, `User`, `Guest`). |
| **Interfaces** | Define structures for objects and enforce strict typing (`IUser`, `Address`, `PaymentMethod`). |
| **Classes** | Create reusable blueprints with methods, constructors, and encapsulation. |
| **Inheritance** | Enables a class to extend another (e.g., `User` extends `Person`). |
| **Implements** | Ensures a class follows a defined interface (`User` implements `IUser`). |
| **Generics** | Build reusable, type-safe classes and functions (`ApiResponse<T>`, `identity<T>`). |
| **Encapsulation** | Protect class data using private fields and expose access via getters/setters. |
| **Abstraction** | Define abstract base classes that derived classes must implement (`Shape`). |
| **Polymorphism** | Allow different classes to share the same interface or base class and behave differently (`Circle`, `Rectangle`, `PaymentMethod`). |
| **Static Members** | Shared data and methods at the class level (`BankAccount.getBankName()`). |
| **Type Inference** | TypeScript automatically deduces types where possible. |

---

## 🗂️ File Structure

```
src/
 ├── index.ts         # Main TypeScript file
 ├── README.md        # Documentation file
 ├── tsconfig.json    # TypeScript configuration (optional)
```

---

## 🚀 Setup & Run

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/typescript-advanced-oop.git
   cd typescript-advanced-oop
   ```

2. **Install TypeScript**
   ```bash
   npm install -g typescript
   ```

3. **Compile & Run**
   ```bash
   tsc src/index.ts
   node src/index.js
   ```

---

## 🧩 Code Highlights

### 🟩 Enums
```ts
enum UserRole {
  ADMIN = "Admin",
  USER = "User",
  GUEST = "Guest",
}
```

### 🟦 Interfaces
```ts
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
  phone?: string;
  address: Address;
  role: UserRole;
  getData(): string;
}
```

### 🟨 Classes & Inheritance
```ts
class Person {
  constructor(public name: string, public email: string) {}

  displayInfo(): void {
    console.log(`Name: ${this.name}, Email: ${this.email}`);
  }
}

class User extends Person implements IUser {
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
}
```

### 🟪 Generics
```ts
class ApiResponse<T> {
  constructor(public data: T, public status: number, public message: string) {}

  printResponse(): void {
    console.log(`Status: ${this.status}, Message: ${this.message}`);
    console.log("Data:", this.data);
  }
}
```

### 🧱 Encapsulation & Static Members
```ts
class BankAccount {
  private _balance: number;
  private static _bankName: string = "TypeScript National Bank";

  constructor(initialBalance: number) {
    this._balance = initialBalance;
  }

  get balance(): number {
    return this._balance;
  }

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

  static getBankName(): string {
    return BankAccount._bankName;
  }
}
```

### 🧱 Abstraction & Polymorphism
```ts
abstract class Shape {
  abstract area(): number;
  abstract perimeter(): number;

  describe(): void {
    console.log(`This is a ${this.constructor.name}.`);
  }
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }
  area(): number { return Math.PI * this.radius ** 2; }
  perimeter(): number { return 2 * Math.PI * this.radius; }
}

class Rectangle extends Shape {
  constructor(public width: number, public height: number) {
    super();
  }
  area(): number { return this.width * this.height; }
  perimeter(): number { return 2 * (this.width + this.height); }
}

function printShapeInfo(shape: Shape): void {
  shape.describe();
  console.log(`Area: ${shape.area().toFixed(2)}`);
  console.log(`Perimeter: ${shape.perimeter().toFixed(2)}\n`);
}
```

### 🧩 Interface-Based Polymorphism
```ts
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

function processPayment(payment: PaymentMethod, amount: number): void {
  payment.pay(amount);
}
```

---

## 🧠 Example Output

```
User: ID: 1, Name: John Doe, Email: john.doe@example.com, Role: Admin
🏦 TypeScript National Bank | Current Balance: $600
This is a Circle.
Area: 78.54
Perimeter: 31.42
💳 Paid $150 using Credit Card [3456]
🅿️ Paid $89.99 via PayPal (user@example.com)
```

---

## 🧾 License
This project is licensed under the **MIT License**.  
Feel free to use, modify, and share.
