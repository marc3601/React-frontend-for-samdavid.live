import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import PlayButton from './PlayButton';
import ForwardButton from './ForwardButton';
import PauseButton from './PauseButton';
import VolumeLogo from './VolumeLogo';
import MutedLogo from './MutedLogo';
import TrackSymbol from './TrackSymbol';
import Equilizer from './Equilizer';
import TrackLoading from './TrackLoading';
import RewindButton from './RewindButton';

const MusicPlayer = ({playlist, load, desc}) => {
  const [playIcon, setPlayIcon] = useState(true);
  const [audioDuration, setAudioDuration] = useState('00:00');
  const [currentTime, setCurrentTime] = useState('00:00');
  const [percentage, setPercentage] = useState(0);
  const [activeTrackID, setActiveTrackID] = useState(0);
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const volume = useRef(null);
  const progress = useRef(null);
  const audioRef = useRef();
  useEffect(() => {
    audioRef.current.volume = volume.current.value;
  }, []);

  // Temporary solution to the NaN problem with percentage causing search input range thumb to stay in the middle.
  useEffect(() => {
    if (isNaN(percentage)) {
      setPercentage(0);
    }
  }, [percentage]);

  // Converts audio duration in seconds to 00:00 format.
  const convertAudioDuration = (convert) => {
    var minutes = '0' + Math.floor(convert / 60);
    var seconds = '0' + Math.floor(convert - minutes * 60);
    var dur = minutes.substr(-2) + ':' + seconds.substr(-2);
    return dur;
  };

  // Allows user to seek through the audio track.
  const onChange = (e) => {
    const audio = audioRef.current;
    if (!loading) {
      audio.currentTime = (audio.duration / 100) * e.target.value;
      setPercentage(e.target.value);
    }
  };

  // Sets the value of the current time of the track to be displayed in the player.
  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(convertAudioDuration(time.toFixed(2)));
  };

  // Handles track choice with the click or touch.
  const handleTrackChoice = (e) => {
    setActiveTrackID(parseInt(e.currentTarget.id));

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          if (playIcon) {
            setPlayIcon(!playIcon);
          }
          audioRef.current.play();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Handles track choice buttons.
  const handleTrackRewind = () => {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          if (playIcon) {
            setPlayIcon(!playIcon);
          }
          audioRef.current.play();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <PlayerWrapper>
      <Player>
        <Timer>
          <div className="elapsed">{currentTime}</div>
          <div className="total">{audioDuration}</div>
        </Timer>
        <ProgressBar>
          <Input
            ref={progress}
            percentage={String(percentage)}
            onChange={onChange}
          />
        </ProgressBar>
        <PlayerControls>
          <Control
            onClick={() => {
              if (!load && playlist.length > 0) {
                if (activeTrackID === 0) {
                  setActiveTrackID(playlist.length - 1);
                  handleTrackRewind();
                } else {
                  setActiveTrackID(activeTrackID - 1);
                  handleTrackRewind();
                }
              }
            }}
          >
            <RewindButton />
          </Control>
          <Control
            onClick={() => {
              if (!load && playlist.length > 0) {
                setPlayIcon(!playIcon);
                if (playIcon) {
                  audioRef.current.play();
                } else {
                  audioRef.current.pause();
                }
              }
            }}
          >
            {playIcon ? <PlayButton /> : <PauseButton />}
          </Control>
          <Control
            onClick={() => {
              if (!load && playlist.length > 0) {
                if (activeTrackID < playlist.length - 1) {
                  setActiveTrackID(activeTrackID + 1);
                  handleTrackRewind();
                } else {
                  setActiveTrackID(0);
                  handleTrackRewind();
                }
              }
            }}
          >
            <ForwardButton />
          </Control>
        </PlayerControls>
        <PlayerVolumeWrapper>
          <PlayerVolume>
            <VolumeIcon
              onClick={() => {
                setMuted(!muted);
              }}
            >
              {!muted ? <VolumeLogo /> : <MutedLogo />}
            </VolumeIcon>
            <VolumeSliderContainer>
              <VolumeSlider
                ref={volume}
                onChange={() =>
                  (audioRef.current.volume = volume.current.value)
                }
              ></VolumeSlider>
            </VolumeSliderContainer>
          </PlayerVolume>
        </PlayerVolumeWrapper>

        <SongTitle>
          {!load &&
            playlist.length === 0 &&
            'Playlist empty or content blocked.'}
          {!load &&
            playlist.length > 0 &&
            playlist[activeTrackID ? activeTrackID : 0].name}
        </SongTitle>
        <SongSubTitle>
          {!load && playlist.length === 0 && 'In China consider using VPN.'}
          {!load && playlist.length > 0 && 'Sam David'}
        </SongSubTitle>
      </Player>
      <PlayList>
        <PlaylistHeader>
          <PlaylistTitle>
            {desc ? desc.title : 'Default playlist'}
          </PlaylistTitle>
          <PlaylistInfo>
            {desc ? desc.desc : 'Default description'}
          </PlaylistInfo>
        </PlaylistHeader>

        <PlaylistItems>
          {!load ? (
            playlist.map((track, i) => {
              return (
                <PlaylistTrack
                  isOdd={i % 2 === 0}
                  isActive={activeTrackID === i ? true : false}
                  key={i}
                  id={i}
                  onClick={handleTrackChoice}
                >
                  <TrackIcon>
                    {activeTrackID !== i ? (
                      <TrackSymbol />
                    ) : loading ? (
                      <TrackLoading />
                    ) : (
                      <Equilizer playing={!playIcon} />
                    )}
                  </TrackIcon>
                  <TrackInfo>
                    <TrackTitle>
                      {track.name ? track.name : 'Default'}
                    </TrackTitle>
                    <TrackSubTitle>
                      {track.artist ? track.artist : 'Sam David'}
                    </TrackSubTitle>
                  </TrackInfo>
                  <TrackSubTitle>
                    {track.duration ? track.duration : '00:00'}
                  </TrackSubTitle>
                </PlaylistTrack>
              );
            })
          ) : (
            <center>
              <TrackLoading />
            </center>
          )}
        </PlaylistItems>
      </PlayList>
      <audio
        ref={audioRef}
        onLoadStart={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        onTimeUpdate={getCurrDuration}
        onLoadedData={(e) => {
          setAudioDuration(convertAudioDuration(audioRef.current.duration));
        }}
        onEnded={() => {
          setPlayIcon(!playIcon);
          audioRef.current.currentTime = 0;
        }}
        src={
          !load && playlist.length > 0
            ? playlist[activeTrackID ? activeTrackID : 0].musicSrc
            : ''
        }
        onWaiting={() => setLoading(true)}
        muted={muted}
      />
    </PlayerWrapper>
  );
};

export default MusicPlayer;

const PlayerWrapper = styled.section`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  -webkit-box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
  margin-bottom: 4rem;
`;

const Player = styled.section`
  background: rgb(201 201 206);
  background: -moz-radial-gradient(
    circle,
    rgb(207 206 217) 0%,
    rgb(134 137 147) 100%
  );
  background: -webkit-radial-gradient(
    circle,
    rgb(207 206 217) 0%,
    rgb(134 137 147) 100%
  );
  background: radial-gradient(
    circle,
    rgb(207 206 217) 0%,
    rgb(134 137 147) 100%
  );
`;

const PlayList = styled.aside``;

const Timer = styled.div`
  background: black;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  color: white;
`;

const ProgressBar = styled.div`
  margin-top: -1rem;
  line-height: 1em;
  overflow: hidden;
  padding: 6px 0;
`;

const Input = styled.input.attrs((props) => ({
  type: 'range',
  min: 0,
  max: 100,
  step: 0.1,
  value: props.percentage,
}))`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #f2f2f2;
  height: 8px;
  position: relative;
  width: 100%;
  font-family: sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  outline: none;
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #000000;
    height: 16px;
    width: 16px;
    border-radius: 3px;
    background: black;
    cursor: pointer;
  }

  ::-moz-range-thumb {
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
    border: 1px solid #000000;
    height: 16px;
    width: 16px;
    border-radius: 3px;
    background: black;
    cursor: pointer;
  }

  ::-ms-thumb {
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
    border: 1px solid #000000;
    height: 16px;
    width: 16px;
    border-radius: 3px;
    background: black;
    cursor: pointer;
  }
`;

const PlayerControls = styled.ul`
  display: flex;
  list-style: none;
  padding: 0.7rem 2rem;
  justify-content: space-between;
  box-shadow: 0px 4px 3px 0px #1f03032e;
  @media (max-width: 579px) {
    padding: 0.4rem 0.8rem;
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

const Control = styled.li`
  cursor: pointer;
`;

const SongTitle = styled.h1`
  font-size: 1.2rem;
  line-height: 1em;
  text-align: center;
  padding: 0 1rem;
`;

const SongSubTitle = styled.h2`
  font-size: 1.1rem;
  line-height: 1em;
  margin: 0.75rem 0 0;
  padding-bottom: 0.75rem;
  color: #4a505c;
  font-weight: 400;
  text-align: center;
`;

const PlayerVolume = styled.div`
  padding: 0 0.5rem;
`;
const PlayerVolumeWrapper = styled.div``;
const VolumeIcon = styled.span`
  cursor: pointer;
`;
const VolumeSliderContainer = styled.div`
  width: 0;
  visibility: hidden;
  position: relative;
  transform: translate(42px, -34px);
  transition: 0.5s ease;
  @media (max-width: 579px) {
    width: 30%;
    visibility: visible;
  }
  ${VolumeIcon}:hover ~ & {
    width: 30%;
    visibility: visible;
  }
  &:hover {
    width: 30%;
    visibility: visible;
  }
`;
const VolumeSlider = styled.input.attrs((props) => ({
  type: 'range',
  min: 0,
  max: 1,
  step: 0.01,
  defaultValue: 0.25,
}))`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #f2f2f2;
  height: 8px;
  font-family: sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  width: 100%;
  outline: none;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #000000;
    border-radius: 3vw;
    height: 10px;
    width: 16px;
    border-radius: 3px;
    background: black;
    cursor: pointer;
  }

  ::-moz-range-thumb {
    border: 1px solid #000000;
    border-radius: 3vw;
    height: 10px;
    width: 16px;
    border-radius: 3px;
    background: black;
    cursor: pointer;
  }

  ::-ms-thumb {
    border: 1px solid #000000;
    border-radius: 3vw;
    height: 10px;
    width: 16px;
    border-radius: 3px;
    background: black;
    cursor: pointer;
  }
