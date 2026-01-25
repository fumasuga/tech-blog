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
    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
      <span className="font-normal tabular-nums">{formattedYear}</span>
      <span className="font-normal tabular-nums">{formattedDate}</span>
      <span className="font-normal">{weekday.toUpperCase()}</span>
    </div>
  );
}

export default DateLabel;