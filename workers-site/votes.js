module.exports.upVote = function (id) {
  const key = encodeURIComponent(`upvotes_${params[2]}`)
  let vote = await votes.get(key)
  await votes.put(key, parseInt(vote, 10) + 1)
  return true
}

module.exports.downVote = function (id) {
  const key = encodeURIComponent(`downvotes_${params[2]}`)
  let vote = await votes.get(key)
  await votes.put(key, parseInt(vote, 10) + 1)
  return true
}

module.exports.getVotes = function (id) {
  const upVotesKey = encodeURIComponent(`upvotes_${params[2]}`);
  const downVotesKey = encodeURIComponent(`upvotes_${params[2]}`);
  let data = {
    upVotes: await votes.get(upVotesKey),
    downVotes: await votes.get(downVotesKey),
  }
  data.sum = parseInt(data.upVotes,10) - parseInt(data.downVotes, 10);
  return data;
}