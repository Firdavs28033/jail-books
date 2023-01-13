import db from './db'

export default async function deletePrisoner(id){
    let data
    let changesList
    let date = new Date()
    let outputDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

    await db.collection("prisoners").doc(id)
    .get()
    .then((doc) => {
        data = doc.data()

        changesList = data.history
        changesList.push({date: outputDate, description: `deleted`})
    })

    await db.collection("prisoners").doc(id)
    .update({
        isDeleted: true,
        history: changesList
    })
}