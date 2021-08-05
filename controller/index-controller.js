const express = require('express');


exports.welcome = (req,res)=>{
    res.render('welcome')
    return
}

exports.dash = (req,res)=>{


    res.render('dashboard',{
        name:req.user.name
    })
    return
}
