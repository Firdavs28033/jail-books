import db from './db'

export default async function addJail(data){
    let date = new Date()
    let outputDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    let genID = Math.floor(Math.random()*10000000)+1
    
    data.id = `jail-${genID}`
    data.addDate = outputDate,
    data.changes = [{date: outputDate, description: `created`}]
    data.isDeleted = false

    await db.collection("jails")
    await db.collection("jails").doc(`jail-${genID}`).set({
        ...data
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
    return
}