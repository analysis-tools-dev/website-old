import express, { RequestHandler } from "express"
import * as endpoints from "./functions"

if (!process.env.KEY_FILENAME) {
  console.error(
    "Please set KEY_FILENAME environment variable. It should point to the gcp json key"
  )
}

const app: express.Application = express()

// this is useful in the dev environment. It exposes all cloud functions on localhost:3000/function_name
Object.entries(endpoints).forEach(([path, cb]) => {
  app.get(`/${path}`, cb as RequestHandler)
})

app.listen(3000, function () {
  console.log("Available calls:")
  Object.entries(endpoints).forEach(([path, cb]) => {
    console.log(`* http://localhost:3000/${path}`)
  })
})
