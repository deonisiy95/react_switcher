import React, {FC, useCallback, useLayoutEffect, useRef, useState} from 'react';
import cn from 'classnames';

import style from './Switcher.module.scss';

export type TOptions = Array<{
  label: string;
  value: string;
}>;

export interface IProps {
  options: TOptions;
  value?: string;
  onChange?: (key: string) => void;
  className?: string;
  size?: 's' | 'm' | 'l';
}

export const Switcher: FC<IProps> = ({
  options,
  value,
  onChange,
  className,
  size = 's'
}) => {
  const activeItemRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const active = value || options[0].value;
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState<number>(0);
  const [transitionWidth, setTransitionWidth] = useState(false);

  useLayoutEffect(() => {
    if (!activeItemRef?.current || !containerRef?.current) {
      return;
    }

    const activeItemRect = activeItemRef.current.getBoundingClientRect();
    const offset = activeItemRect.left - containerRef.current.getBoundingClientRect().left;

    setOffset(offset);
    setWidth(activeItemRect.width);
  }, [active]);

  const onItemClick = useCallback(
    (key: string) => () => {
      setTransitionWidth(true);
      onChange?.(key);
    },
    [onChange]
  );

  return (
    <div ref={containerRef} className={cn(className, style.switcher, style[size], {
      [style.transitionWidth]: transitionWidth
    })}>
      <div className={style.background}>
        {options.map(item => (
          <div
            ref={item.value === active ? activeItemRef : null}
            key={item.value}
            className={style.option}
            onClick={onItemClick(item.value)}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div style={{transform: `translateX(${offset}px)`, width}} className={style.selector}>
        <div style={{transform: `translateX(-${offset}px)`}} className={style.activeText}>
          {options.map(item => (
            <div key={item.value}>{item.label}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
