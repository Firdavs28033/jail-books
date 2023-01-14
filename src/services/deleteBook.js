import db from './db'

export default async function deleteBook(id){
    await db.collection("books").doc(id)
    .delete()
}