import db from './db'

export default async function getJailsList(){
    let result = []

    await db.collection("jails")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            result.push(doc.data())
        })
    })
    .catch((error) => {
        console.log("Error getting documents: ", error)
    })

    if(result.length==0){
        return false
    }
    return result
}