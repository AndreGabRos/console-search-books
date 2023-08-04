import { clear } from "console"
import { getCollectionBooks, removeBookFromCollection, verifyLibrary } from "../controller/biblioteca"
import { getManyBooksById } from "../controller/books"
import { listConsole, readConsole } from "../utils/readConsole"


// MENU PRINCIPAL DA BIBLIOTECA
export async function viewLibrary() {
  let nestaTela = true
  while (nestaTela == true) {
    clear()
    verifyLibrary()

    const choices = ["Ver livros", "Deletar Livro da Biblioteca", "Voltar ao Menu Principal"]

    const choice = await listConsole("BIBLIOTECA", choices, 15)

    const books = await getCollectionBooks("biblioteca")

    let booksId: string[] = []
    for (let i = 0; i < books.length; i++) {
      booksId.push(books[i].id)
    }

    if(choices.indexOf(choice.choice) == 0) {
      await listBooks(booksId)
    } else if(choices.indexOf(choice.choice) == 1) {
      await deleteBookInLibrary(booksId)
    } else if(choices.indexOf(choice.choice) == 2) {
      nestaTela = false
    }
  }
}


// TELA DE LISTAGEM DO LIVROS
export async function listBooks(booksId: Array<string>) {
  const books = await getManyBooksById(booksId)
  let  booksTitles: string[] = []
  for(let i = 0; i < books.length; i++) {
    booksTitles.push(books[i].volumeInfo.title)
  }


  let pagina = 1
  let nestaTela = true
  while (nestaTela == true) {
    let startIndex = Math.pow(10, pagina-1) - 1
    let lastIndex = Math.pow(10, pagina) - 1
    let show = booksTitles.slice(startIndex, lastIndex)

    if(pagina == 1) {
      show.push("Próxima Página", "Voltar ao Menu Principal")
    } else {
      show.push("Página Anterior", "Próxima Página", "Voltar ao Menu Principal")
    }
    let choice = await listConsole("Livros: ", show, 15)


    if(choice.choice == "Página Anterior") {
      pagina -= 1
    } else if(choice.choice == "Próxima Página") {
      pagina += 1
    } else if(choice.choice == "Voltar ao Menu Principal") {
      nestaTela = false
    }
  }
}


// TELA DE DELETAR LIVROS
export async function deleteBookInLibrary(booksId: Array<string>) {
  const books = await getManyBooksById(booksId)
  let  booksTitles: string[] = []
  for(let i = 0; i < books.length; i++) {
    booksTitles.push(books[i].volumeInfo.title)
  }

  if (booksId.length == 0) {
    console.log("Não há livros na biblioteca")
    await readConsole("Pressione <enter> para voltar ao menu da biblioteca")
    return null
  }

  let choices: string[] = booksTitles
  choices.push("Voltar ao Menu da Biblioteca")

  const choice = await listConsole("Selecione um livro para deletar", choices, 15)

  if (choice.choice == "Voltar ao Menu da Biblioteca") {
    return null
  }

  await removeBookFromCollection("biblioteca", booksId[choices.indexOf(choice.choice)])
  await readConsole("<enter>")
}
