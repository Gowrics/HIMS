import React, { useMemo } from "react";
import Select from "react-select";

const CustomSelect = React.memo(({ 
  id, 
  name, 
  data = [],  // Ensure default empty array to avoid errors
  value, 
  onChange, 
  isDisabled = false, 
  placeholder = "Select an option", 
  valueKey,  
  labelKey  
}) => {
  console.log(`Rendering CustomSelect: ${name}`); // Debugging

  // Memoize options to prevent re-computation
  const options = useMemo(() => 
    data.map(option => ({
      value: option[valueKey],  
      label: option[labelKey] ? `${option[valueKey]} - ${option[labelKey]}` : `${option[valueKey]}`
    })), 
    [data, valueKey, labelKey]
  );

  return (
    <Select
      id={id}
      name={name}
      options={options}
      value={options.find(option => option.value === value) || null}
      onChange={selectedOption => onChange({ target: { name, value: selectedOption?.value || "" } })}
      isDisabled={isDisabled}
      isSearchable={true}
      placeholder={placeholder}
      required
    />
  );
});

export default CustomSelect;
