import React, { useMemo, forwardRef } from "react";
import Select from "react-select";

const CustomSelect = forwardRef(({
  id, 
  name, 
  data = [],  
  value, 
  onChange, 
  isDisabled = false, 
  placeholder, 
  valueKey,  
  labelKey,
  additionalFields = [] // Additional fields like role, DOB, passport, etc.
}, ref) => {
  console.log(`Rendering CustomSelect: ${name}`);

  // ✅ Prepare options with all required fields
  const options = useMemo(() => 
    data.map(option => {
      // Extract values of all specified fields
      const fieldValues = [
        option[valueKey],   // Code
        option[labelKey],   // Name
        ...additionalFields.map(field => option[field] || "N/A") // Additional Fields (Role, DOB, Passport, etc.)
      ];

      return {
        value: option[valueKey],  
        label: fieldValues.join(" - "), // ✅ Display all fields in dropdown
        searchString: fieldValues.join(" ").toLowerCase() // ✅ Make searchable
      };
    }), 
    [data, valueKey, labelKey, additionalFields]
  );

  // ✅ Custom filter function to search by any field
  const customFilter = (option, inputValue) => {
    return option.data.searchString.includes(inputValue.toLowerCase());
  };

  return (
    <Select
      ref={ref}
      id={id}
      name={name}
      options={options}
      value={options.find(option => option.value === value) || null}
      onChange={selectedOption => onChange({ target: { name, value: selectedOption?.value || "" } })}
      isDisabled={isDisabled}
      isSearchable={true}
      placeholder={placeholder}
      required
      filterOption={customFilter}  
    />
  );
});

export default React.memo(CustomSelect);
