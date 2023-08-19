import { listConsole, readConsole } from "../utils/readConsole"
import { searchBooksByAuthor, searchBooksByTitle } from "../controller/books"
import { clear } from "console"
import { addBookToCollection } from "../controller/biblioteca"


export async function searchBook() {
	let bookTitle = ""
	let pesquisar = true
  let nestaTela = true
	let pagina = 1
  while (nestaTela == true) {
		bookTitle = pesquisar == true ? await readConsole("Nome do Livro: ") : bookTitle

    const books = await searchBooksByTitle(bookTitle, pagina)
    const booksInfo = books.items.map((data) => ({
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors,
    }))

    let booksList: string[] = []
    for (let i = 0; i < 10; i++) {
      booksList.push(booksInfo[i].title + " \n " + booksInfo[i].authors)
    }
    
    let choices = booksList
		choices.push("Próxima página")
		if (pagina > 1) {
			choices.push("Voltar página")
		}
    choices.push("Pesquisar novamente")
    choices.push("Voltar à tela principal")

    clear()

    const choice = await listConsole("Livros", booksList, 15)
    const numberChoice = booksList.indexOf(choice.choice)

    if (numberChoice < 10) {
      const ch = await bookInfo(books.items[numberChoice].volumeInfo)
      if (ch == 0) {
        await addBookToCollection({ id: books.items[numberChoice].id }, "biblioteca")
        nestaTela = false
      } else if (ch == 1) {
        nestaTela = false
      }
    } else if(numberChoice == 10) {
			pagina += 1
			pesquisar = false
		} else if(choice.choice == "Voltar página") {
			pagina -= 1
			pesquisar = false
		} else if(choice.choice = "Pesquisar novamente") {
			pesquisar = true
      null
    } else if(choice.choice == "Voltar à tela principal") {
      nestaTela = false
    }
  }
}



export async function searchBooksByAuthorView() {
  let nestaTela = true
	let pesquisar = true
	let bookAuthor = ""
	let pagina = 1
  while (nestaTela == true) {
		bookAuthor = pesquisar == true ? await readConsole("Nome do autor: ") : bookAuthor

    const books = await searchBooksByAuthor(bookAuthor, pagina)
    const booksInfo = books.items.map((data) => ({
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors,
    }))

    let booksList: string[] = []
    for (let i = 0; i < 10; i++) {
      booksList.push(booksInfo[i].title + " \n " + booksInfo[i].authors)
    }
    
    let choices = booksList
		choices.push("Próxima página")
		if (pagina > 1) {
			choices.push("Página anterior")
		}	
    choices.push("Pesquisar novamente")
    choices.push("Voltar à tela principal")

    clear()

    const choice = await listConsole("Livros", booksList, 15)
    const numberChoice = booksList.indexOf(choice.choice)

    if (numberChoice < 10) {
      const ch = await bookInfo(books.items[numberChoice].volumeInfo)
      if (ch == 0) {
        await addBookToCollection({ id: books.items[numberChoice].id }, "biblioteca")
        nestaTela = false
      } else if (ch == 1) {
        nestaTela = false
      }
    } else if(choice.choice == "Próxima página") {
			pagina += 1
			pesquisar = false
    } else if(choice.choice == "Página anterior") {
			pagina -= 1
    } else if(choice.choice == "Pesquisar novamente") {
			pesquisar = true
		} else if(choice.choice == "Voltar à tela principal") {
			nestaTela = false
		}
  }
}

export async function bookInfo(books) {
  clear()
  console.log(books.title)
  books.subtitle ? console.log(books.subtitle) : null
  books.authors ? console.log("Autores: " + books.authors) : null
  books.publisher ? console.log("Publisher: " + books.publisher) : null

  const choices = ["Adicionar livro à biblioteca","Pesquisar outro livro", "Voltar à página inicial"]
  const choice = await listConsole("----------------", choices, 10)

  return choices.indexOf(choice.choice)
}
