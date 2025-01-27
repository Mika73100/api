
## Getting Started

Création de l'app : 

npx create-next-app@latest

Entrée partout jusqu'à la création (>.<)

```bash START

Started : npm run dev


# INSTALL PRISMA

1   npm install prisma --save-dev
2   npx prisma init --datasource-provider sqlite

4   ( écrire sa basse de donnée )

3   npx prisma migrate dev --name init

5   npx prisma studio ( permet de voir ça base de donnée )





























Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
















generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
        
model Restaurant {
  id          Int         @id @default(autoincrement())
  name        String
  address     String
  email       String      @unique
  role        String
  password    String
  events      Event[]
  menus       Menu[]
  employees   Employee[]
}

model Employee {
  id          Int         @id @default(autoincrement())
  firstName   String
  lastName    String
  email       String      @unique
  role        String
  password    String
  restaurantId Int
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id])
}

model Client {
  id             Int           @id @default(autoincrement())
  firstName      String
  lastName       String
  email          String        @unique
  role           String
  password       String
  reservations   Reservation[]
}

model Event {
  id            Int           @id @default(autoincrement())
  title         String
  date          DateTime
  description   String?
  restaurantId  Int
  restaurant    Restaurant    @relation(fields: [restaurantId], references: [id])
  reservations  Reservation[]
}

model Reservation {
  id            Int           @id @default(autoincrement())
  clientId      Int
  client        Client        @relation(fields: [clientId], references: [id])
  eventId       Int
  event         Event         @relation(fields: [eventId], references: [id])
  status        String
  createdAt     DateTime      @default(now())
}

model Menu {
  id            Int           @id @default(autoincrement())
  name          String
  description   String?
  price         Float
  restaurantId  Int
  restaurant    Restaurant    @relation(fields: [restaurantId], references: [id])
}
