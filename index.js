const Express = require("express")
const Mongoose = require("mongoose")
const BodyParser = require("body-parser")
const Schema = Mongoose.Schema;

var app = Express()
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))

Mongoose.connect("mongodb://127.0.0.1:27017/paella");

app.post("/paella/detail", async(request, response) => {
  const body = request.body
  RecipeModel.findById(body.id)
  .lean()
  .exec((err, arr) => {
    response.json({
      code: 200,
      data: arr
    })
  })
})

app.get("/paella/list", async(request, response) => {
  try {
    var result1 = await HorizontalModel.find().exec()
    response.send(result1)
  }
  catch(err) {
    response.status(500).send(err)
  }
})

app.get("/paella/header", async(request, response) => {
  try {
    var result2 = await HeaderModel.find().exec()
    response.send(result2)
  }
  catch(err) {
    response.status(500).send(err)
  }
})

app.post("/paella/search", async(request, response) => {
  const body = request.body.search_item
  return RecipeModel.find({name: new RegExp(body.trim())})
    .lean()
    .exec((err, q) => {
      return response.send(q)
    })
})

app.listen(3000, () => {
    console.log("//////////////  At port :3000  //////////////")
})

const RecipeModel = Mongoose.model("recipes", {
    name: String,
    ingredient: Array,
    instruction: Schema.Types.Mixed
})

const HorizontalModel = Mongoose.model("horviews", {
    titleData: String,
    key: Number,
    itemData: Schema.Types.Mixed
})

const HeaderModel = Mongoose.model("headers", {
    image_source: String,
    title: String,
    link: String
})
