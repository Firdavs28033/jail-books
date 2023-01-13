import db from './db'

export default async function editJail(id,oldName, newName){
    let data
    let changesList
    let date = new Date()
    let outputDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

    await db.collection("jails").doc(id)
    .get()
    .then((doc) => {
        data = doc.data()

        changesList = data.changes
        changesList.push({date: outputDate, description: `change name: ${oldName} -> ${newName}`})
    })

    await db.collection("jails").doc(id)
    .update({
        name: newName,
        changes: changesList
    })
}