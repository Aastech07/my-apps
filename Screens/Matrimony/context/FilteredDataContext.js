import React, { createContext, useState } from "react";

const FilterDataContext = createContext();

export const FilterDataProvider = ({ children }) => {
  const [filteredDatas, setFilteredData] = useState(null);

  return (
    <FilterDataContext.Provider value={{ filteredDatas, setFilteredData }}>
      {children}
    </FilterDataContext.Provider>
  );
};

export default FilterDataContext;
