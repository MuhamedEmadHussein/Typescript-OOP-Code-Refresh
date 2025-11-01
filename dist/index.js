"use strict";
// -------------------- Enums --------------------
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "Admin";
    UserRole["USER"] = "User";
    UserRole["GUEST"] = "Guest";
})(UserRole || (UserRole = {}));
// -------------------- Generic Class --------------------
class ApiResponse {
    constructor(data, status, message) {
        this.data = data;
        this.status = status;
        this.message = message;
    }
    printResponse() {
        console.log(`Status: ${this.status}, Message: ${this.message}`);
        console.log("Data:", this.data);
    }
}
// -------------------- Base Class --------------------
class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    displayInfo() {
        console.log(`Name: ${this.name}, Email: ${this.email}`);
    }
}
// -------------------- Inheritance --------------------
class User extends Person {
    constructor(id, name, email, address, role, phone) {
        super(name, email);
        this.id = id;
        this.address = address;
        this.role = role;
        this.phone = phone;
    }
    getData() {
        return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Role: ${this.role}`;
    }
    // -------------------- Method --------------------
    getFullAddress() {
        const { street, city, state, zip } = this.address;
        return `${street}, ${city}, ${state} - ${zip}`;
    }
    displayUser() {
        console.log(`ID: ${this.id}`);
        this.displayInfo();
        console.log(`Role: ${this.role}`);
        console.log(`Address: ${this.getFullAddress()}`);
    }
}
// -------------------- Inheritance (Parameter Properties) --------------------
class User2 extends Person {
    constructor(id, name, email, address, role, phone) {
        super(name, email);
        this.id = id;
        this.address = address;
        this.role = role;
        this.phone = phone;
    }
    getData() {
        return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Role: ${this.role}`;
    }
    getFullAddress() {
        const { street, city, state, zip } = this.address;
        return `${street}, ${city}, ${state} - ${zip}`;
    }
    displayUser() {
        console.log(`ID: ${this.id}`);
        this.displayInfo();
        console.log(`Role: ${this.role}`);
        console.log(`Address: ${this.getFullAddress()}`);
    }
}
// -------------------- Objects --------------------
const user1 = new User(1, "John Doe", "john.doe@example.com", {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
}, UserRole.ADMIN, "+1234567890");
console.log("User " + user1.getData());
const a = {
    street: "123 Main St",
    city: "Town",
    state: "CA",
    zip: "12345",
};
const user2 = new User2(1, "John", "john@example.com", a, UserRole.ADMIN, "+123");
console.log("User 2 " + user2.getData());
// -------------------- Generics Example --------------------
const userResponse = new ApiResponse(user1, 200, "User fetched successfully");
// -------------------- Execution --------------------
user1.displayUser();
userResponse.printResponse();
// -------------------- Type Inference Example --------------------
let count = 10; // inferred as number
count += 5;
console.log("Count:", count);
// -------------------- Generic Function --------------------
function identity(value) {
    return value;
}
const numberIdentity = identity(42);
const stringIdentity = identity("Hello TypeScript!");
console.log(numberIdentity, stringIdentity);
// ====================================================================
// 🧱 ENCAPSULATION, GETTER/SETTER, and STATIC EXAMPLE
// ====================================================================
// -------------------- BankAccount Class (Encapsulation + Static) --------------------
class BankAccount {
    constructor(initialBalance) {
        this._balance = initialBalance;
    }
    // Getter
    get balance() {
        return this._balance;
    }
    // Setter
    set balance(amount) {
        if (amount < 0)
            throw new Error("Balance cannot be negative!");
        this._balance = amount;
    }
    deposit(amount) {
        if (amount <= 0)
            throw new Error("Deposit must be positive!");
        this._balance += amount;
    }
    withdraw(amount) {
        if (amount > this._balance)
            throw new Error("Insufficient funds!");
        this._balance -= amount;
    }
    printStatement() {
        console.log(`🏦 ${BankAccount._bankName} | Current Balance: $${this._balance}`);
    }
    // Static method
    static getBankName() {
        return BankAccount._bankName;
    }
}
BankAccount._bankName = "TypeScript National Bank";
// -------------------- Encapsulated User Example --------------------
class SecureUser extends Person {
    constructor(id, name, email, address, role, phone) {
        super(name, email);
        this._id = id;
        this._address = address;
        this._role = role;
        this._phone = phone;
    }
    // Getters and Setters for Encapsulation
    get id() {
        return this._id;
    }
    set id(value) {
        if (value <= 0)
            throw new Error("ID must be positive!");
        this._id = value;
    }
    get role() {
        return this._role;
    }
    set role(value) {
        this._role = value;
    }
    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;
    }
    get phone() {
        return this._phone;
    }
    set phone(value) {
        if (value && !value.startsWith("+")) {
            throw new Error("Phone number must start with +");
        }
        this._phone = value;
    }
    getData() {
        return `Secure User [${this._id}] - ${this.name} (${this._role})`;
    }
    displayUser() {
        console.log(this.getData());
        console.log(`📧 ${this.email}`);
        console.log(`🏠 ${this.address.city}, ${this.address.state}`);
    }
}
// -------------------- Run Encapsulation Example --------------------
console.log("\n================= ENCAPSULATION & STATIC EXAMPLES =================");
const secureUser = new SecureUser(101, "Alice", "alice@example.com", { street: "7th Ave", city: "New York", state: "NY", zip: "10001" }, UserRole.USER, "+201098765432");
secureUser.displayUser();
secureUser.id = 202; // uses setter
console.log("Updated ID:", secureUser.id);
const account = new BankAccount(500);
account.deposit(200);
account.withdraw(100);
account.printStatement();
console.log("Current Balance:", account.balance);
console.log("Bank Name:", BankAccount.getBankName());
