import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



////////////////////CREATION DES ROUTES RESTAURANT////////////////////



const prisma = new PrismaClient()



////////////// GET //////////////

export async function GET(request: Request) {

    try {
      const restaurants = await prisma.restaurant.findMany();

      return NextResponse.json(restaurants, { status: 200 });

    } catch (error) {
        
      return NextResponse.json({ error: 'failed to fetch restaurants' }, { status: 500 });
    }
  }



////////////// POST //////////////

export async function POST(request: Request) {

    try {
        const { name, address, email, role, password, events, menus, employees } = await request.json()

        //Vérifier que l'email est une chaine de caractères valide
        if (!email || typeof email !== 'string') {
            return NextResponse.json({ error: 'Email is required and must be a string'}, { status: 400 });
        }

        //Création d'un nouveau restaurant avec Prisma
        const newRestaurant = await prisma.restaurant.create({
            data : { name, address, email, role, password, events, menus, employees }
        })

        return NextResponse.json(newRestaurant, { status: 201 });
    } catch (error) {
        return NextResponse.json({error : 'failed to create restaurant'}, {status:500})
    }
}

