import React, { useCallback, FC, memo } from 'react';
import classNames from 'classnames';
import './style.scss';

export interface IInputProps {
  onChange: (value: string, name: any) => void,
  name?: string,
  value: any,
  className?: string,
  placeholder?: string,
};

const Input: FC<IInputProps> = ({ placeholder, className, onChange, name, value }) => {
  const handleChange = useCallback((event) => {
    onChange(event.target.value, name);
  }, [onChange, name])
  const inputClasses = classNames({
    'input': true,
    [className || '']: !!className,
  })
  return (
    <input
      placeholder={placeholder}
      className={inputClasses}
      name={name}
      value={value}
      onChange={handleChange}
    />
  );
};

export default memo(Input);