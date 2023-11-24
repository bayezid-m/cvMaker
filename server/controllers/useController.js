const express = require('express')
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const handleRegister = async (req, res) => {
    console.log(req.body)
    console.log("I am from controller");
    const newPassword = await bcrypt.hash(req.body.password, 10)
    console.log(newPassword);
    try {   
         await User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: newPassword,
            status: req.body.status,
            occupation: req.body.occupation,
            image: req.body.imageSender,
            skills: req.body.skills
        })
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', user: false })
    }
}

const handleLogin = async(req, res)=>{
    const user = await User.findOne({
        email: req.body.email,
    })

    if (!user) {
        return { status: 'error', error: 'No user found on that email' }
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    )

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                first_name: user.first_name,
                email: user.email,
            },
            'secret123'
        )
        return res.json({ status: 'ok', token: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
}

const handleGetProfile = async(req, res)=>{
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({ email: email })
        return res.json({ status: 'ok', userData: user })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token hr' })
    }
}

const handleGetProfileByEmail = async(req, res)=>{
    try {
        const email = req.body.email
        const user = await User.findOne({ email: email })
        return res.json({ status: 'ok', userData: user })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token hr' })
    }
}

const handleUpdateProfile = async(req, res)=>{
    try {
        await User.updateOne({ _id: req.body.id }, {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            status: req.body.status,
            occupation: req.body.occupation,
            image: req.body.imageSender,
            skills: req.body.skills
        }).then(() => {
            return res.json({ status: 'ok' })
        })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token hr' })
    }
}
module.exports = {
    handleRegister,
    handleLogin,
    handleGetProfile,
    handleGetProfileByEmail,
    handleUpdateProfile
}