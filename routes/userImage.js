const express = require("express")
const router = new express.Router()
const multer = require("multer")
const { uploadToS3 } = require("../helpers")
const { addImageContextData, getImageData } = require("../db/models/userImages")
const uploadFile = multer()
const OpenAI = require("openai")

const openAI = async (imageUrl) => {
    const openai = new OpenAI({
        apiKey: process.env.OPEN_AI,
    });
    const prompt = `
    You are a jewellery product catalog expert.
       From this image, extract:
       1. Category
       2. Short product title
       3. Description (1–2 sentences)
       4. Stone count (if visible, else "Unknown")
       Return valid JSON: { category, title, description, stone_count }
     `
    const aiRes = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: prompt },
                    {
                        type: "image_url",
                        image_url: { url: imageUrl.url, detail: "low" }
                    }
                ]
            }
        ]
    })
    console.log("hhhhh", aiRes.choices[0].message.content)
    const aiContent = aiRes.choices[0].message.content.replace(/```json|```/g, "").trim()
    return JSON.parse(aiContent)
}

router.post("/upload", uploadFile.single("image"), async (req, res) => {
    console.log("---------------", req.file)

    if (!req.file) {
        return res.json({ result: false, value: "Image is required" })
    }
    console.log("---------------", req.body)
    const imageUrl = await uploadToS3(req.file)

    const aiContent = await openAI(imageUrl)
    console.log("aiconte", aiContent)
    let object = {
        category: aiContent.category,
        title: aiContent.title,
        description: aiContent.description,
        stone_count: aiContent.stone_count === "Unknown" ? 0 : aiContent.stone_count,
        signedUrl: imageUrl?.url,
    }
    console.log(object);

    const addData = await addImageContextData(object)
    console.log("******************", addData)

    return res.json(addData)
})

router.get("/images", async (req, res) => {
    try {
        let result = await getImageData()
        res.json(result)
    } catch (err) {
        res.json({ resutl: false, value: err })
    }

})

module.exports = router
