import { sleep } from "../../lib/utility";
import { random } from "lodash";

export {
  dueDate,
  canBorrow,
  allBorrowedBooks,
  borrowBook,
  returnBook,
  postponeDueDate,
  BorrowHistory,
};

async function canBorrow(userId: number, bookId: number): Promise<boolean> {
  await sleep(500);
  const x = random(0, 1);
  return x > 0.5;
}

class BorrowHistory {
  bookId: number;
  userId: number;
  issued_at: Date;
  returned_at: Date | null;

  constructor(
    bookId: number,
    userId: number,
    issued_at: Date,
    returned_at: Date | null = null
  ) {
    this.bookId = bookId;
    this.userId = userId;
    this.issued_at = issued_at;
    this.returned_at = returned_at;
  }
}
async function allBorrowedBooks(userId: number): Promise<BorrowHistory[]> {
  return [
    new BorrowHistory(1480, 1000, new Date()),
    new BorrowHistory(1470, 1000, new Date(2022, 2, 28)),
    new BorrowHistory(1280, 1000, new Date(2022, 3, 15)),
  ];
}

async function returnBook(userId: number, bookId: number) {
  await sleep(500);
  if (random(0, 1) > 0.5) {
    return { status: "ok" };
  } else {
    throw { message: "failed", cause: "bad luck" };
  }
}

async function borrowBook(userId: number, bookId: number) {
  await sleep(500);
  if (random(0, 1) > 0.5) {
    return { status: "ok" };
  } else {
    throw { message: "failed", cause: "bad luck" };
  }
}

async function postponeDueDate(userId: number, bookId: number) {
  await sleep(500);
}

async function dueDate(
  userId: number,
  bookId: number
): Promise<{ period_length: number; issued_date: Date }> {
  await sleep(500);
  return { period_length: 25, issued_date: new Date(2022, 2, 31) };
}
