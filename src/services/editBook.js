import db from './db'

export default async function addBook(data){
    let changesData,
    changesList,
    termData
    let dateToSave = {}
    let date = new Date()
    let outputDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

    await db.collection("books").doc(data.id)
    .get()
    .then((doc) => {
        changesData = doc.data()
        changesList = changesData.changes
        termData = changesData.term
    })

    if(data.name){
        changesList.push({date: outputDate, description: `change name: ${data.oldName} -> ${data.name}`})
        dateToSave.name = data.name
        dateToSave.changes = changesList
    }

    if(data.isComplate != data.oldComplate){
        changesList.push({date: outputDate, description: `change complate status: ${data.oldComplate} -> ${data.isComplate}`})
        dateToSave.isComplate = data.isComplate
        dateToSave.changes = changesList

        if(data.isComplate == true){
            termData.to = outputDate
            dateToSave.term = termData
        } else{
            termData.to = ''
            dateToSave.term = termData
        }
    }

    await db.collection("books").doc(data.id)
    .update({
        ...dateToSave
    })
    .catch((error) => {
        console.error("Error writing document: ", error)
    })
    return
}