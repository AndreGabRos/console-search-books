import inquirer from "inquirer"

export async function readConsole(message: string) {
  const { mensagem } = await inquirer.prompt([
    {
      type: "input",
      name: "mensagem",
      message: message
    }
  ])

  return mensagem
}

export async function checkboxConsole(mensagem: string, numOptions: number, options: Array<string>) {
  let choicesArray:object[] = []
  for(let i = 0; i < numOptions; i++) {
    choicesArray.push({ name: options[i]})
  }

  const rs = await inquirer.prompt([
    {
      type: "checkbox",
      name: "choice",
      message: "Selecione uma opção: ",
      choices: choicesArray
    }
  ])

  console.log(rs)
}

export async function listConsole(mensagem: string, numOptions: number, options: Array<string>) {
  let choicesArray:object[] = []
  for(let i = 0; i < numOptions; i++) {
    choicesArray.push({ name: options[i]})
  }

  const rs = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: mensagem,
      choices: choicesArray
    }
  ])

  return rs
}
