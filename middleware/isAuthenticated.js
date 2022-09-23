module.exports = function (req, res, next) {
  if (req.session.userId) {
    return next()
  }
  return res.json({ error: "Not Authorized" })
}
