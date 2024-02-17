import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const MonthSelector = ({ currentMonth, onSelectMonth }) => {
  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].slice(currentMonthIndex); // Slice to start from the current month

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChange = (event, selectedMonth) => {
    onSelectMonth(selectedMonth);
  };

  const filteredMonths = months.filter((month) =>
    month.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Autocomplete
      disablePortal
      fullWidth
      value={currentMonth}
      onChange={handleChange}
      options={filteredMonths}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Selecciona un mes..."
          variant="outlined"
          onChange={handleSearchChange}
          value={searchTerm}
        />
      )}
    />
  );
};

export default MonthSelector;
