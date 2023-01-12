import db from './db'

export default async function checkUser(login, password){
    let query = db.collection('users')
    let response = {}

    await query.where("login", "==", login)
    .get()
    .then((querySnapshot) => {
        if(querySnapshot.docs.length){
            return querySnapshot.docs[0].data()
        } else{
            response.status = false
            response.error = 'Введён не существующий логин'
            return false
        }
    })
    .then((data)=>{
        if(!data){
            return
        }

        if(data.password == password){
            response.status = true
            response.user = {
                name: data.login,
                permissions: data.permissions
            }
            return response
        } else{
            response.status = false
            response.error = 'Введён не верный пароль'
            return
        }
    })

    return response
}