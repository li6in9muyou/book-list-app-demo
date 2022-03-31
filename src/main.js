import './assets/app.css'
import ActionPanel from './components/ActionPanel.svelte'

const app = new ActionPanel({
    target: document.body,
    props: {
        book: {
            id: 999,
            path: 'some book.pdf'
        },
        subject: 999
    }
})

export default app
