import React, { useState, useEffect } from 'react';

function CurrentDateTime() {
  const [date, setDate] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [hours, setHours] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [seconds, setSeconds] = useState(new Date().getSeconds());

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      setDate(currentDate.getDate());
      setMonth(currentDate.getMonth() + 1);
      setYear(currentDate.getFullYear());
      setHours(currentDate.getHours());
      setMinutes(currentDate.getMinutes());
      setSeconds(currentDate.getSeconds());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedDate = `${date}-${getMonthName(month)}-${year}`;
  const formattedTime = `${hours} : ${minutes} : ${seconds}`;

  return (
    <div>
      <div>{formattedDate}, {formattedTime}</div>
      
    </div>
  );
}

function getMonthName(month) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return monthNames[month - 1];
}

export default CurrentDateTime;