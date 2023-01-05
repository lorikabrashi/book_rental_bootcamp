module.exports = {
  respond: (res, data, confirm = true) => {
    if (!confirm) {
      return res.status(400).json({ confirm: false, results: data })
    }
    return res.json({ confirm: true, results: data })
  },
}
