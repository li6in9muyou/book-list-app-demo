import {memoize} from 'lodash'

export const fetchBookList = memoize(
    async user => await (await fetch(`http://localhost:8081/api/${user}/book-lists`)).json()
)
