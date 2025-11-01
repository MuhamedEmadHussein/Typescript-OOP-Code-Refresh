# 🧠 TypeScript OOP & Generics Example

This project demonstrates **TypeScript fundamentals and advanced OOP concepts**, including **classes**, **interfaces**, **enums**, **inheritance**, **generics**, and **type inference** — all in one practical example.

---

## 📚 Features & Concepts Covered

| Concept | Description |
|----------|--------------|
| **Enums** | Define named constants for roles such as `Admin`, `User`, and `Guest`. |
| **Interfaces** | Define object structures and enforce strong typing (e.g. `IUser`, `Address`). |
| **Classes** | Create reusable blueprints for objects with properties and methods. |
| **Inheritance** | `User` extends `Person` to reuse and extend logic. |
| **Implements** | `User` implements `IUser` to ensure compliance with the interface. |
| **Parameter Properties** | Declare and assign properties directly in constructor parameters (`User2`). |
| **Generics** | Create reusable, type-safe components like `ApiResponse<T>` and generic functions. |
| **Type Inference** | TypeScript automatically infers variable types based on context. |
| **Objects** | Demonstrates creating and using strongly typed objects. |

---

## 🗂️ File Structure

```
src/
 ├── index.ts         # Main TypeScript file with all examples
 ├── README.md        # Documentation file
 ├── tsconfig.json    # TypeScript configuration (optional)
```

---

## 🚀 Usage

1. **Clone this repository**
   ```bash
   git clone https://github.com/your-username/typescript-oop-example.git
   cd typescript-oop-example
   ```

2. **Install TypeScript**
   ```bash
   npm install -g typescript
   ```

3. **Run the project**
   ```bash
   tsc src/index.ts
   node src/index.js
   ```

---

## 🧩 Example Overview

### 🟩 Enums
```ts
enum UserRole {
  ADMIN = "Admin",
  USER = "User",
  GUEST = "Guest",
}
```

---

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

---

### 🟨 Base Class – Person
```ts
class Person {
  constructor(public name: string, public email: string) {}

  displayInfo(): void {
    console.log(`Name: ${this.name}, Email: ${this.email}`);
  }
}
```

---

### 🟧 Inheritance – User & User2
```ts
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
```

---

### 🟪 Generic Class Example
```ts
class ApiResponse<T> {
  constructor(public data: T, public status: number, public message: string) {}

  printResponse(): void {
    console.log(`Status: ${this.status}, Message: ${this.message}`);
    console.log("Data:", this.data);
  }
}
```

---

### 🧠 Type Inference Example
```ts
let count = 10; // inferred as number
count += 5;
console.log("Count:", count);
```

---

### 🧩 Generic Function Example
```ts
function identity<T>(value: T): T {
  return value;
}

const numberIdentity = identity<number | string>(42);
const stringIdentity = identity<number | string>("Hello TypeScript!");

console.log(numberIdentity, stringIdentity);
```

---

## 🧰 Example Output

```
User: ID: 1, Name: John Doe, Email: john.doe@example.com, Role: Admin
Name: John Doe, Email: john.doe@example.com
Role: Admin
Address: 123 Main St, Anytown, CA - 12345
Status: 200, Message: User fetched successfully
Data: { id: 1, name: 'John Doe', ... }
Count: 15
42 Hello TypeScript!
```

---

## 🧾 License
This project is licensed under the **MIT License** — feel free to use and modify it.
