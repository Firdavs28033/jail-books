import db from './db'

export default async function getPrisonersList(id){
    let result = []

    await db.collection("prisoners").where("jail", "==", id)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            result.push(doc.data())
        })
    })
    .catch((error) => {
        console.log("Error getting documents: ", error)
    })

    return result
}