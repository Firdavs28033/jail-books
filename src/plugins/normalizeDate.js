export default function normalizeDate(date){
    let result = date.split('-')

    return `${result[2]}.${result[1]}.${result[0]}`
}