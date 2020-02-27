import React, { useState, useCallback, FC, memo } from 'react';
import * as yt from '../../services/youtube';
import { ITrack, enqueue } from '../../services/player';
import Item from '../../components/Item';
import Input from '../../components/Input';
import './style.scss';
import Loading from '../../components/Loading';

let timeout: NodeJS.Timeout;

const SearchScreen: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [results, setResults] = useState<ITrack[]>([]);

  const search = useCallback(async () => {
    setLoading(true);
    const results = await yt.searchVideos(value || '');
    setResults(results);
    setLoading(false);
  }, [value])

  const handleChange = useCallback((value) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    setValue(value);
    timeout = setTimeout(search, 500);
  }, [setValue, search]);

  return (
    <div className="search-screen">
      <Input placeholder="Search" value={value} onChange={handleChange} />
      <ul>
        {loading && <Loading /> }
        {results.map((item, index) => 
          <Item key={index} {...item} onClick={enqueue} />
        )}
      </ul>
    </div>
  )
};

export default memo(SearchScreen);