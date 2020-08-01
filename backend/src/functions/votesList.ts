import express from "express"
import { getVotesList } from "../models/vote"

export const votesList = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    res.send(JSON.stringify(await getVotesList()))
  } catch (err) {
    res.status(501).send({ status: "Error", error: err })
  }
}
