import db from './db'

export default async function deletePrisoner(id, reason){
    let data
    let changesList
    let date = new Date()
    let outputDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

    await db.collection("prisoners").doc(id)
    .get()
    .then((doc) => {
        data = doc.data()

        changesList = data.history
        changesList.push({date: outputDate, description: `released. Reason: ${reason}`})
    })

    await db.collection("prisoners").doc(id)
    .update({
        isReleased: true,
        history: changesList
    })
}