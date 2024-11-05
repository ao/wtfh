import React, { useState } from 'react';

const AlarmForm = ({ onSetTime }) => {
  const [selectedTime, setSelectedTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTime) {
      onSetTime(selectedTime);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Set Wake-Up Time:
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />
      </label>
      <button type="submit">Set Alarm</button>
    </form>
  );
};

export default AlarmForm;

