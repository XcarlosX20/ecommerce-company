import {useState} from 'react'
const useSelectOption = () => {
  const [option, setOption] = useState({});
  const chooseOption = (option) => {
    setOption(option);
  };
  const fillBox = (id) => {
    return id === option.id;
  };
  
    return {option, chooseOption,fillBox };
}
 
export default useSelectOption;