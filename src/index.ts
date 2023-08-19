import { clear } from "console"
import { listConsole } from "./utils/readConsole"
import { viewLibrary } from "./view/biblioteca"
import { searchBook, searchBooksByAuthorView } from "./view/searchBook"
import { collections } from "./view/collections"


let quit = false
let choice = { choice: ""}
const choices = ["Pesquisar livros", "Pesquisar livro pelo autor", "Biblioteca", "Coleções", "Sair"]

while (quit == false) {
  clear()
  console.log("Bem vindo ao Console Books.")

  choice = await listConsole(
    "Escolha uma ação: ",
    choices,
    10
  )

  if (choices.indexOf(choice.choice) == 0) {
    await searchBook()
  } else if(choices.indexOf(choice.choice) == 1) {
    await searchBooksByAuthorView()
  } else if(choices.indexOf(choice.choice) == 2) {
    await viewLibrary()
  } else if(choices.indexOf(choice.choice) == 3) {
    await collections()
  } else if(choices.indexOf(choice.choice) == 4) {
    quit = true
  }
}
