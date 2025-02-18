import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";



////////////////////CREATION DES ROUTES CLIENTS////////////////////



export const prisma = new PrismaClient()



////////////// GET //////////////

export async function GET(request: Request) {

  try {
    const clients = await prisma.client.findMany();

    return NextResponse.json(clients, { status: 200 });

  } catch (error) {

    return NextResponse.json({ error: 'failed to fetch clients' }, { status: 500 });
  }
}



////////////// POST //////////////


export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    // Vérifier que l'email est une chaîne de caractères valide.
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required and must be a string' }, { status: 400 });
    }

    // Vérifier que le mot de passe est fourni.
    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    // Crypter le mot de passe.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Utiliser "USER" comme rôle par défaut
    const userRole = "USER";

    // Création d'un nouveau client avec Prisma.
    const newClient = await prisma.client.create({
      data: { firstName, lastName, email, role: userRole, password: hashedPassword } // Utiliser le mot de passe crypté
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'failed to create client' }, { status: 500 });
  }
}

////////////// UPDATE //////////////


export async function PATCH(request: Request) {
  try {
    const { id, password, ...data } = await request.json();
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'ID is required and must be a number' }, { status: 400 });
    }

    // Crypter le mot de passe si un nouveau mot de passe est fourni
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de salage
      data.password = hashedPassword; // Remplacer le mot de passe en clair par le mot de passe crypté
    }

    const updatedClient = await prisma.client.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedClient, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to update client" }, { status: 500 });
  }
}


////////////// DELETE //////////////


export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    //Je controle si l'id es bien un nombre.
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'ID is required and must be a number' }, { status: 400 });
    }
    const deletedClient = await prisma.client.delete({
      where: { id }
    });

    return NextResponse.json(deletedClient, { status: 200 });

  } catch (error) {

    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
  }
}