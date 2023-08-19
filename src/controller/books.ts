import axios from "axios"

const API_GOOGLE_BOOKS = "https://www.googleapis.com/books/v1/volumes"

export async function searchBooksByTitle(title: string, pagina: number) {
  try {
    const titleParam = "intitle:" + title
    
    const response = await axios.get(API_GOOGLE_BOOKS, {
      params: {
        q: titleParam,
        maxResults: 10,
				startIndex: 10*(pagina-1)
      }
    })

    return response.data
  } catch(err) {
    console.log("Não foi possível realizar a busca, tente novamente.")
  }
}

export async function searchBooksByAuthor(author: string, pagina: number) {
  const authorParam = "inauthor:"+author

  const response = await axios.get(API_GOOGLE_BOOKS, {
    params: {
      q: authorParam,
      maxResults: 10,
			startIndex: (pagina-1)*10
    }
  })

  const books = response.data
  return books
}

export async function getBookById(bookId: string) {
  const book = await axios.get(API_GOOGLE_BOOKS + "/" + bookId)

  return book.data
}


export async function getManyBooksById(booksId: Array<string>) {
  let books: object[] = []
  for (let i in booksId) {
    const book = await getBookById(booksId[i])
    books.push(book)
  }

  return books
}
