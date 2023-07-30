import { readConsole } from "../utils/readConsole"
import { searchBooksByAuthor, searchBooksByTitle } from "../controller/books"

export async function searchBook() {
  const bookTitle = await readConsole("Nome do livro: ")
  console.log(bookTitle)
  const books = await searchBooksByTitle(bookTitle)
  const booksInfo = books.items.map((data) => ({
    title: data.volumeInfo.title,
    authors: data.volumeInfo.authors,
  }))

  console.log(booksInfo)
  await readConsole("Pressione <enter> para continuar.")
}

export async function searchBooksByAuthorView() {
  const bookAuthor = await readConsole("Nome do autor: ")
  const books = await searchBooksByAuthor(bookAuthor)
  const booksInfo = books.items.map((data) => ({
    title: data.volumeInfo.title,
    author: data.volumeInfo.authors,
  }))

  console.log(booksInfo)
  await readConsole("Pressione <enter> para continuar.")
}
