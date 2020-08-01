import { PubSub } from "@google-cloud/pubsub"
import { Firestore } from "@google-cloud/firestore"
import { v4 as uuidv4 } from "uuid"

const prefix = process.env.PREFIX ?? "dev"
const pubsub = new PubSub({ keyFilename: process.env.KEY_FILENAME })
const firestore = new Firestore()

export enum VoteType {
  Up = "UP",
  Down = "DOWN",
}

export class Vote {
  public type: VoteType
  public tag: string
  public date: Date
  public ip: string

  public constructor(type: VoteType, tag: string, ip: string) {
    if (tag === "") {
      throw new Error("Tag can not be empty")
    }
    this.type = type
    this.tag = tag
    this.date = new Date()
    this.ip = ip
  }
}

export const PublishVote = async (
  type: VoteType,
  tag: string,
  ip: string
): Promise<boolean> => {
  const vote = new Vote(type, tag, ip)
  await pubsub
    .topic(`${prefix}-votes`)
    .publish(Buffer.from(JSON.stringify(vote)))
  return true
}

export interface VotesSummary {
  tag: string
  upVotes: number
  downVotes: number
  sum: number
}

export const getVotesList = async () => {
  const tags = await firestore.collection("tags").get()
  return tags.docs
    .map((x: FirebaseFirestore.QueryDocumentSnapshot) => {
      let data = x.data()
      return {
        tag: x.id,
        upVotes: data.upVotes,
        downVotes: data.downVotes,
        sum: data.sum,
      } as VotesSummary
    })
    .reduce((result: { [k: string]: VotesSummary }, i: VotesSummary) => {
      result[i.tag] = i
      return result
    }, {})
}

export const storeVote = async (vote: Vote) => {
  const doc = firestore
    .collection(`tags`)
    .doc(vote.tag)
    .collection("votes")
    .doc(uuidv4())
  await doc.set({
    type: vote.type,
    date: vote.date,
    ip: vote.ip,
  })
}

export const recalculateTagStatistics = async (tag: string) => {
  let upVotes = 0,
    downVotes = 0

  const doc = firestore.collection("tags").doc(tag)
  const allVotesSnapshot = await doc.collection("votes").get()
  allVotesSnapshot.forEach(voteDoc => {
    const v = voteDoc.data() as Vote
    switch (v.type) {
      case VoteType.Up:
        upVotes++
        break
      case VoteType.Down:
        downVotes++
        break

      default:
        throw new Error(`Unknown vote type ${v.type}`)
    }
  })
  await doc.set({
    upVotes,
    downVotes,
    sum: upVotes - downVotes,
  })
}
