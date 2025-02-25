import Image from "next/image";
import AuthButton from "@/app/components/AuthButton";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {

  const restaurants = await prisma.restaurant.findMany(); // Récupérer les restaurants

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <AuthButton />
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold">Restaurants</h2>
          <ul className="list-disc list-inside">
            {restaurants ? (
              restaurants.map((restaurant) => (
                <li key={restaurant.id} className="mt-2">
                  {restaurant.name} - {restaurant.email} 
                  <div> {restaurant.address} </div>
                </li>
              ))
            ) : (
              <li>Aucun restaurant trouvé.</li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}