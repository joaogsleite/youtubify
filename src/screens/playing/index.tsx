import React, { FC, memo } from 'react';
import { useSelector } from '../../reducers';
import { play, dequeue } from '../../services/player';
import Item from '../../components/Item';
import './style.scss';
import Loading from '../../components/Loading';

const PlayingScreen: FC = () => {
  const playing = useSelector((state) => state.playing);
  const queue = useSelector((state) => state.queue);
  return (
    <div className="playing-screen">
      <ul>
        <h2>Playing now:</h2>
        {playing 
          ? <> 
              {playing.loading &&
                <Loading />
              } 
              <Item {...playing} />
            </>
          : <p>Nothing is playing. <br />Choose a video from queue below.</p>
        }
        <br />
        <h2>Queue:</h2>
        {queue.length === 0 &&
          <p>No videos in queue. <br />Search some videos and add them.</p>
        }
        {queue.map((video, index) =>
          <Item key={index} {...video} onClick={play} />
        )}
      </ul>
      <audio
        onEnded={dequeue}
        autoPlay
        controls
        title={playing && playing.title}
        src={playing && playing.audioSrc}></audio>
    </div>
  )
}

export default memo(PlayingScreen);