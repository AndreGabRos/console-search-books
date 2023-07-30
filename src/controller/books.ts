import axios from "axios"

const API_GOOGLE_BOOKS = "https://www.googleapis.com/books/v1/volumes"

export async function searchBooksByTitle(title: string) {
  const titleParam = "intitle:" + title
  
  const response = await axios.get(API_GOOGLE_BOOKS, {
    params: {
      q: titleParam,
      maxResults: 10,
    }
  })

  const books = response.data
  return books
}

export async function searchBooksByAuthor(author: string) {
  const authorParam = "inauthor:"+author

  const response = await axios.get(API_GOOGLE_BOOKS, {
    params: {
      q: authorParam,
      maxResults: 10,
    }
  })

  const books = response.data
  return books
}
