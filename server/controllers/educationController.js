const express = require('express')
const User = require('../model/user')
const Edu = require('../model/userEduction')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const handleAddEducation = async (req, res) => {
    console.log(req.body);
    try {
        await Edu.create({
            email: req.body.email,
            institution: req.body.institution,
            degree: req.body.degree,
            gpa: req.body.gpa,
            starting: req.body.starting,
            ending: req.body.ending
        })
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', user: false, message: error })
    }
}
const handleGetEducation = async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await Edu.find({ email: email })
        return res.json({ status: 'ok', userData: user })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token hr' })
    }
    //  try {

    //     const userEdu = await Edu.find({ email: req.body.email })
    //     return res.json({ status: 'ok', userData: userEdu })
    // } catch (error) {
    //     console.log(error)
    //     res.json({ status: 'error', error: 'invalid token hr' })
    // }
}
const handleGetEduById = async (req, res) => {
    const id = req.params.id;
    try {
        const userEdu = await Edu.findById(id)
        return res.json({ status: 'ok', userData: userEdu })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token hr' })
    }
}
const handleUpdateEduById = async (req, res) => {
    console.log(req.body);
    const id = req.params.id;
    try {
        await Edu.updateOne({_id: id}, {
            email: req.body.email,
            institution: req.body.institution,
            degree: req.body.degree,
            gpa: req.body.gpa,
            starting: req.body.starting,
            ending: req.body.ending
        }).then(() => {
            return res.json({ status: 'ok' })
        })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token hr' })
    }
}
const handleDeleteEduById=async(req, res)=>{
    const id = req.params.id;
	try {
		await Edu.findByIdAndDelete(id);
		//await edu.remove();
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: error })
	}
}
module.exports = {
    handleAddEducation,
    handleUpdateEduById,
    handleGetEducation,
    handleGetEduById,
    handleDeleteEduById
}