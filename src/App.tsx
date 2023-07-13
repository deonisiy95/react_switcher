import React, {FC, useState} from 'react';
import {Switcher} from 'src/Switcher';

export const App: FC = () => {
  const [oneValue, setOneValue] = useState<string>();
  const [twoValue, setTwoValue] = useState<string>();

  return (
    <>
      <Switcher
        options={[
          {value: 'off', label: 'Off'},
          {value: 'on', label: 'On'}
        ]}
        value={oneValue}
        onChange={setOneValue}
        size={'m'}
      />
      <br />
      <Switcher
        options={[
          {value: 'first', label: 'First option'},
          {value: 'second', label: 'Second option'},
          {value: 'third', label: 'Third option'}
        ]}
        value={twoValue}
        onChange={setTwoValue}
        size={'m'}
      />
    </>
  );
};
