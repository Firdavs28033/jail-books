import db from './db'

export default function checkUser(login, password){
    let query = db.collection('users')

    query.where("login", "==", login)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
        });
    })
    .catch((error) => {
        console.log("Error getting document:", error);
    });

    
    // проверка на запрос подобного логина
    // если да, то проверка пароля
    // если да, то занесение данных в LocalStorage
}