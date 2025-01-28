import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

////////////////////CREATION DES ROUTES EVENT////////////////////

export const prisma = new PrismaClient();

////////////// GET //////////////

export async function GET(request: Request) {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'failed to fetch events' }, { status: 500 });
  }
}

////////////// POST //////////////

export async function POST(request: Request) {
  try {
    const { title, date, description, restaurantId } = await request.json();

    // Vérifier que le titre est une chaîne de caractères valide.
    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Title is required and must be a string' }, { status: 400 });
    }

    // Vérifier que la date est fournie et est une date valide.
    if (!date || isNaN(new Date(date).getTime())) {
      return NextResponse.json({ error: 'Date is required and must be a valid date' }, { status: 400 });
    }

    // Vérifier que l'ID du restaurant est fourni.
    if (!restaurantId || typeof restaurantId !== 'number') {
      return NextResponse.json({ error: 'Restaurant ID is required and must be a number' }, { status: 400 });
    }

    // Création d'un nouvel événement avec Prisma.
    const newEvent = await prisma.event.create({
      data: { title, date: new Date(date), description, restaurantId } // Utiliser les données fournies
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "failed to create event" }, { status: 500 });
  }
}

////////////// PATCH //////////////

export async function PATCH(request: Request) {
  try {
    const { id, ...data } = await request.json();
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'ID is required and must be a number' }, { status: 400 });
    }

    // Vérifier si la date est fournie et est une date valide.
    if (data.date && isNaN(new Date(data.date).getTime())) {
      return NextResponse.json({ error: 'Date must be a valid date' }, { status: 400 });
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
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
    const deletedEvent = await prisma.event.delete({
      where: { id }
    });

    return NextResponse.json(deletedEvent, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}