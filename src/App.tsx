import React, { useCallback, useState } from 'react';
import './App.css';
import { getDownloadUrl, getPlaylists, getPlaylist } from './services/youtube';

function App() {
  const [url, setUrl] = useState<string>('')
  const [user, setUser] = useState<string>('')
  const [playlists, setPlaylists] = useState<string[]>()
  const [playlistId, setPlaylistId] = useState<string>('')
  const [videos, setVideos] = useState<string[]>()
  const handleChange = useCallback((event) => {
    const value = event.target.value
    switch(event.target.name) {
      case 'url':
        return setUrl(value)
      case 'userId':
        return setUser(value)
      case 'playlistId':
        return setPlaylistId(value)
      default:
        return
    }
  }, [setUrl])
  const fetchUser = useCallback(() => {
    getPlaylists(user || '').then((playlists) => {
      setPlaylists(playlists as string[])
    })
  }, [user, setPlaylists])
  const fetchPlaylist = useCallback(() => {
    getPlaylist(playlistId || '').then((videos) => {
      setVideos(videos as string[])
    })
  }, [playlistId, setVideos])
  const handleClick = useCallback(async () => {
    const audioUrl = await getDownloadUrl(url || '');
    setUrl(audioUrl)
  }, [setUrl, url]);
  return (
    <div className="App">
      <h1>Youtubify</h1>
      <input placeholder="youtube user id" name="userId" value={user} onChange={handleChange} />
      <button onClick={fetchUser}>Go</button>
      {playlists && <>
        <h2>Playlists</h2>
        {playlists.map((playlist, index) => 
          <p key={index}>
            {playlist}
          </p>
        )}
      </>}
      <br /><br />
      <input placeholder="youtube playlist id" name="playlistId" value={playlistId} onChange={handleChange} />
      <button onClick={fetchPlaylist}>Go</button>
      {videos && <>
        <h2>Videos</h2>
        {videos.map((video, index) => 
          <p key={index}>
            {video}
          </p>
        )}
      </>}
      <br /><br />
      <input placeholder="youtube video id" name="url" value={url} onChange={handleChange} />
      <button onClick={handleClick}>Go</button>
      <br /><br />
      <audio autoPlay controls src={url}></audio>
    </div>
  );
}

export default App;
