const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")

const s3 = new S3Client({
    region: process.env.AWS_REGION, credentials: {
        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESSKEY
    }
})

const generatePresignedUrl = async (bucketName, key, expiresIn) => {
    try {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
        });

        const url = await getSignedUrl(s3, command, { expiresIn });
        return { result: true, url };
    } catch (error) {
        console.error(`Error generating pre-signed URL: ${error.message}`);
        return { result: false, error: error };
    }
};

async function uploadToS3(imageFile) {
    console.log("&&&&&&&&&&&&&&7777")
    try {
        const fileKey = `starla-image-${imageFile.originalname}-${Date.now()}`
        const s3Result = await s3.send(new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: fileKey,
            Body: imageFile.buffer,
            ContentType: imageFile.mimetype
        }))
        let signedUrlResult = await generatePresignedUrl(process.env.S3_BUCKET, fileKey, 604800)
        console.log("----------------", signedUrlResult)
        return signedUrlResult;
    } catch (error) {
        return error
    }
}


module.exports = {
    uploadToS3
}