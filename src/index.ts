import { listConsole } from "./utils/readConsole"
import { searchBook, searchBooksByAuthorView } from "./view/searchBook"
let quit = false
let choice = { choice: ""}
const choices = ["Pesquisar livros", "Pesquisar livro pelo autor", "Sair"]

while (quit == false) {
  console.log("Bem vindo ao Console Books.")

  choice = await listConsole(
    "Escolha uma ação: ",
    3,
    choices
  )

  if (choices.indexOf(choice.choice) == 0) {
    await searchBook()
  } else if(choices.indexOf(choice.choice) == 1) {
    await searchBooksByAuthorView()
  } else if(choices.indexOf(choice.choice) == 2) {
    quit = true
  }
}
