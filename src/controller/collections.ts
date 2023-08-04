import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function createNewCollection(name: string) {
  const collection = await prisma.collections.create({
    data: {
      name
    }
  })

  return collection
}

export async function getManyCollections() {
  const collections = await prisma.collections.findMany()

  return collections
}