`;

const PlaylistHeader = styled.header`
  position: relative;
  z-index: 1;
  background: black;
  padding: 2.2rem;
  color: #f2f2f2;
  text-align: center;
  -webkit-box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.27);
  -moz-box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.27);
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.27);
  @media (max-width: 579px) {
    padding: 1.4rem;
  }
`;

const PlaylistTitle = styled.h1`
  font-size: 1.6rem;
  line-height: 1em;
  margin: 0 0 0.975rem;
  margin-top: 0;
`;

const PlaylistInfo = styled.p``;

const PlaylistItems = styled.ol`
  position: relative;
  z-index: 0;
  list-style: none;
  margin: 0;
  max-height: 40vh;
  overflow: auto;
  background: #3d5372;
  color: #f2f2f2;
  @media (max-width: 579px) {
    ::-webkit-scrollbar {
      display: none;
    }
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar {
    width: 15px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #172231;
  }
`;

const PlaylistTrack = styled.li`
  border-bottom: 1px solid white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 1.2rem 3rem;
  ${(props) => (props.isOdd ? `background:#222222` : `background:#000`)};
  ${(props) =>
    props.isActive &&
    `background: rgb(0,0,0);
background: -moz-linear-gradient(270deg, rgba(0,0,0,1) 0%, rgba(173,14,14,1) 100%);
background: -webkit-linear-gradient(270deg, rgba(0,0,0,1) 0%, rgba(173,14,14,1) 100%);
background: linear-gradient(270deg, rgba(0,0,0,1) 0%, rgba(173,14,14,1) 100%);`};

  @media (max-width: 579px) {
    padding: 1rem 1rem;
  }
`;

const TrackIcon = styled.div``;

const TrackInfo = styled.div`
  margin: 0 2rem;
  width: 100%;
  @media (max-width: 579px) {
    margin: 0 1rem;
  }
`;

const TrackTitle = styled.h3`
  font-size: 1rem;
  line-height: 1em;
  margin: 0 0 0.5rem;
  @media (max-width: 579px) {
    font-size: 0.85rem;
  }
`;

const TrackSubTitle = styled.span`
  @media (max-width: 579px) {
    font-size: 0.75rem;
  }
`;
