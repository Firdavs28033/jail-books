import db from './db'

export default async function getProfile(id){
    let result = {}

    await db.collection("prisoners").where("id", "==", id)
    .get()
    .then((querySnapshot)=>{
        result = querySnapshot.docs[0].data()
    })
    .catch((error) => {
        console.log("Error getting documents: ", error)
    })

    return result
}