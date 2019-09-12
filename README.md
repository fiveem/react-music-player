# React Music Player

[![npm (scoped)](https://img.shields.io/npm/v/@fiveem/react-music-player.svg)](https://www.npmjs.com/package/@fiveem/react-music-player)

Simple react music player.

## Screenshots

![React Music Player](./docs/captured.gif)


## Install

```
npm i @fiveem/react-music-player
```

## Usage

```JSX
import MusicPlayer from '@fiveem/react-music-player'

<MusicPlayer    playlist={this.state.playlist}
                playClicked={this.playClicked}
                pauseClicked={this.pauseClicked}
                previousClicked={this.previousClicked}
                nextClicked={this.nextClicked}
                backgroundColor={this.backgroundColor}
                activeButtonColor={this.activeButtonColor}
                inactiveButtonColor={this.inactiveButtonColor}
                buttonTextColor={this.buttonTextColor}
                textColor={this.textColor}
                activeTrackColor={this.activeTrackColor}
                progressBarColor={this.progressBarColor} />
```

## API
|name|type|default value|description|
|----|----|-------------|-----------|
|playlist|Array (Required)|[]|The playlist for the music player|
|playClicked|Function||Function that is called when the play button is clicked|
|pauseClicked|Function||Function that is called when the pause button is clicked|
|previousClicked|Function||Function that is called when the previous button is clicked|
|nextClicked|Function||Function that is called when the next button is clicked|
|backgroundColor|String|`#fcfcfc`|Background color of the music player|
|inactiveButtonColor|String|`#8a8a8a`|Color of the inactive buttons (the inactive button are the next and previous buttons)|
|buttonTextColor|String|`#000`|Color of the text/icon that is displayed on the buttons|
|textColor|String|`#000`|Color of the music player text|
|activeTrackColor|String|`#f0f0f0`|Highlight color of the active track|
|progressBarColor|String|`#111111`|Color of the progress bar|

### JSON

```
const playlist = [
    {
        name: 'One Last Time',
        author: 'South London HiFi',
        image: 'theImage',
        file: 'file_name.mp3'
    }, {
        name: 'Sunshine Samba',
        author: 'Chris Haugen',
        image: 'theImage',
        file: 'file_name.mp3'
    }, 
]
```

## License

react-music-player is released under the MIT license.
