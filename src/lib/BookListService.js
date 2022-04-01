import {memoize} from 'lodash'

export const fetchAllBookListOfUser = memoize(
    async user => await (await fetch(`http://localhost:8081/api/${user}/book-lists`)).json()
)

export async function createBookList(user, title, books = []) {
    return await fetch(`http://localhost:8081/api/${user}/book-lists`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            id: title,
            books: books,
            creator: user
        })
    })
}

export async function deleteBookList(user, title) {
    return await fetch(`http://localhost:8081/api/${user}/book-lists/${title}`, {
        method: 'DELETE'
    })
}

export async function addBooksToBookList(user, title, newBooks) {
    const existingBooks = await fetchAllBookListOfUser(user).filter(
        list => list.id === title
    )
    return await fetch(`http://localhost:8081/api/${user}/book-lists/${title}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            books: [...newBooks, ...existingBooks]
        })
    })
}

export async function fetchBookListsContainOneBook(user, book) {
    return await fetchAllBookListOfUser(user).filter(
        list => list.books.indexOf(book) !== -1
    )
}
