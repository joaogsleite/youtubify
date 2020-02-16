import React, { useCallback, useState, useEffect } from 'react';
import './App.scss';
import { getDownloadUrl, getPlaylists, getPlaylist } from './services/youtube';
import { setCurrentUser, getCurrentUser } from './services/localStorage';

function App() {
  const [url, setUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<string>('');
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<any[]>()
  const [playlistId, setPlaylistId] = useState<string>('')
  const [loadingVideos, setLoadingVideos] = useState<boolean>(false);
  const [videos, setVideos] = useState<any[]>()
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
  const fetchUser = useCallback((userId?: string) => {
    userId = userId || (user.includes('/user/')
      ? user.split('/user/')[1].split('/')[0]
      : user.includes('/channel/')
        ? user.split('/channel/')[1].split('/')[0]
        : user)
    setUser(userId)
    setLoadingUser(true);
    getPlaylists(userId || '').then((playlists) => {
      setCurrentUser(userId || '')
      setLoadingUser(false);
      setPlaylists(playlists as string[])
    })
  }, [user, setPlaylists, setLoadingUser])
  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      fetchUser(currentUser)
    }
    // eslint-disable-next-line
  }, [])
  const fetchPlaylist = useCallback(() => {
    setLoadingVideos(true);
    getPlaylist(playlistId || '').then((videos) => {
      setVideos(videos as string[])
      setLoadingVideos(false);
    })
  }, [playlistId, setVideos, setLoadingVideos])
  const handleClick = useCallback(async () => {
    setLoading(true);
    const audioUrl = await getDownloadUrl(url || '');
    setTimeout(() => setLoading(false), 2000);
    setUrl(audioUrl)
  }, [setUrl, url]);
  return (
    <div className="App">
      <h1>Youtubify</h1>
      <hr />
      <a target="_blank" href="http://youtube.com/user">Get my account url</a>
      <input placeholder="youtube account id/url" name="userId" value={user} onChange={handleChange} />
      <button onClick={()=>fetchUser()}>Go</button>
      {loadingUser && (
        <div className="loading"></div>
      )}
      {playlists && <>
        <h2>Playlists</h2>
        <ul>
        {playlists.map((playlist, index) => 
          <li key={index} onClick={() => setPlaylistId(playlist.id)}>
            <img alt={playlist.title} src={playlist.thumbnail} />
            <span>{playlist.title}</span>
          </li>
        )}
        </ul>
      </>}
      <hr />
      <a target="_blank" href="https://support.google.com/youtube/answer/3127309?hl=en">Your playlists must be public</a>
      <input placeholder="youtube playlist id" name="playlistId" value={playlistId} onChange={handleChange} />
      <button onClick={fetchPlaylist}>Go</button>
      {loadingVideos && (
        <div className="loading"></div>
      )}
      {videos && <>
        <h2>Videos</h2>
        <ul>
        {videos.map((video, index) => 
          <li key={index} onClick={() => setUrl(video.id)}>
            <img alt={video.title} src={video.thumbnail} />
            <span>{video.title}</span>
          </li>
        )}
        </ul>
      </>}
      <hr />
      <input placeholder="youtube video id" name="url" value={url} onChange={handleChange} />
      <button onClick={handleClick}>Go</button>
      {loading && (
        <div className="loading"></div>
      )}
      <br /><br /><br />
      <audio autoPlay controls src={url}></audio>
      <hr />
    </div>
  );
}

export default App;
