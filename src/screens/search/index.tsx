import React, { useState, useCallback, FC, memo, useRef, useEffect } from 'react';
import * as yt from '../../services/youtube';
import { ITrack, enqueue } from '../../services/player';
import Item from '../../components/Item';
import Input from '../../components/Input';
import './style.scss';
import Loading from '../../components/Loading';

let timeout: NodeJS.Timeout;

export interface ISearchScreenProps {
  visible?: boolean,
}

const SearchScreen: FC<ISearchScreenProps> = ({ visible }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [results, setResults] = useState<ITrack[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const search = useCallback(async (value) => {
    setLoading(true);
    if (value) {
      const results = await yt.searchVideos(value);
      setResults(results);
    } else {
      setResults([]);
    }
    setLoading(false);
  }, [setLoading, setResults])

  const handleChange = useCallback((value) => {
    setLoading(true);
    if (timeout) {
      clearTimeout(timeout);
    }
    setValue(value);
    timeout = setTimeout(() => search(value), 500);
  }, [setValue, search]);

  useEffect(() => {
    if (visible && inputRef.current && !inputRef.current.value) {
      inputRef.current.focus();
    }
  }, [inputRef, visible]);

  return (
    <div className="search-screen">
      <Input ref={inputRef} placeholder="Search" value={value} onChange={handleChange} />
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