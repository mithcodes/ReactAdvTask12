import React, { useState } from 'react';
import ExpenseItem from './ExpenseItem';

function Expenses(props) {
  const allYears = Array.from(new Set(props.items.map((expense) => expense.date.getFullYear())));
  const [selectedYear, setSelectedYear] = useState('');

  const yearChangeHandler = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    props.onFilter(selectedYear);
  };

  const filteredExpenses = selectedYear
    ? props.items.filter((expense) => expense.date.getFullYear() === parseInt(selectedYear, 10))
    : props.items;

  return (
    <div>
      <div>
        <label>Select Year:</label>
        <select value={selectedYear} onChange={yearChangeHandler}>
          <option value="">All Years</option>
          {allYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {selectedYear && filteredExpenses.length === 0 && (
        <p>No data found for the selected year.</p>
      )}

      {filteredExpenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          date={expense.date}
          title={expense.title}
          amount={expense.amount}
        />
      ))}
    </div>
  );
}

export default Expenses;
