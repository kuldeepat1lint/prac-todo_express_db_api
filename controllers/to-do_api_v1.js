const model = require('../models/todo_api_v1_model')

class ToDo {
    constructor(obj) {
        this.title = obj.title
        this.des = obj.des
    }
}

// Services/Functionality.....

const getAllTask = (req, res) => {
    model.getAllTask((err, result) => {
        if (err) {
            return res.status(500).json({ status: "failed", data: err, msg: "something went wrong" })
        }
        else {
            return res.status(200).json({ status: "success", data: result })
        }
    })
}

const addTask = (req, res) => {
    const todo = new ToDo({
        title: req.body.title,
        des: req.body.des
    })

    model.addTask(todo,
        (err, result) => {
            if (err) {
                return res.status(500).json({ status: "failed", data: err, msg: "something went wrong" })
            }
            else {
                return res.status(200).json({ status: "success", data: [{ affectedRows: result.affectedRows }] })
            }
        })
}


const getSingleTaskById = (req, res) => {
    const id = req.params.id
    // if (!id) {
    //     return res.status(400).json({msg: "err"})
    // }

    model.getSingleTaskById(id,
        (err, result) => {
            if (err) {
                return res.status(500).json({ status: 'failed', data: [] })
            }
            return res.status(200).json({ status: "success", data: result })
        })
}


const editTask = (req, res) => {
    const id = req.params.id
    const todo = new ToDo({
        title: req.body.title,
        des: req.body.des
    })

    model.editTask(id, todo,
        (err, result) => {
            if (err) {
                return res.status(500).json({ status: "failed", data: err, msg: "something went wrong" })
            }
            else {
                return res.status(200).json({ status: "success", data: [{ affectedRows: result.affectedRows }] })
            }
        })
}



const deleteTask = (req, res) => {
    const id = req.params.id

    model.deleteTask(id,
        (err, result) => {
            if (err) {
                return res.status(500).json({ status: "failed", data: err, msg: "something went wrong" })
            }
            else {
                return res.status(200).json({ status: "success", data: [{ affectedRows: result.affectedRows }] })
            }
        })
}
const searchTitle = (req, res) => {
    const searchQuery = req.query.q
    if (!searchQuery)
        return res.status(200).json({ status: "failed", data: [] })
    
    model.searchTitle(searchQuery,
        (err, result) => {
            if (err) {
                return res.status(500).json({ status: "failed", data: err, msg: "something went wrong" })
            }
            else {
                return res.status(200).json({ status: "success", data: result })
            }
        })
}

module.exports = {
    getAllTask,
    searchTitle,
    getSingleTaskById,
    editTask,
    addTask,
    deleteTask
}