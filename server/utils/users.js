const users = []

// join user
function userJoin(id, username, room) {
    const user = { id, username, room }
    users.push(user)
    console.log(users)

    return user
}


module.exports = {
    userJoin
}