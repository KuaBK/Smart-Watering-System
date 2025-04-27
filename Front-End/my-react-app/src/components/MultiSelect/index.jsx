import React, { useState } from 'react';

const MultiSelect = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleChange = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }

    setSelectedItems(selectedValues);
  };

  return (
    <div className="w-64">
      <label htmlFor="multi-select" className="block font-medium mb-2">Chọn các khu vườn</label>
      <select
        id="multi-select"
        multiple
        value={selectedItems}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="garden1">Khu vườn 1</option>
        <option value="garden2">Khu vườn 2</option>
        <option value="garden3">Khu vườn 3</option>
        <option value="garden4">Khu vườn 4</option>
        <option value="garden5">Khu vườn 5</option>
      </select>

      <div className="mt-4">
        <h3 className="font-semibold">Các khu vườn đã chọn:</h3>
        <ul className="list-disc pl-5">
          {selectedItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelect;
