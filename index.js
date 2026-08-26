const through = require('through2')
const split = require('split2')
const { EOL } = require('os')
const stringify = require('json-stringify-safe')

module.exports.stringify = (opts) =>
  through.obj(opts, (obj, _, cb) => {
    cb(null, stringify(obj) + EOL)
  })

module.exports.parse = (opts) => {
  opts = opts || {}
  opts.strict = opts.strict !== false
  let line = 0

  function parseRow (row) {
    line += 1
    if (!row || !row.trim()) return

    try {
      const value = JSON.parse(row)
      parser.ok.push(value)
      return value
    } catch (e) {
      if (opts.strict) {
        const error = {line, message: e.message}
        parser.errors.push(error)
        parser.emit('error', error)
      }
    }
  }

  const parser = split(parseRow, opts)
  parser.ok = []
  parser.errors = []
  parser.on('error', () => {})
  return parser
}