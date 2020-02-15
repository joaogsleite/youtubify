import React, { useCallback, useState } from 'react';
import './App.css';
import { getDownloadUrl } from './services/youtube';

function App() {
  const [url, setUrl] = useState()
  const handleChange = useCallback((event) => {
    setUrl(event.target.value)
  }, [setUrl])
  const handleClick = useCallback(async () => {
    const audioUrl = await getDownloadUrl(url);
    setUrl(audioUrl)
  }, [setUrl, url]);
  return (
    <div className="App">
      <h2>Youtubify</h2>
      <input value={url} onChange={handleChange} />
      <button onClick={handleClick}>Go</button>
      <br />
      <audio autoPlay controls src={url}></audio>
    </div>
  );
}

export default App;
