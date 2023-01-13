import db from './db'

export default async function addPrisoner(data){
    let date = new Date()
    let outputDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    let genID = Math.floor(Math.random()*10000000)+1

    data.history = [{date: outputDate, description: `added`}]
    data.id = `id-${genID}`
    data.addDate = outputDate
    data.isDeleted = false
    data.isReleased = false

    await db.collection("prisoners")
    await db.collection("prisoners").doc(`id-${genID}`).set({
        ...data
    })
    .catch((error) => {
        console.error("Error writing document: ", error)
    })
    return 
}