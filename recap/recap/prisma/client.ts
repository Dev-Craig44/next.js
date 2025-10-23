// 1.) Import the PrismaClient class from the @prisma/client package
import { PrismaClient } from "@prisma/client";

// 2.) Create an instance of the PrismaClient
const prisma = new PrismaClient();

// 3.) Export the prisma instance for use in other parts of the application
export default prisma;

// Technically we can create this prisma client anywhere in our app, but as a best practice we should make sure that there is only one single instance of this running in our app. So reason we're doing this in this file is because the first time this client file is imported somewhere in our app, we can get a new instance of this Prisma Client, but the second time this file is imported, this code is not reexecuted again, it's cached, so the result will be reused.

// Fast Refresh is a feature in Next.js that allows you to see changes in your React components without losing their state. However, if we create a new instance of PrismaClient every time a file is reloaded during development, it can lead to multiple instances being created, which can cause issues with database connections.

//  To fix this we'll search `prisma nextjs prismaclient` and follow the first link that comes up which is the official Prisma documentation for using Prisma with Next.js. In this documentation, we can find a recommended approach to ensure that only one instance of PrismaClient is created during development with Fast Refresh enabled.
