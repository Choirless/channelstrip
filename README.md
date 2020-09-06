# channelstrip

An audio manipulation library that behaves like a channel strip on an audio mixing desk

![](https://github.com/choirless/channelstrip/raw/master/channelstrip.png)

It allows the following effects to be applied in this order:

- `trim` - number (seconds) - the amount of audio to be trimmed from the start of the file (default: 0)
- `gate` - boolean - whether to apply a noise gate (default: false)
- `compress` - boolean - whether to compress the dynamic range (default: false)
- `volume` - number - volume level: 0=silence 1=unchanged (default: 1)
- `treble` - number - treble adjustment: -1 to +1 (default: 0)
- `bass` - number - bass adjustment: -1 to +1 (default: 0)
- `extrastereo` - boolean - adds stereo effect (default: 0)
- `pan` - number - stereo pan: -1=left 0=middle +1=right (default: 0)
- `reverb` - number - amount of reverb effect to apply 0=none 1=lots (default: 0)

## Installing

Add `channelstrip` to your Node.js project:

```sh
npm install --save channelstrip
```

> Note: You must have ffmpeg installed on the target system. If you want to install ffmpeg via npm then you can additionally do `npm install --save ffmpeg-static`.

## Using

Include the library in your code:

```js
const channelstrip = require('channelstrip')
```

Process an audio file with the `mixdown` function:

```js
await channelstrip.mixdown({
  input: 'myaudio.wav',
  output: 'out.wav',
  gate: true,
  compress: true,
  pan: -0.25,
  treble: -0.1,
  bass: 0.8,
  extrastereo: false,
  volume: 1.2,
  trim: 0.1,
  reverb: 0.2
})
```

- `input` - the path, URL or Node.js ReadStream of the input audio
- `output` - the path, or Node.js WriteStream of the output audio

e.g

```js
await channelstrip.mixdown({
  input: 'https://mydomain.com/test.wav',
  output: 'out.wav',
  gate: true,
  reverb: 0.25
})
```

Many file formats are supported, with the file extension indicating the file type:

```js
const rs = fs.createReadStream('./test.ogg')
await channelstrip.mixdown({
  input: rs,
  output: 'out.mp3',
  volume: 0.6,
  bass: 1.1
})
```