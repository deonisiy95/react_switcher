# react_switcher
Animate react switch component with text 

![Demo](https://github.com/deonisiy95/react_switcher/blob/main/demo.gif?raw=true)

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
