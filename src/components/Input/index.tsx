import React, { useCallback, FC, memo, RefObject } from 'react';
import classNames from 'classnames';
import './style.scss';

export interface IInputProps {
  onChange: (value: string, name: any) => void,
  name?: string,
  value: any,
  className?: string,
  placeholder?: string,
  ref?: RefObject<HTMLInputElement>,
};

const Input: FC<IInputProps> = React.forwardRef((props, ref) => {
  const { placeholder, className, onChange, name, value } = props;
  const handleChange = useCallback((event) => {
    onChange(event.target.value, name);
  }, [onChange, name])
  const inputClasses = classNames({
    'input': true,
    [className || '']: !!className,
  })
  return (
    <input
      ref={ref}
      placeholder={placeholder}
      className={inputClasses}
      name={name}
      value={value}
      onChange={handleChange}
    />
  );
});

export default memo(Input);