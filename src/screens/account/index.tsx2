import React, { useCallback, useState, useEffect, memo } from 'react';
import { getPlaylists, getPlaylist } from '../../services/youtube';
import { setCurrentUser, getCurrentUser } from '../../services/localStorage';
import { play, enqueue } from '../../services/player';

function AccountScreen() {
  const [user, setUser] = useState<string>('');
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<any[]>()
  const [playlistId, setPlaylistId] = useState<string>('')
  const [loadingVideos, setLoadingVideos] = useState<boolean>(false);
  const [videos, setVideos] = useState<any[]>()
  const handleChange = useCallback((event) => {
    const value = event.target.value
    switch(event.target.name) {
      case 'userId':
        return setUser(value)
      case 'playlistId':
        return setPlaylistId(value)
      default:
        return
    }
  }, [setUser,setPlaylistId]);
  const fetchUser = useCallback((userId?: string) => {
    userId = userId || (user.includes('/user/')
      ? user.split('/user/')[1].split('/')[0]
      : user.includes('/channel/')
        ? user.split('/channel/')[1].split('/')[0]
        : user)
    setUser(userId)
    setLoadingUser(true);
    getPlaylists(userId || '').then((playlists: any) => {
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
    getPlaylist(playlistId || '').then((videos: any) => {
      setVideos(videos as string[])
      setLoadingVideos(false);
    })
  }, [playlistId, setVideos, setLoadingVideos])
  return (
    <div className="App">
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
          <li className="item" key={index} onClick={() => setPlaylistId(playlist.id)}>
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
          <li className="item" key={index} onClick={() => enqueue(video)}>
            <img alt={video.title} src={video.thumbnail} />
            <span>{video.title}</span>
          </li>
        )}
        </ul>
      </>}
    </div>
  );
}

export default memo(AccountScreen);
