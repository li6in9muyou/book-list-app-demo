<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { derived, writable } from "svelte/store";
  import FaShoppingCart from "svelte-icons/fa/FaShoppingCart.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import Filter from "./Filter.svelte";
  import { debounce, pull, pullAllBy } from "lodash";
  import Listing from "./Listing.svelte";
  import BatchOp from "./BatchOp.svelte";
  import BookBagListing from "./BookBagListing.svelte";
  import AddBooksToList from "../BookListComponet/AddBooksToList/main.svelte";
  import SearchTip from "../searchPage/SearchTip.svelte";
  // depends:
  import { Book, fetchAllBooks } from "../Book/services";
  import { CurrentUserId } from "../../lib/backendService/user.service.js";

  let all_entries = writable<Book[]>([]);

  let filter = writable((book: Book) => {
    return true;
  });

  let showing = derived([all_entries, filter], ([items, fn]) =>
    items.filter(fn)
  );

  let selected = writable<Book[]>([]);

  setContext("AllEntries", all_entries);
  setContext("Showing", showing);
  setContext("Filter", filter);
  setContext("Selected", selected);

  setContext("toggle", (b: Book, expected) => {
    if (expected) {
      $selected = [...$selected, b];
    } else {
      $selected = pull($selected, b);
    }
  });

  setContext("queryToggle", (x) => {
    return $selected.indexOf(x) !== -1;
  });

  onMount(async () => {
    $all_entries = await fetchAllBooks();
  });
  let showSubListing = false;

  function deselect({ detail }) {
    console.log("deselect", detail);
    $selected = pullAllBy($selected, [detail.book], "id");
    showSubListing = false;
  }
</script>

<main class="mx-auto flex h-screen max-w-4xl flex-col">
  <Listing entries={showing} />
</main>
<div
  class="sticky bottom-0 z-30 flex max-w-lg items-stretch gap-2 bg-base-300 p-2 pb-4"
>
  <div class="flex w-1/4 items-center">
    <div
      class="dropdown dropdown-top m-auto mb-0"
      class:dropdown-open={showSubListing}
    >
      <div
        class="indicator"
        on:click={debounce(
          () => {
            showSubListing = !showSubListing;
          },
          1000,
          { leading: true }
        )}
      >
        <span
          class="badge indicator-item badge-secondary top-2 right-2 font-mono"
        >
          {$selected.length > 99 ? "99+" : $selected.length.toString()}
        </span>
        <div class="btn btn-accent btn-circle">
          <div class="h-full w-full">
            <FaShoppingCart />
          </div>
        </div>
      </div>
      <div class="dropdown-content z-30 bg-base-100">
        <BookBagListing on:unselect={deselect} />
      </div>
    </div>
  </div>
  <div class="flex w-full flex-col gap-2">
    <Filter />
    <div class="flex w-full items-center gap-4">
      <div class="ml-auto">
        <BatchOp
          on:all={() => {
            $selected = $showing;
          }}
          on:clear={() => {
            $selected = [];
          }}
          on:reverse={() => {
            $selected = pullAllBy([...$all_entries], $selected, "id");
          }}
        />
      </div>
      <label
        for="addToList"
        class:btn-disabled={$selected.length === 0}
        class="btn btn-primary btn-sm w-full flex-1 border text-primary-content shadow"
      >
        结算
      </label>
    </div>
  </div>
</div>
<input type="checkbox" id="addToList" class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative p-0">
    <label for="addToList" class="btn btn-circle btn-sm absolute right-2 top-2">
      <MdClose />
    </label>
    <AddBooksToList userId={$CurrentUserId} thisBooks={$selected} />
  </div>
</div>
