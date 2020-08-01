import { Vote } from "../models/vote"
import { storeVote } from "../models/vote"

export const persistVote = async (pubSubEvent: any, context: any) => {
  const message = JSON.parse(
    Buffer.from(pubSubEvent.data, "base64").toString()
  ) as Vote

  if (!message.tag) {
    console.log("Tag is undefined")
    return 1
  }
  if (!("type" in message)) {
    console.log("Vote type is undefined")
    return 1
  }

  await storeVote(message)

  console.log("Vote persisted")
}
