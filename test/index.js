const test = require('tape')
const os = require('os')
const concat = require('concat-stream')
const ndj = require('../')

function collect (input, opts, callback) {
  const parser = ndj.parse(opts)
  const records = []
  const errors = []

  parser.on('data', function (record) {
    records.push(record)
  })
  parser.on('error', function (error) {
    errors.push(error)
  })
  parser.on('end', function () {
    callback(records, errors)
  })
  parser.end(input)
}

test('.parse', function(t) {
  const parser = ndj.parse()
  parser.on('data', function(obj) {
    t.equal(obj.hello, 'world')
    t.end()
  })

  parser.end('{"hello": "world"}\n')
})

test('.parse twice', function(t) {
  const parser = ndj.parse()
  parser.once('data', function(obj) {
    t.equal(obj.hello, 'world')
    parser.once('data', function(obj) {
      t.equal(obj.hola, 'mundo')
      t.end()
    })
  })

  parser.end('{"hello": "world"}\n{"hola": "mundo"}\n')
})

test('.parse - strict:true error', function (t) {
  const parser = ndj.parse({strict: true})
  parser.once('error', function (error) {
    t.equal(error.line, 1, 'reports the malformed line')
    t.ok(error.message, 'reports an error message')
  })
  parser.end('{"no":"json"\n')
  t.end()
})

test('.parse - strict:true error event', function (t) {
  const parser = ndj.parse({strict: true})
  parser.on('error', function (err) {
    t.pass('error event called')
    t.end()
  })
  parser.end('{"no":"json"\n')
})

test('.parse - strict:false error', function (t) {
  const parser = ndj.parse({strict: false})
  parser.once('data', function (data) {
    t.ok(data.json, 'parse second one')
    t.end()
  })
  parser.end('{"json":false\n{"json":true}\n')
})

test('.parse challenge cases - valid, blank, and whitespace-only lines', function (t) {
  collect('{"id":1}\n\n  \t\n{"id":2}\n', {}, function (records, errors) {
    t.deepEqual(records, [{id: 1}, {id: 2}], 'parses valid records and skips blank lines')
    t.deepEqual(errors, [], 'blank lines do not produce errors')
    t.end()
  })
})

test('.parse challenge cases - malformed lines and trailing commas', function (t) {
  collect('{"id":1}\nINVALID JSON\n{"name":"Alice",}\n{"id":2}\n', {}, function (records, errors) {
    t.deepEqual(records, [{id: 1}, {id: 2}], 'preserves records before and after errors')
    t.equal(errors.length, 2, 'reports each malformed line')
    t.deepEqual(errors.map(function (error) { return error.line }), [2, 3], 'reports original 1-based line numbers')
    t.ok(errors[0].message, 'reports a useful invalid JSON reason')
    t.ok(errors[1].message, 'reports a useful trailing comma reason')
    t.end()
  })
})

test('.parse challenge cases - multiple malformed lines', function (t) {
  collect('bad one\n{"id":1}\nbad two\n{"id":2}\n', {}, function (records, errors) {
    t.deepEqual(records, [{id: 1}, {id: 2}], 'continues through multiple malformed lines')
    t.deepEqual(errors.map(function (error) { return error.line }), [1, 3], 'keeps physical line numbers')
    t.end()
  })
})

test('.parse challenge cases - empty input', function (t) {
  collect('', {}, function (records, errors) {
    t.deepEqual(records, [], 'returns no records')
    t.deepEqual(errors, [], 'returns no errors')
    t.end()
  })
})

test('.parse challenge cases - CRLF input', function (t) {
  collect('{"id":1}\r\n\r\ninvalid\r\n{"id":2}\r\n', {}, function (records, errors) {
    t.deepEqual(records, [{id: 1}, {id: 2}], 'supports CRLF and preserves valid records')
    t.equal(errors.length, 1, 'reports the malformed CRLF line')
    t.equal(errors[0].line, 3, 'uses the original CRLF line number')
    t.end()
  })
})

test('.stringify', function(t) {
  const serializer = ndj.stringify()
  serializer.pipe(concat(function(data) {
    t.equal(data, '{"hello":"world"}' + os.EOL)
    t.end()
  }))
  serializer.write({hello: 'world'})
  serializer.end()
})

test('.stringify circular', function(t) {
  const serializer = ndj.stringify()
  serializer.pipe(concat(function(data) {
    t.equal(data, '{"obj":"[Circular ~]"}' + os.EOL)
    t.end()
  }))
  const obj = {}
  obj.obj = obj
  serializer.write(obj)
  serializer.end()
})
