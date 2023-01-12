import db from './db'
import getJailsList from './getJailsList'

export default async function addJail(data){
    let jailsList = await getJailsList()
    let nextJail = jailsList.length
    let date = new Date()
    let outputDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    
    data.id = `jail-${nextJail+1}`
    data.addDate = outputDate,
    data.changes = [{date:outputDate, action:{type: 'create', description: ''}}]
    
    db.collection("jails").doc(`jail-${nextJail+1}`).set({
        ...data
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
    return
}