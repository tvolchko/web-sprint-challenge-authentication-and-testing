const db = require("../../data/dbConfig")

module.exports = {
  add,
  find,
  findBy,
}

function find() {
  return db("users as u")
    .select("u.id", "u.username")
}

function findBy(filter) {
  return db("users as u")
    .select("u.id", "u.username", "u.password")
    .where(filter)
    .first()
}

async function add(user) {
  const [id] = await db("users").insert(user)
  return findBy({ id })
}

