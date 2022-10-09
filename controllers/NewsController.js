const Player = require('../models/PlayerModel')
const Category = require('../models/CategoryModel')
const Team = require('../models/TeamModel');
const News = require('../models/NewsModel');
const Arbitre = require('../models/ArbitreModel');
const Designation = require('../models/DesignationModel');


const shortId = require('shortid')
const AWS = require('aws-sdk')

const contain = (line, number) => {
    for (let i = 0; i < line.length; i++) {
        if (line[i][0] == number || line[i][1] == number) {
            return true;
        }
    }
    return false;
}


const addNews = async (req, res, next) => {
    const s3bucket = new AWS.S3({
        accessKeyId: process.env.IAM_USER_KEY,
        secretAccessKey: process.env.IAM_USER_SECRET,
        Bucket: process.env.BUCKET_NAME,
    });
    let images = []
    if (req.files && req.files[0]) {

        for (const file of req.files) {
            let name = `${shortId.generate()}`
            try {
                if (req.files) {
                    name = `${shortId.generate()}_${file.originalname.split('.').slice(0, -1)}`
                } else {
                    name = `${shortId.generate()}_${req.body.url.split('/').slice(-1)}`
                }
            } catch (error) {
                console.log(error)
            }
            console.log(name)
            let link = ""
            let params = {}

            var FileBuffer = file.buffer

            params = {
                Bucket: process.env.BUCKET_NAME,
                Key: `${name.replace(/[^a-zA-Z0-9 ]/g, "")}.${file.originalname.split('.').slice(-1)[0]}`,
                Body: FileBuffer,
            };
            var s3upload = s3bucket.upload(params).promise();

            var data = await s3upload
            console.log(data.Location)

            link = data.Location

            images.push(link)
        }


    }



    const title = req.body.title;
    const content = req.body.content;
    const date = req.body.date;
    const isPublic = req.body.isPublic;

    let news = new News({
        title: title,
        content: content,
        date: date,
        isPublic: isPublic,
        images
    })

    news.save();

    res.json({
        success: true,
        // newMatch: newMatch
    })

    return;
}



const editNews = async (req, res, next) => {


    const title = req.body.title;
    const content = req.body.content;
    const date = req.body.date;
    const isPublic = req.body.isPublic;


    let news = await News.findOneAndUpdate({ _id: req.body.id }, {
        isPublic
    })

    // category: category,
    // type: type,
    // gender: gender,
    // phase1: [...players1[0], ...players2[0], ...players3[0], ...players4[0], ...players5[0], ...players6[0], ...players7[0], ...players8[0]],
    // phase2: [...players1[1], ...players2[1], ...players3[1], ...players4[1], ...players5[1], ...players6[1], ...players7[1], ...players8[1]],
    // phase3: [...players1[2], ...players2[2], ...players3[2], ...players4[2], ...players5[2], ...players6[2], ...players7[2], ...players8[2]]


    // news.save();

    res.json({
        success: true,
        // newMatch: newMatch
    })

    return;
}

const readNewss = async (req, res, next) => {

    try {



        const newss = await News.find({})
            .sort({ createdAt: -1 })
            .exec();

        if (!newss) return res.json({
            success: false,
            message: "Players-not-found"
        })

        return res.json({ success: true, newss: newss });

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "server-error"
        })
    }

}


const deleteNews = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    await News.findByIdAndRemove(id);

    res.json({ message: "News deleted successfully." });
}



module.exports = {
    addNews,
    readNewss,
    deleteNews,
    editNews
}

