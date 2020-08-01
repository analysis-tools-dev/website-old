import express from "express"
import { VoteType, PublishVote } from "../models/vote"
import { getIp } from "../utils/getIp"

export const voteDown = async (req: express.Request, res: express.Response) => {
  try {
    await PublishVote(VoteType.Down, req.query.tag as string, getIp(req))
    res.send(JSON.stringify({ status: "OK" }))
  } catch (err) {
    res.status(501).send({ status: "Error", error: err })
  }
}
