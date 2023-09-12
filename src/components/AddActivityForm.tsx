import React, { useState } from 'react';
// import axios from 'axios';
import { Activity } from '../types/Activity';
import "../stylesheet/components/_AddActivityForm.scss"

interface AddActivityFormProps { // Interface for the new activityprops when adding a new activity
  activities:Activity[]
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  onAddActivity: (id: number, title: string, content: string, date: Date,maxCount: number) => void;
}

function AddActivityForm(props: AddActivityFormProps) { // Sets states for the inputs and
  const { onAddActivity } = props;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [maxCount, setMaxCount] = useState('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  
    const newActivity: Activity = {
      id: Math.floor(Math.random()), // Genererates a unique ID for a new activity
      title,
      content,
      date,
      maxCount: parseInt(maxCount, 10),
    };
  
    // Use the local states
    onAddActivity(newActivity.id, newActivity.title, newActivity.content, newActivity.date, newActivity.maxCount);
  
    // Resets the form after the activities have been added
    setTitle('');
    setContent('');
    setDate(new Date());
    setMaxCount('');
  }
  

  return (
    <div className='activity-form-wrapper'>
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
      <button type="submit" className='login-btn'>Add Activity</button>
    </form>
    </div>
  );
}

export default AddActivityForm;
