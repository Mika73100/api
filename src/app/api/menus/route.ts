import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


////////////////////CREATION DES ROUTES MENU////////////////////

export const prisma = new PrismaClient();

////////////// GET //////////////

export async function GET(request: Request) {
  try {
    const menus = await prisma.menu.findMany();
    return NextResponse.json(menus, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'failed to fetch menus' }, { status: 500 });
  }
}

////////////// POST //////////////

export async function POST(request: Request) {
  try {
    const { name, description, price, restaurantId } = await request.json();

    // Vérifier que le nom est une chaîne de caractères valide.
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required and must be a string' }, { status: 400 });
    }

    // Vérifier que le prix est fourni et est un nombre.
    if (price == null || typeof price !== 'number') {
      return NextResponse.json({ error: 'Price is required and must be a number' }, { status: 400 });
    }

    // Vérifier que l'ID du restaurant est fourni.
    if (!restaurantId || typeof restaurantId !== 'number') {
      return NextResponse.json({ error: 'Restaurant ID is required and must be a number' }, { status: 400 });
    }

    // Création d'un nouveau menu avec Prisma.
    const newMenu = await prisma.menu.create({
      data: { name, description, price, restaurantId } // Utiliser les données fournies
    });

    return NextResponse.json(newMenu, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "failed to create menu" }, { status: 500 });
  }
}

////////////// PATCH //////////////

export async function PATCH(request: Request) {
  try {
    const { id, ...data } = await request.json();
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'ID is required and must be a number' }, { status: 400 });
    }

    const updatedMenu = await prisma.menu.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedMenu, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update menu" }, { status: 500 });
  }
}

////////////// DELETE //////////////

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    // Je contrôle si l'id est bien un nombre.
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'ID is required and must be a number' }, { status: 400 });
    }
    const deletedMenu = await prisma.menu.delete({
      where: { id }
    });

    return NextResponse.json(deletedMenu, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete menu' }, { status: 500 });
  }
}