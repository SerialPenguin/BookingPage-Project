import React, { useState } from 'react';
import axios from 'axios';
import { Activity } from '../types/Activity';

interface AddActivityFormProps {
  activities:Activity[]
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  onAddActivity: (id: number, title: string, content: string, date: Date,maxCount: number) => void;
}

function AddActivityForm(props: AddActivityFormProps) {
    const { onAddActivity } = props;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState<Date>(new Date());

  const [maxCount, setMaxCount] = useState('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  
    const newActivity: Activity = {
      id: Math.random(), // Generera ett unikt ID, eller använd en annan strategi
      title,
      content,
      date,
      maxCount: parseInt(maxCount, 10),
    };
  
    // Anropa onSubmit-funktionen med den nya aktiviteten
    console.log(newActivity);
  
    // Använd de lokala staterna direkt
    onAddActivity(newActivity.id, newActivity.title, newActivity.content, newActivity.date, newActivity.maxCount);
  
    // Återställ formuläret efter att aktiviteten har lagts till
    setTitle('');
    setContent('');
    setDate(new Date());
    setMaxCount('');
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="text"
          value={date.toLocaleDateString()}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
      </label>
      <label>
        Max Count:
        <input
          type="number"
          value={maxCount}
          onChange={(e) => setMaxCount(e.target.value)}
        />
      </label>
      <button type="submit">Add Activity</button>
    </form>
  );
}

export default AddActivityForm;
