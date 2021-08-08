var shortId = require('shortid');

const AWS = require('aws-sdk');
const config = require('../config/config');

const BUCKET_NAME = 'tn.lebsa.dev';
const IAM_USER_KEY = config.iamUser;
const IAM_USER_SECRET = config.iamSecret;

const uploadImage = async (req, res, next) => {
    console.log(req.file)
    try {

        let s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET,
            Bucket: BUCKET_NAME,
        });
        s3bucket.createBucket(function () {
            var params = {
                Bucket: BUCKET_NAME,
                Key: shortId.generate() + '.png',
                Body: req.file.buffer,
            };
            s3bucket.upload(params, function (err, data) {
                if (err) {
                    console.log('error in callback');
                    console.log(err);
                    return res.json({
                        message: 'aws-error',
                        success: false,
                        err
                    });
                }
                console.log(data);

                return res.json({
                    success: true,
                    image: data.Location
                });

            });
        });

    } catch (error) {
        return res.json({
            success: false,
            message: "server-error"
        })
    }
}

module.exports = {

    uploadImage

}