module.exports.upVote = async function (id) {
  const key = encodeURIComponent(`upvotes_${id}`)
  let vote = await votes.get(key)
  await votes.put(key, vote * 1 + 1)
  return true
}

module.exports.downVote = async function (id) {
  const key = encodeURIComponent(`downvotes_${id}`)
  let vote = await votes.get(key)
  await votes.put(key, vote * 1 + 1)
  return true
}

module.exports.getVotes = async function (id) {
  const upVotesKey = encodeURIComponent(`upvotes_${id}`)
  const downVotesKey = encodeURIComponent(`upvotes_${id}`)
  let data = {
    upVotes: parseInt((await votes.get(upVotesKey)) * 1, 10),
    downVotes: parseInt((await votes.get(downVotesKey)) * 1, 10),
  }
  data.sum = parseInt(data.upVotes, 10) - parseInt(data.downVotes, 10)
  return data
}
