import { clear } from "console"
import { listConsole, readConsole } from "../utils/readConsole"
import { createNewCollection, getManyCollections } from "../controller/collections"

export async function collections() {
  let nestaTela = true
  while (nestaTela == true) {
    clear()
    const choices: string[] = ["Ver coleções", "Criar coleção", "Voltar ao Menu Principal"]
    const choice = await listConsole("COLEÇÕES", choices, 15)

    if(choice.choice == "Ver coleções") {
      await seeCollection()
    } else if(choice.choice == "Criar coleção") {
      await createCollection()
    } else if(choice.choice == "Voltar ao Menu Principal") {
      nestaTela = false
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

  console.log(collections)

  await readConsole("")
}
