import db from './db'

export default async function deletePrisoner(id,jailId,reason){
    let data
    let changesList
    let date = new Date()
    let outputDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

    await db.collection("prisoners").doc(id)
    .get()
    .then((doc) => {
        data = doc.data()

        changesList = data.history
        changesList.push({date: outputDate, description: `transfer to '${jailId}'. Reason: ${reason}`})
    })

    await db.collection("prisoners").doc(id)
    .update({
         jail: jailId,
         history: changesList
    })
    return
}