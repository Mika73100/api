import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

////////////////////CREATION DES ROUTES RESERVATIONS////////////////////

export const prisma = new PrismaClient();

////////////// GET //////////////

export async function GET(request: Request) {
  try {
    const reservations = await prisma.reservation.findMany();
    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'failed to fetch reservations' }, { status: 500 });
  }
}

////////////// POST //////////////

export async function POST(request: Request) {
  try {
    const { clientId, eventId, status } = await request.json();

    // Vérifier que l'ID du client est fourni.
    if (!clientId || typeof clientId !== 'number') {
      return NextResponse.json({ error: 'Client ID is required and must be a number' }, { status: 400 });
    }

    // Vérifier que l'ID de l'événement est fourni.
    if (!eventId || typeof eventId !== 'number') {
      return NextResponse.json({ error: 'Event ID is required and must be a number' }, { status: 400 });
    }

    // Vérifier que le statut est fourni.
    if (!status || typeof status !== 'string') {
      return NextResponse.json({ error: 'Status is required and must be a string' }, { status: 400 });
    }

    // Création d'une nouvelle réservation avec Prisma.
    const newReservation = await prisma.reservation.create({
      data: { clientId, eventId, status } // Utiliser les données fournies
    });

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "failed to create reservation" }, { status: 500 });
  }
}

////////////// PATCH //////////////

export async function PATCH(request: Request) {
  try {
    const { id, ...data } = await request.json();
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'ID is required and must be a number' }, { status: 400 });
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedReservation, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update reservation" }, { status: 500 });
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
    const deletedReservation = await prisma.reservation.delete({
      where: { id }
    });

    return NextResponse.json(deletedReservation, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete reservation' }, { status: 500 });
  }
}