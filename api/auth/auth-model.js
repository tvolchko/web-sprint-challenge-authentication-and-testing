const db = require("../../data/dbConfig")

module.exports = {
  add,
  findBy,
}

function findBy(filter) {
  return db("users as u")
    .select("u.id", "u.username", "u.password")
    .where(filter)
}

async function add(user) {
  const [id] = await db("users").insert(user)
  return findBy({ id })
}

