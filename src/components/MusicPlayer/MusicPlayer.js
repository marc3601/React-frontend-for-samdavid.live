import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const PlayerWrapper = styled.section`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Player = styled.section``;

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
  type: "range",
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
    background: #1dd2fb;
    cursor: pointer;
    /* margin-top: -14px; You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; Add cool effects to your sliders! */
  }

  ::-moz-range-thumb {
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
    border: 1px solid #000000;
    height: 16px;
    width: 16px;
    border-radius: 3px;
    background: #1dd2fb;
    cursor: pointer;
  }

  ::-ms-thumb {
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
    border: 1px solid #000000;
    height: 16px;
    width: 16px;
    border-radius: 3px;
    background: #1dd2fb;
    cursor: pointer;
  }
`;

const PlayerControls = styled.ul`
  display: flex;
  list-style: none;
  padding: 1rem 2rem;
  justify-content: space-between;
`;

const Control = styled.li`
  cursor: pointer;
`;

const SongTitle = styled.h1`
  font-size: 1.5rem;
  line-height: 1em;
  margin: 0.975rem 0 0;
  text-align: center;
`;

const SongSubTitle = styled.h2`
  font-size: 1.2rem;
  line-height: 1em;
  margin: 0.75rem 0 0;
  color: #7f7c6b;
  font-weight: 400;
  text-align: center;
`;

const PlayerVolume = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: space-space-around;
`;

const VolumeIcon = styled.div``;

const VolumeSlider = styled.input.attrs((props) => ({
  type: "range",
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
  position: relative;
  width: 50%;
  font-family: sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  outline: none;
  transform: translate(10px, 10px);
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #000000;
    border-radius: 3vw;
    height: 16px;
    width: 16px;
    border-radius: 3px;
    background: #1dd2fb;
    cursor: pointer;
  }

  ::-moz-range-thumb {
    border: 1px solid #000000;
    border-radius: 3vw;
    height: 16px;
    width: 16px;
    border-radius: 3px;
    background: #1dd2fb;
    cursor: pointer;
  }

  ::-ms-thumb {
    border: 1px solid #000000;
    border-radius: 3vw;
    height: 16px;
    width: 16px;
    border-radius: 3px;
    background: #1dd2fb;
    cursor: pointer;
  }
`;

