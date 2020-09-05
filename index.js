const ffmpeg = require('fluent-ffmpeg')
const path = require('path')

const mixdown = async (opts) => {
  return new Promise((resolve, reject) => {
    const filters = [
    ]
    let stage = 1

    // trim - 0 - inf
    if (opts.trim) {
      filters.push({
        inputs: [stage.toString()],
        filter: 'atrim',
        options: { start: opts.trim },
        outputs: [(++stage).toString()]
      })
    }

    // noise gate - on or off
    if (opts.gate) {
      filters.push({
        inputs: [stage.toString()],
        filter: 'agate',
        options: { mode: 'downward' },
        outputs: [(++stage).toString()]
      })
    }

    // compression - on or off
    if (opts.compress) {
      filters.push({
        inputs: [stage.toString()],
        filter: 'acompressor',
        options: { mode: 'downward' },
        outputs: [(++stage).toString()]
      })
    }

    // volume - 0 to 1
    if (typeof opts.volume === 'number') {
      filters.push({
        inputs: [stage.toString()],
        filter: 'volume',
        options: { volume: opts.volume },
        outputs: [(++stage).toString()]
      })
    }

    // treble - -1 to +1
    if (opts.treble) {
      filters.push({
        inputs: [stage.toString()],
        filter: 'treble',
        options: { gain: opts.treble * 20 },
        outputs: [(++stage).toString()]
      })
    }

    // bass - -1 to +1
    if (opts.bass) {
      filters.push({
        inputs: [stage.toString()],
        filter: 'bass',
        options: { gain: opts.bass * 20 },
        outputs: [(++stage).toString()]
      })
    }

    // extrastereo - on or off
    if (opts.extrastereo) {
      filters.push({
        inputs: [stage.toString()],
        filter: 'extrastereo',
        options: { },
        outputs: [(++stage).toString()]
      })
    }

    // pan -1 to +1
    if (opts.pan) {
      filters.push({
        inputs: [stage.toString()],
        filter: 'stereotools',
        options: { mpan: opts.pan },
        outputs: [(++stage).toString()]
      })
    }

    // reverb
    if (opts.reverb) {
      filters.push({
        inputs: [stage.toString()],
        filter: 'asplit',
        options: { },
        outputs: ['dry1', 'dry2']
      })
      filters.push({
        inputs: ['dry1', '0'],
        filter: 'afir',
        options: { dry: 10, wet: 10 },
        outputs: ['wet']
      })
      filters.push({
        inputs: ['dry2', 'wet'],
        filter: 'amix',
        options: { inputs: 2, weights: '1 ' + opts.reverb },
        outputs: [(++stage).toString()]
      })
    }

    // run the command
    ffmpeg()
      .input(path.join(__dirname, 'hall.wav'))
      .input(opts.input)
      .complexFilter(filters, stage.toString())
      .output(opts.output)
    //      .on('start', console.log)
      .on('error', reject)
      .on('end', resolve)
      .run()
  })
}

module.exports = {
  mixdown
}
