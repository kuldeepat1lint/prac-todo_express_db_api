const { all } = require('../routes/to-do_api_v1')
const sql = require('./db')

const getAllTask = result => {
    sql.query("SELECT * FROM todo_api", (err, res) => {
        if (err) {
            console.log("err:", err)
            result(null, err)
            return
        }
        result(res, null)
    })
}

const addTask = (todo, result) => {
    sql.query("INSERT INTO todo_api SET ?", [todo], (err, res) => {
        if (err) {
            console.log("err:", err)
            result(err, result)
            return
        }
        result(null, res)
        return
    })
}

const getSingleTaskById = (id, result) => {
    sql.query("SELECT * FROM todo_api WHERE id = ?", [id], (err, res) => {
        if (err) {
            console.log("err:", err)
            result(err, null)
            return
        }
        return result(null, { ...res[0] })
    })
}

const editTask = (id, todo, result) => {
    sql.query("UPDATE todo_api SET ? WHERE id = ?", [todo, id], (err, res) => {
        if (err) {
            console.log("err:", err)
            result(err, result)
            return
        }
        result(null, res)
        return
    })
}

const deleteTask = (id, result) => {
    sql.query("DELETE FROM todo_api WHERE id = ?", [id], (err, res) => {
        if (err) {
            console.log("err:", err)
            result(err, result)
            return
        }
        result(null, res)
        return
    })
}

const searchTitle = (query, result) => {
    sql.query("SELECT * FROM todo_api WHERE title LIKE ?", [`${query}%`], (err, res) => {
        if (err) {
            console.log("err:", err)
            result(err, result)
            return
        }
        let allResult = []
        for (const i of res) {
            allResult.push({...i})
        }
        console.log(allResult)
        return result(null, allResult)
    })
}

module.exports = {
    getAllTask,
    addTask,
    getSingleTaskById,
    editTask,
    deleteTask,
    searchTitle
}