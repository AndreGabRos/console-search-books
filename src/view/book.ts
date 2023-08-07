import { getBookById, getManyBooksById } from "../controller/books";
import { listConsole } from "../utils/readConsole";

export async function bookMenu(bookId: string, options?: Array<string>) {
  const book = await getBookById(bookId)

  let choices: string[] = [bookId, book.volumeInfo.title, book.volumeInfo.authors]
  options?.flatMap((item) => { choices.push(item) })

  const choice = await listConsole("LIVRO", choices, 15)

  return choice.choice
}
