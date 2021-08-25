const Category = require('../models/CategoryModel')

const readCategories = async (req, res, next) => {

  try {

    const categories = await Category.find({}).sort({ __v: 1 })


    if (!categories) return res.json({
      success: false,
      message: "categories-not-found"
    })

    return res.json({ success: true, categories: categories });

  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: "server-error"
    })
  }

}




module.exports = {
  readCategories,
}