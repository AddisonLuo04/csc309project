// Script to add data to the database
'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const users = [
    {utorid: "clive123", password: "SuperUser123!", name: "clive123", emai: "clive.su@mail.utoronto.ca", verified: true, role: "superuser"},
    {utorid: "johndoe1", password: "Password123!", name: "John Doe", email: "johndoe1@mail.utoronto.ca", verified: false, role: "regular"},
    {utorid: "newuser1", password: "Password123!", name: "Reg User 1", email: "newuser1@mail.utoronto.ca", verified: false, role: "regular"},
    {utorid: "newuser2", password: "Password123!", name: "Reg User 2", email: "newuser2@mail.utoronto.ca", verified: false, role: "regular"},
    {utorid: "newuser3", password: "Password123!", name: "Reg User 3", email: "newuser3@mail.utoronto.ca", verified: false, role: "regular"},
    {utorid: "newuser4", password: "Password123!", name: "Reg User 4", email: "newuser4@mail.utoronto.ca", verified: false, role: "regular"},
    {utorid: "newuser5", password: "Password123!", name: "Reg User 5", email: "newuser5@mail.utoronto.ca", verified: false, role: "regular"},
    {utorid: "newuser6", password: "Password123!", name: "Reg User 6", email: "newuser6@mail.utoronto.ca", verified: false, role: "regular"},
    {utorid: "manuser1", password: "Password123!", name: "Manager 1", email: "manager1@mail.utoronto.ca", verified: false, role: "manager"},
    {utorid: "casuser1", password: "Password123!", name: "Cashier 1", email: "cashier1@mail.utoronto.ca", verified: false, role: "cashier"},
];

// TODO: add transactions
const transactions = [
    {utorid: "johndoe1", type: "purchase", spent: 10.00, amount: 40, createdBy: "clive123"}
];

// TODO: add events and promotions

async function addUsers() {
    const user = await prisma.user.create({data: users[0]});
    console.log(user);
};

async function addTransactions() {
    const transaction = await prisma.transaction.create({data: transactions[0]});
    console.log(transaction);
}

addUsers();
addTransactions();