"use client";
import { useEffect, useState } from "react";

function DateLabel() {
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedYear, setFormattedYear] = useState("");
  const [weekday, setWeekday] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      setFormattedDate(`${today.getMonth() + 1}.${today.getDate()}`);
      setFormattedYear(today.getFullYear().toString());
      setWeekday(today.toLocaleDateString('en-US', { weekday: 'short' }));
    };
    updateDate();

    const timer = setInterval(updateDate, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-row items-center">
      <p className="text-3xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-2 mb-0">
        {formattedDate}
      </p>
      <div className="flex flex-col items-end justify-center text-right ml-2 mr-2">
        <p className="text-xs md:text-sm text-gray-600">
          {weekday.toUpperCase()}
        </p>
        <p className="text-xs md:text-sm text-gray-600">
          {formattedYear}
        </p>
      </div>
    </div>
  )
};

export default DateLabel;