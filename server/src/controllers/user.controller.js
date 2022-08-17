const { default: mongoose } = require('mongoose')
const User = require('../models/user.model')


function UserController() {

    return {

        // Add new user
        async add(req, res) {

            const { name, email, age, address, contact } = req.body
            if (!name || !email || !age || !address || !contact) {
                return res.status(400).json({ status: false, message: "All fields required" })
            }

            let userExists = await User.findOne({ email }).lean().exec()
            if (userExists) {
                return res.status(403).json({ status: false, message: 'User Already exists' })
            }
            let user = new User({ name, email, age, address, contact })

            await user.save().then(() => {
                return res.status(201).json({ status: true, message: 'User saved successfully' })
            })

        },



        // Get all users
        async getAllUsers(req, res) {
            return res.status(200).send({ status: true, user: await User.find({}) })
        },




        // Get all user ny id
        async getUserById(req, res) {
            const user = await User.findOne({ _id: req.params.id }).exec()
            if (!user) {
                return res.status(404).send({ status: false, message: 'User not found' })
            }
            return res.status(200).send({ status: true, user: await User.findOne({ _id: req.params.id }) })
        },



        // Update user by Id
        async updateUserById(req, res) {
            const { name, email, age, address, contact } = req.body

            if (!name || !email || !age || !address || !contact) {
                return res.status(400).json({ status: false, message: "All fields required" })
            }
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(404).send({ status: false, message: 'Email dose not found' })
            } else {
                await User.findByIdAndUpdate({ _id: user._id }, {
                    $set: { name, email, age, contact, address }
                }).then(function (user) {
                    return res.status(200).send({ status: true, user, message: 'User Update Successfully' })
                }).catch(function (err) {
                    if (err) return res.status(500).send({ status: false, message: 'Something went wrong', error: err.message })
                    console.log(err.message)
                })
            }
        },

        // Delete user Id
        async deleteUserById(req, res) {
            const id = req.params.id
            const user = await User.findOne({ _id: id }).exec()
            if (!user) {
                return res.status(404).send({ status: false, message: 'User not found' })
            }
            await User.findByIdAndDelete(id).then(function (user) {
                return res.status(200).send({ status: true, message: 'User deleted' })
            }).catch(function (err) {
                return res.status(500).send({ status: false, message: 'Something went wrong', error: err.message })
            })
        }
    }

}

module.exports = UserController

