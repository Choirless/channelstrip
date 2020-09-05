const ffmpeg = require('fluent-ffmpeg')

const processAudio = async (opts) => {

  return new Promise((resolve, reject) => {
    const filters = [
    ]
    
    // trim - 0 - inf
    if (opts.trim) {
      filters.push({
        filter: 'atrim',
        options: { start: opts.trim }
      })
    }

    // noise gate - on or off
    if (opts.gate) {
      filters.push({
        filter: 'agate',
        options: { mode: 'downward' }
      })
    }

    // compression - on or off
    if (opts.compress) {
      filters.push({
        filter: 'acompressor',
        options: { mode: 'downward' }
      })
    }

    // volume - 0 to 1
    if (typeof opts.volume === 'number') {
      filters.push({
        filter: 'volume',
        options: { volume: opts.volume }
      })
    }

    // treble - -1 to +1
    if (opts.treble) {
      filters.push({
        filter: 'treble',
        options: { gain: opts.treble * 20 }
      })
    }

    // bass - -1 to +1
    if (opts.bass) {
      filters.push({
        filter: 'bass',
        options: { gain: opts.bass * 20 }
      })
    }

    // extrastereo - on or off
    if (opts.extrastereo) {
      filters.push({
        filter: 'extrastereo',
        options: { }
      })
    }

    // pan -1 to +1
    if (opts.pan) {
      filters.push({
        filter: 'stereotools',
        options: { mpan: opts.pan }
      })
    }

    // run the command
    var command = ffmpeg()
      .input(opts.input)
      .audioFilter(filters)
      .output(opts.output)
      .on('error', reject)
      .on('end',resolve)
      .run()
  })

}

const main = async () => {
  await processAudio({
    input: '../magnificent/audio/7.wav',
    output: './out.wav',
    gate: false,
    compress: true,
    pan: 0,
    treble: 0,
    bass: 0.8,
    extrastereo: false,
    volume: 1.0,
    trim: 15
  })
}
main()