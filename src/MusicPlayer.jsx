import React from 'react';
import PropTypes from 'prop-types';

import Audio from './components/Audio';
import Controls from './components/Controls';
import Track from './components/Track';
import Progress from './components/Progress';
import convertSeconds from './utils';

import './index.css';
import style from './MusicPlayer.css';

export default class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTrack: 0,
            showPauseButton: false,
            showPlaylist: true,
            timePlayed: '',
            showMuteVolume: false,
            volumePercent: 0.5,
        };
        this.playTimer = 0;
        this.playPercent = 0;
        
        this.onPlayClicked = this.onPlayClicked.bind(this);
        this.onPauseClicked = this.onPauseClicked.bind(this);
        this.onPreviousClicked = this.onPreviousClicked.bind(this);
        this.onNextClicked = this.onNextClicked.bind(this);
        this.onToggleShowPlaylist = this.onToggleShowPlaylist.bind(this);
        this.onToggleShowMuteVolume = this.onToggleShowMuteVolume.bind(this);
    }

    componentDidMount() {
        this.audioRef.volume = this.state.volumePercent;
        this.setState((state) => ({
             volumePercent: (state.volumePercent * 100 / this.volumeContainerRef.offsetWidth).toFixed(1)
        }), () => this.volumeRef.style.width = this.state.volumePercent * 100 + '%');

        this.audioRef.addEventListener('loadedmetadata', this.onMetaDataLoaded.bind(this));
        this.audioRef.addEventListener('ended', this.onEnd.bind(this));
        this.audioRef.addEventListener('playing', this.onPlaying.bind(this));
        this.audioRef.addEventListener('pause', this.onPause.bind(this));
        this.progressContainerRef.addEventListener('click', this.onProgressBarClicked.bind(this));
        this.volumeContainerRef.addEventListener('click', this.onVolumeContainerClicked.bind(this));
    }

    onProgressBarClicked(e) {
        this.playPercent = e.offsetX / this.progressContainerRef.offsetWidth;
        this.setState({
            timePlayed: `${convertSeconds(this.playPercent * this.audioRef.duration)} / ${convertSeconds(this.audioRef.duration)}`
        });
        this.audioRef.currentTime = this.playPercent * (this.audioRef.duration || 0);
        if(this.progressRef) {
            this.progressRef.style.width = (this.playPercent / 100) + '%';
        }
    }

    onVolumeContainerClicked(e) {
        const percent = (e.offsetX * 100 / this.volumeContainerRef.offsetWidth).toFixed(1);
        this.setState({
            volumePercent: percent / 100
        });
        this.volumeRef.style.width = percent + '%';
        this.audioRef.volume = percent / 100;
    }

    onMetaDataLoaded() {
        this.setState({
            timePlayed: `${convertSeconds(this.audioRef.currentTime)} / ${convertSeconds(this.audioRef.duration)}`
        });
    }

    onEnd() {
        this.resetValues();
        this.setState((state) => ({
            activeTrack: state.activeTrack + 1,
            timePlayed: 0,
            showPauseButton: true
        }), () => this.audioRef && this.audioRef.play())
    }

    onPlaying(e) {
        this.duration = e.target.duration;
        this.advance();
        this.setState({
            showPauseButton: true,
        });
    }

    onPause() {
        clearTimeout(this.playTimer);
        this.setState({
            showPauseButton: false
        });
    }

    startTimer() {
        if(this.playPercent < 100) {
            this.playTimer = setTimeout(() => this.advance(), 100);
        }
    }
   
    advance() {
        const { progressBarColor } = this.props;
        const increment = 10 / this.duration;

        this.setState({
            timePlayed: `${convertSeconds(this.audioRef.currentTime)} / ${convertSeconds(this.audioRef.duration || 0)}`
        });

        this.playPercent = Math.min(increment * this.audioRef.currentTime * 10, 100);
        this.progressRef.style.backgroundColor = progressBarColor || '';
        this.progressRef.style.width = this.playPercent + '%';
        this.startTimer(this.duration);
    }

    onPlayClicked() {
        this.audioRef && this.audioRef.play();
        this.props.playClicked && this.props.playClicked(this.state.activeTrack);
    }

    onPauseClicked() {
        this.audioRef && this.audioRef.pause();
        this.props.pauseClicked && this.props.pauseClicked(this.state.activeTrack);
    }

    onPreviousClicked() {
        this.resetValues();
        this.setState((state) => ({
                activeTrack: state.activeTrack - 1,
                timePlayed: ''

            }),
            () => this.audioRef && this.audioRef.play()
        );
        this.props.previousClicked && this.props.previousClicked();
    }

    onNextClicked() {
        this.resetValues();
        this.setState((state) => ({
                activeTrack: state.activeTrack + 1,
                timePlayed: ''
            }),
            () => this.audioRef && this.audioRef.play()
        );
        this.props.nextClicked && this.props.nextClicked();
    }

    onTrackClicked(index) {
        this.resetValues();
        this.setState(
            {
                activeTrack: index,
                timePlayed: ''
             },
            () => this.audioRef && this.audioRef.play()
        );
    }

    onToggleShowPlaylist() {
        this.setState((state) => ({
            showPlaylist: !state.showPlaylist
        }))
    }

    onToggleShowMuteVolume() {
        this.setState((state) => ({
            showMuteVolume: !state.showMuteVolume,
        }), () => {
            if(this.state.showMuteVolume) {
                this.audioRef.volume = 0;
            } else {
               this.audioRef.volume = this.state.volumePercent; 
            }
        });
    }

    resetValues() {
        clearTimeout(this.playTimer);
        this.playPercent = 0;
    }


    componentWillUnmount() {
        this.audioRef.removeEventListener('loadedmetadata', this.onMetaDataLoaded);
        this.audioRef.removeEventListener('ended', this.onEnd);
        this.audioRef.removeEventListener('playing', this.onPlaying);
        this.audioRef.removeEventListener('paused', this.onPause);
        this.progressContainerRef.removeEventListener('click', this.onProgressBarClicked);
        this.volumeContainerRef.removeEventListener('click', this.onVolumeContainerClicked);
    }

    render() {
        const audio =  this.props.playlist[this.state.activeTrack];
        const playlistLength = this.props.playlist.length;
        const { showPlaylist } = this.state;
        const { backgroundColor, activeButtonColor, inactiveButtonColor, buttonTextColor, textColor } = this.props;

        return (
            <div className={style.container} style={{backgroundColor: backgroundColor || '', color: textColor || ''}}>
                <div className={style.topContainer}>
                    <div className={style.topContainerImage} style={{ backgroundImage: `url(${audio.image})`}} />
                    <div className={style.trackInfo}>
                        <p>{audio.name}</p>
                        <p><small>{audio.author}</small></p>
                    </div>
                    <Audio audioRef={ref => this.audioRef = ref} audio={audio}/>
                    <Controls
                        playlistLength={playlistLength}
                        activeTrack={this.state.activeTrack}
                        showPauseButton={this.state.showPauseButton}
                        onPlayClicked={this.onPlayClicked}
                        onPauseClicked={this.onPauseClicked}
                        onPreviousClicked={this.onPreviousClicked}
                        onNextClicked={this.onNextClicked}
                        activeButtonColor={activeButtonColor || ''}
                        inactiveButtonColor={inactiveButtonColor || ''}
                        buttonTextColor={buttonTextColor || ''}
                    />
                </div>

                {this.renderBottomContainer(playlistLength)}
                {this.renderProgress()}

                {playlistLength > 1 && showPlaylist?
                    <div className={style.list}>
                        {this.renderList()}
                    </div>
                    :
                    null
                }
            </div>
        )
    }

    renderBottomContainer(playlistLength) {
        const { timePlayed, showPlaylist } = this.state;
        const { activeButtonColor, buttonTextColor } = this.props;

        return (
            <div className={style.bottomContainer}>
                <small>{timePlayed}</small>
                <div className={style.volumeControl}>
                    <button onClick={this.onToggleShowMuteVolume}>
                        {this.state.showMuteVolume ?
                            <i className="fa fa-volume-off"></i>
                            :
                            <i className="fa fa-volume-up" />
                        }
                    </button>
                    {this.renderVolume()}
                </div>

                {playlistLength > 1 ?
                        <button className={style.controlButton} onClick={this.onToggleShowPlaylist} style={{ backgroundColor: activeButtonColor, color: buttonTextColor }}>
                        {showPlaylist ?
                            <i className="fa fa-caret-up" />
                            :
                            <i className="fa fa-caret-down" />
                        }
                        
                    </button>
                    :
                    null
                }
            </div>
        )
    }

    renderList() {
        const { activeTrackColor } = this.props;

        return ( 
            this.props.playlist.map((audio, index) => 
                <React.Fragment key={index}>
                    <Track title={audio.name}
                            subtitle={audio.author}
                            image={audio.image}
                            active={index === this.state.activeTrack}
                            activeTrackColor={activeTrackColor || ''}
                            onClick={this.onTrackClicked.bind(this, index)} />
                </React.Fragment>
            )
        )
    }

    renderProgress() {
        return (
            <Progress progressContainerRef={ref => this.progressContainerRef = ref} progressRef={ref => this.progressRef = ref} />
        )
    }

    renderVolume() {
        return (
            <Progress progressContainerRef={ref => this.volumeContainerRef = ref} progressRef={ref => this.volumeRef = ref} />
        )
    }
}

MusicPlayer.propTypes = {
    playlist: PropTypes.array.isRequired,
    playClicked: PropTypes.func,
    pauseClicked: PropTypes.func,
    previousClicked: PropTypes.func,
    nextClicked: PropTypes.func,
    backgroundColor: PropTypes.string,
    activeButtonColor: PropTypes.string,
    inactiveButtonColor: PropTypes.string,
    buttonTextColor: PropTypes.string,
    textColor: PropTypes.string,
    activeTrackColor: PropTypes.string,
    progressBarColor: PropTypes.string
}