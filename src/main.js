import "./assets/app.css";
import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    book: {
      id: 999,
      path: "some book.pdf",
    },
    subject: 999,
  },
});

export default app;
