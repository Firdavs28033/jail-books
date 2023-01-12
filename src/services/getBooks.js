import db from './db'

export default async function getBooks(id){
    let result = []

    await db.collection("books").where("prisoner", "==", id)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            result.push(doc.data())
        })
    })
    .catch((error) => {
        console.log("Error getting documents: ", error)
    })

    return result
}