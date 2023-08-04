import { Books, PrismaClient } from "@prisma/client"
import { readConsole } from "../utils/readConsole"

const prisma = new PrismaClient()

export async function verifyLibrary() {
  const library = await prisma.collections.findUnique({
    where: {
      name: "biblioteca"
    }
  })

  if (!library) {
    await prisma.collections.create({
      data: {
        name: "biblioteca"
      }
    })
    console.log("Biblioteca criada.")
  }
}

export async function searchLibraryBookById(id: string) {
  const book = await prisma.books.findUnique({
    where: {
      id
    }
  })

  return book
}

export async function addBookToCollection(book: Books, collectionName: string) {
  console.log(book.id)
  const verifyBook = await searchLibraryBookById(book.id)

  if (verifyBook == null) {
    await prisma.books.create({
      data: {
        id: book.id,
        collection: { 
          connect: {
            name: collectionName
          }
        }
      }
    })
  } else {
    await readConsole("Teste")
    await prisma.books.update({
      where: {
        id: book.id
      },
      data: {
        collection: {
          connect: {
            name: collectionName
          }
        }
      }
    })
  }
}


export async function getCollectionBooks(collectionName: string) {
  const books = await prisma.books.findMany({
    where: {
      collection: {
        some: {
          name: collectionName
        }
      },
    }
  })

  return books
}

export async function removeBookFromCollection(collectionName: string, bookId: string) {
  console.log("Deletado")
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
