import PouchDB from "pouchdb";
import { map } from "lodash";

const dateFmt = (d) => d.toISOString().split("T")[0];
const today = () => dateFmt(new Date());

class BorrowRecord {
  userId: number;
  bookId: number;
  private borrowedAt: string;
  private returnedAt: string;

  constructor({
    userId,
    bookId,
    borrowedAt = today(),
    returnedAt = "",
  }: {
    userId: number;
    bookId: number;
    borrowedAt?: string;
    returnedAt?: string;
  }) {
    this.userId = userId;
    this.bookId = bookId;
    this.borrowedAt = borrowedAt;
    this.returnedAt = returnedAt;
  }

  static markReturned(rec: BorrowRecord, when = new Date()) {
    rec.returnedAt = dateFmt(when);
  }
  static alreadyReturned(rec: BorrowRecord) {
    return rec.returnedAt !== "";
  }
}

const dbHistory = new PouchDB("dbHistory");

async function returnBook(userId: number, bookId: number) {
  dbHistory
    .get(`${userId}-${bookId}`)
    .then((doc) => {
      BorrowRecord.markReturned(doc.borrow);
      dbHistory.put(doc);
    })
    .catch((err) => {
      console.error(err.message);
    });
}

function borrowBook(userId: number, bookId: number) {
  dbHistory.put({
    _id: `${userId}-${bookId}`,
    borrow: new BorrowRecord({ userId, bookId }),
  });
}

function addListener(fn) {
  return dbHistory
    .changes({ include_docs: true, since: "now", live: true })
    .on("change", (change) => {
      console.log("service", change);
      fn(change.doc.borrow);
    })
    .catch((err) => console.error(err));
}

async function listBorrow(userId: number): Promise<BorrowRecord[]> {
  return await dbHistory
    .allDocs({
      include_docs: true,
      startkey: `${userId}`,
      endkey: `${userId}\ufff0`,
    })
    .then((result) => {
      return map(result.rows, (row) => new BorrowRecord(row.doc.borrow));
    });
}

export { borrowBook, BorrowRecord, listBorrow, addListener, returnBook };
