import db from './db'

export default async function addBook(data){
    let date = new Date()
    let outputDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    let genID = Math.floor(Math.random()*10000000)+1

    data.changes = [{date: outputDate, description: `added`}]
    data.id = `book-${genID}`
    data.addDate = outputDate
    data.isComplate = false
    data.term.since = outputDate
    data.term.to = ''

    await db.collection("books")
    await db.collection("books").doc(`book-${genID}`).set({
        ...data
    })
    .catch((error) => {
        console.error("Error writing document: ", error)
    })
    return 
}