import { clear } from "console"
import { listConsole, readConsole } from "../utils/readConsole"
import { createNewCollection, deleteCollectionController, getManyCollections } from "../controller/collections"
import { getCollectionBooks } from "../controller/biblioteca"
import { removeBookFromCollection } from "../controller/collections"
import { getManyBooksById } from "../controller/books"
import { addBookToCollection as addBookToCollectionController } from "../controller/collections"
import { bookMenu } from "./book"

export async function collections() {
  let nestaTela = true
  while (nestaTela == true) {
    clear()
    const choices: string[] = ["Ver coleções", "Adicionar livro à alguma coleção", "Criar coleção", "Remover Coleção", "Voltar ao Menu Principal"]
    const choice = await listConsole("COLEÇÕES", choices, 15)

    if(choice.choice == "Ver coleções") {
      await seeCollection()
    } else if(choice.choice == "Criar coleção") {
      await createCollection()
    } else if(choice.choice == "Voltar ao Menu Principal") {
      nestaTela = false
    } else if(choice.choice == "Adicionar livro à alguma coleção") {
      await addBookToCollection()
    } else if(choice.choice == "Remover Coleção"){
      await deleteCollection()
    }
  }
}

export async function createCollection() {
  const collectionName = await readConsole("Digite o nome da nova coleção que deseja criar: ")

  const collection = await createNewCollection(collectionName)

  console.log(collection)
}

export async function seeCollection() {
  const collections = await getManyCollections()

  let choices = collections.flatMap((item) => { return item.name })
  choices.push("Voltar ao Menu de Coleções")
  const choice = await listConsole("COLEÇÕES", choices, 15) 

  if(choice.choice == "Voltar ao Menu de Coleções") {
    return null
  }

  await listCollectionBooks(choice.choice)
}


async function listCollectionBooks(collectionName: string) {
  const books = await getCollectionBooks(collectionName)
  const booksId = books.flatMap((item) => { return item.id })

  const booksInfo = await getManyBooksById(booksId)

  const booksTitle = booksInfo.flatMap((item) => { return item.volumeInfo.title })
  let choices = booksTitle
  choices.push("Voltar ao Menu de Coleção")

  const choice = await listConsole("LIVROS DA COLEÇÃO", booksTitle, 15)
  
  if(choice.choice == "Voltar ao Menu de Coleção") {
    return null
  }

  const index = booksTitle.indexOf(choice.choice)
  const opt = await bookMenu(booksId[index], ["Remover livro da Coleção"])

  if(opt == "Remover livro da Coleção") {
    await removeBookFromCollection(booksId[index], collectionName)
  }
}


export async function addBookToCollection() {
  const libraryBooks = await getCollectionBooks("biblioteca")
  const booksId = libraryBooks.flatMap((item) => { return item.id })
  const books = await getManyBooksById(booksId)

  let  booksTitles: string[] = []
  for(let i = 0; i < books.length; i++) {
    booksTitles.push(books[i].volumeInfo.title)
  }

  let choices: string[] = booksTitles
  choices.push("Voltar ao Menu de Coleções")

  const choice = await listConsole("ADICIONAR LIVRO À COLEÇÃO", choices, 15)

  if(choice.choice == choices.reverse[0]) {
    return null
  }


  clear()
  const collections = await getManyCollections()

  let choicesCollection = collections.flatMap((item) => { return item.name })
  choicesCollection.push("Voltar ao Menu de Coleções")
  const choiceCollection = await listConsole("COLEÇÕES", choicesCollection, 15) 

  if(choiceCollection.choice == "Voltar ao Menu de Coleções") {
    return null
  }

  const index = booksTitles.indexOf(choice.choice)
  await addBookToCollectionController(booksId[index], choiceCollection.choice)
}

async function deleteCollection() {
  const collections = await getManyCollections()

  let choices = collections.flatMap((item) => { return item.name })
  choices.push("Voltar ao Menu de Coleções")

  const choice = await listConsole("DELETAR COLEÇÃO", choices, 15)

  if(choice.choice == "Voltar ao Menu de Coleções") {
    return null
  }

  await deleteCollectionController(choice.choice)
}
