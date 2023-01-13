import db from './db'

export default async function deleteJail(id){
    let data
    let changesList
    let date = new Date()
    let outputDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

    await db.collection("jails").doc(id)
    .get()
    .then((doc) => {
        data = doc.data()

        changesList = data.changes
        changesList.push({date: outputDate, description: `deleted`})
    })

    await db.collection("jails").doc(id)
    .update({
        isDeleted: true,
        changes: changesList
    })
}