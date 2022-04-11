const Posts = require('../models/posts');
const Op = require('sequelize');
const { type } = require('express/lib/response');
const { is } = require('bluebird');
exports.createPost = async(req,res)=> {
    const {body} = req
    const data = await Posts.findAll({})
    body.id = data.length + 1

    if(body.isPublished) {
        body.publishedDate = new Date().getTime()
    }

    const newPost = await Posts.create(body)

    return res.status(201).json(newPost)
}

exports.getAllPosts = async(req,res)=> {
    const {author,isPublished} = req.query;
    // const isBoolean = (isPublished === 'true' || isPublished === 'false')
    let data = []

    

    if(author && isPublished === 'true') {
        console.log(author,isPublished === 'true')
        data = await Posts.findAll({
            where: {
                author,
                isPublished: (isPublished === 'true')
            }
        })
    }



    else if(author && isPublished === 'false') {

        console.log(`//////////////////////////`)
        console.log(author,isPublished)
        console.log(`//////////////////////////`)
        data = await Posts.findAll({
            
            where:{
                 author,
                isPublished: false
            }
        })


        console.log(`//////////////////////////`)
        console.log(data)
        console.log(`//////////////////////////`)
    } 


    else if(author) {
        data = await Posts.findAll({
            where: {
                author,
            }
        })
    }




  
 

    else if(isPublished === 'false') {
        data = await Posts.findAll({
            where: {
                author
            }
        })
    }
    // else if(!isBoolean) {
    //     data = await Posts.findAll({
    //         order: [ ['id', 'ASC'],],
    //     })
    // } 

        else {
            data = await Posts.findAll({
                order: [ ['id', 'ASC'],],
            })
        }
    

        return res.status(200).json(data)
}

exports.getPostById = async(req,res)=> {
    const id = req.params.id
    const foundPost = await Posts.findOne({id})

    if(!foundPost) {
        return res.status(404).send(`ID not found`)
    }

    return res.status(200).json(foundPost)
}
exports.deletePost = async(req,res)=> {
    return res.sendStatus(405)
}

exports.patchPost = async(req,res)=> {
    return res.sendStatus(405)
}

exports.putPost  = async(req,res)=> {
    return res.sendStatus(405)
}
