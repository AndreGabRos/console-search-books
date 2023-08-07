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
  const collections = await prisma.collections.findMany({
    where: {
      name: {
        not: "biblioteca"
      }
    }
  })

  return collections
}

export async function addBookToCollection(book: string, collection: string) {
  await prisma.collections.update({
    where: {
      name: collection
    },
    data: {
      books: {
        connect: {
          id: book
        }
      }
    }
  })
}


export async function removeBookFromCollection(bookId: string, collectionName: string) {
  await prisma.collections.update({
    where: {
      name: collectionName
    },
    data: {
      books: {
        disconnect: {
          id: bookId
        }
      }
    }
  })
}

export async function deleteCollectionController(collectionName: string) {
  await prisma.collections.delete({
    where: {
      name: collectionName
    }
  })
}
