import { PublishVote, VoteType } from "./vote"

describe("PublishVote", () => {
  it("tag can not be empty", async () => {
    expect(PublishVote(VoteType.Up, "", "")).rejects.toEqual(
      new Error("Tag can not be empty")
    )
  })
})
