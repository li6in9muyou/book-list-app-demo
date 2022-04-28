<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { derived, writable } from "svelte/store";
  import FaShoppingCart from "svelte-icons/fa/FaShoppingCart.svelte";
  import Filter from "./Filter.svelte";
  import { debounce, pull, pullAllBy } from "lodash";
  import Listing from "./Listing.svelte";
  import BatchOp from "./BatchOp.svelte";
  import BookBagListing from "./BookBagListing.svelte";
  // depends:
  import { Book, fetchAllBooks } from "../Book/services";
  import AddToBookListModal from "../BookListComponet/AddBooksToList/AddToBookListModal.svelte";

  let all_entries = writable<Book[]>([]);
  setContext("AllEntries", all_entries);

  let filter = writable((book: Book) => {
    return true;
  });
  setContext("Filter", filter);

  let showing = derived([all_entries, filter], ([items, fn]) =>
    items.filter(fn)
  );
  setContext("Showing", showing);

  let selected = writable<Book[]>([]);
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
    $all_entries = $all_entries.slice(0, 5);
  });
  let showSubListing = false;

  function unselect({ detail }) {
    console.log("unselect", detail);
    $selected = pullAllBy($selected, [detail.item], "id");
  }

  let showBatchAdd = false;
</script>

<div class="mx-auto w-screen max-w-4xl">
  <main class="flex h-screen w-full flex-col px-1 md:px-4">
    <Listing entries={showing} />
  </main>
  <div
    class="sticky bottom-0 z-30 mx-auto flex w-full items-stretch gap-2 bg-base-300 p-2 pb-4"
  >
    <div class="flex w-1/4 items-center">
      <div
        class="dropdown dropdown-top m-auto mb-0"
        class:dropdown-open={showSubListing}
      >
        <div
          class="indicator -rotate-12"
          on:click={debounce(
            () => {
              showSubListing = !showSubListing;
            },
            1000,
            { leading: true }
          )}
        >
          <span
            class="badge indicator-item badge-secondary top-0 right-2 font-mono"
          >
            {$selected.length > 99 ? "99+" : $selected.length.toString()}
          </span>

          <div class="btn btn-accent btn-circle scale-150">
            <div class="h-full w-full">
              <FaShoppingCart />
            </div>
          </div>
        </div>
        <div
          class="dropdown-content relative -left-4 -top-4 z-30 rounded rounded-lg bg-base-100"
        >
          <BookBagListing on:unselect={unselect} />
        </div>
      </div>
    </div>
    <div
      class="flex w-full flex-col gap-2 md:flex-row md:items-center md:gap-4"
    >
      <div class="md:w-full">
        <Filter />
      </div>
      <div class="flex w-full items-center gap-4">
        <div class="ml-auto md:mx-auto">
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
          on:click={() => (showBatchAdd = true)}
          class:btn-disabled={$selected.length === 0}
          class="btn btn-primary btn-sm w-full flex-1 border text-primary-content shadow
                 md:btn-circle md:btn-md"
        >
          结算
        </label>
      </div>
    </div>
  </div>
</div>
<AddToBookListModal bind:shouldShow={showBatchAdd} thisBooks={$selected} />