const MusicPlayer = ({ playlist }) => {
  const [playIcon, setPlayIcon] = useState(true);
  const [audioDuration, setAudioDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [percentage, setPercentage] = useState(0);
  const volume = useRef(null);
  const progress = useRef(null);
  const audioRef = useRef();
  useEffect(() => {
    audioRef.current.volume = volume.current.value;
  }, []);

  const convertAudioDuration = (convert) => {
    var minutes = "0" + Math.floor(convert / 60);
    var seconds = "0" + Math.floor(convert - minutes * 60);
    var dur = minutes.substr(-2) + ":" + seconds.substr(-2);
    return dur;
  };


  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };


  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(convertAudioDuration(time.toFixed(2)));
  };

  return (
    <PlayerWrapper>
      <Player>
        <Timer>
          <div className="elapsed">{currentTime}</div>
          <div className="total">{audioDuration}</div>
        </Timer>
        <ProgressBar>
          <Input ref={progress} percentage={percentage} onChange={onChange} />
        </ProgressBar>
        <PlayerControls>
          <Control>
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height="50px"
              width="50px"
            >
              <title>rewind</title>
              <path
                d="M481.76,510.43c17,0,30.24-13.78,30.24-31.36V32.93c0-17.58-13.28-31.36-30.25-31.36a32.73,32.73,0,0,0-16.3,4.49L128.61,229.12C118.54,234.93,112.53,245,112.53,256s6,21.07,16.08,26.87L465.45,505.94a32.72,32.72,0,0,0,16.3,4.49Z"
                fill="#434040"
              />
              <path
                d="M61.94,499.51a61.94,61.94,0,0,0,61.94-61.93V74.42A61.94,61.94,0,0,0,0,74.42V437.58A61.94,61.94,0,0,0,61.94,499.51Z"
                fill="#434040"
              />
            </svg>
          </Control>
          <Control
            onClick={() => {
              setPlayIcon(!playIcon);
              if (playIcon) {
                audioRef.current.play();
              } else {
                audioRef.current.pause();
              }
            }}
          >
            {playIcon ? (
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="50px"
                width="50px"
              >
                <title>play</title>
                <path
                  d="M60.54,512c-17.06,0-30.43-13.86-30.43-31.56V31.55C30.12,13.86,43.48,0,60.55,0A32.94,32.94,0,0,1,77,4.52L465.7,229c10.13,5.85,16.18,16,16.18,27s-6,21.2-16.18,27L77,507.48A32.92,32.92,0,0,1,60.55,512Z"
                  fill="#434040"
                />
              </svg>
            ) : (
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="50px"
                width="50px"
              >
                <title>pause</title>
                <path
                  d="M395,512a73.14,73.14,0,0,1-73.14-73.14V73.14a73.14,73.14,0,1,1,146.29,0V438.86A73.14,73.14,0,0,1,395,512Z"
                  fill="#434040"
                />
                <path
                  d="M117,512a73.14,73.14,0,0,1-73.14-73.14V73.14a73.14,73.14,0,1,1,146.29,0V438.86A73.14,73.14,0,0,1,117,512Z"
                  fill="#434040"
                />
              </svg>
            )}
          </Control>
          <Control>
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height="50px"
              width="50px"
            >
              <title>forward</title>
              <path
                d="M30.24,510.43c-17,0-30.24-13.78-30.24-31.36V32.93C0,15.35,13.28,1.57,30.25,1.57a32.73,32.73,0,0,1,16.3,4.49L383.39,229.12c10.07,5.81,16.08,15.86,16.08,26.88s-6,21.07-16.08,26.87L46.55,505.94a32.72,32.72,0,0,1-16.3,4.49Z"
                fill="#434040"
              />
              <path
                d="M450.06,499.51a61.94,61.94,0,0,1-61.94-61.93V74.42a61.94,61.94,0,0,1,123.88,0V437.58A61.94,61.94,0,0,1,450.06,499.51Z"
                fill="#434040"
              />
            </svg>
          </Control>
        </PlayerControls>
        <PlayerVolume>
          <VolumeIcon>
            <svg id="volume" height="25px" width="25px" viewBox="0 0 26.2 26.2">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                fill="#434040"
                d="M21.1 13.1c0-3.3-2-6.2-4.9-7.4l-.8 1.8c2.2.9 3.7 3 3.7 5.5s-1.5 4.6-3.7 5.5l.8 1.8c2.9-1 4.9-3.9 4.9-7.2zm-4 0c0-1.7-1-3.1-2.5-3.7l-.8 1.8c.7.3 1.2 1 1.2 1.8s-.5 1.5-1.2 1.8l.8 1.8c1.5-.4 2.5-1.8 2.5-3.5zM17.7 2l-.8 1.8c3.6 1.5 6.2 5.1 6.2 9.2 0 4.2-2.5 7.7-6.2 9.2l.8 1.8c4.3-1.8 7.4-6.1 7.4-11.1s-3-9.1-7.4-10.9zM1.1 8.1v10h4l7 7v-24l-7 7h-4z"
              ></path>
            </svg>
          </VolumeIcon>
          <VolumeSlider
            ref={volume}
            onChange={() => (audioRef.current.volume = volume.current.value)}
          ></VolumeSlider>
        </PlayerVolume>
        <SongTitle>{playlist[0].artist}</SongTitle>
        <SongSubTitle>{playlist[0].name}</SongSubTitle>
      </Player>
      <PlayList></PlayList>
      <audio
        ref={audioRef}
        onTimeUpdate={getCurrDuration}
        onLoadedData={(e) => {
          setAudioDuration(convertAudioDuration(audioRef.current.duration));
        }}
        src={playlist[0].source}
      />
    </PlayerWrapper>
  );
};

export default MusicPlayer;
