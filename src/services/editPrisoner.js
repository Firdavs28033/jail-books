import db from './db'
import normalizeDate from '@/plugins/normalizeDate'

export default async function editPrisoner(data){
    let changesData,
    changesList,
    criminalsList
    let dateToSave = {}
    let date = new Date()
    let outputDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

    await db.collection("prisoners").doc(data.id)
    .get()
    .then((doc) => {
        changesData = doc.data()
        changesList = changesData.history
        criminalsList = changesData.criminals
    })

    if(data.fullname){
        changesList.push({date: outputDate, description: `change fullname: ${data.oldFullname} -> ${data.fullname}`})
        dateToSave.fullname = data.fullname
        dateToSave.history = changesList
    }
    if(data.criminal){
        changesList.push({date: outputDate, description: `change criminal: ${data.oldCriminal} -> ${data.criminal}`})
        criminalsList[0].article = data.criminal
        dateToSave.criminals = criminalsList
        dateToSave.history = changesList
    }
    if(data.born){
        changesList.push({date: outputDate, description: `change born: ${data.oldBorn} -> ${data.born}`})
        dateToSave.born = normalizeDate(data.born)
        dateToSave.history = changesList
    }
    if(data.termSince){
        changesList.push({date: outputDate, description: `change criminal term since: ${data.oldTermSince} -> ${data.termSince}`})
        criminalsList[0].term.since = normalizeDate(data.termSince)
        dateToSave.criminals = criminalsList
        dateToSave.history = changesList
    }
    if(data.termTo){
        changesList.push({date: outputDate, description: `change criminal term to: ${data.oldTermTo} -> ${data.termTo}`})
        criminalsList[0].term.to = normalizeDate(data.termTo)
        dateToSave.criminals = criminalsList
        dateToSave.history = changesList
    }

    await db.collection("prisoners").doc(data.id)
    .update({
        ...dateToSave
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
    return
}