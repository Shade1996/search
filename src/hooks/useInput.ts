import { HTMLAttributes, useState } from "react";

export default  (defaultValue:string) => {
    const [value, setValue] = useState(defaultValue);
    function onChange(e:any) {
      setValue(e.target.value);
    }
    return {
      value,
      onChange,
    };
  }