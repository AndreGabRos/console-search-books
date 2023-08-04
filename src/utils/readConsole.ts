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

export async function checkboxConsole(mensagem: string, options: Array<string>) {
  let choicesArray:object[] = []
  for(let i = 0; i < choicesArray.length; i++) {
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

export async function listConsole(mensagem: string, options: Array<string>, pageSize: number) {
  const rs = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: mensagem,
      pageSize,
      loop: false,
      choices: options
    }
  ])

  return rs
}
