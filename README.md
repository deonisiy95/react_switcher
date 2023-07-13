# react_switcher
Animate react switch component with text 



## Usage
```
export const App = () => {
  const [value, setValue] = useState<string>();

  return (
    <Switcher
      options={[
        {value: 'off', label: 'Off'},
        {value: 'on', label: 'On'}
      ]}
      value={value}
      onChange={setValue}
    />
  );
};
```
