import React from 'react';
import AddActivityForm from '../components/AddActivityForm';
import { Activity } from '../types/Activity';
import { Link } from 'react-router-dom';

interface AddActivityPageProps {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  onAddActivity: (id: number, title: string, content: string, date: Date, maxCount: number) => void;
}

function AddActivityPage(props: AddActivityPageProps): JSX.Element {
  const { activities, onAddActivity, setActivities } = props;

  return (
    <div>
      <h1>Add Activity</h1>
      <Link to="/admin" className="admin-btn">Back to Admin</Link>

      {/* Renders AddActivityForm and sends with the onAdd */}
      <AddActivityForm onAddActivity={onAddActivity} activities={activities} setActivities={setActivities}  />


      <h2>Activities:</h2>
      <ul>
        {activities.map((activity) => {
         console.log(activity)
         return <li key={activity.id}>
               
            <h3>{activity.title}</h3>
            <p>{activity.content}</p>
            <p>Date: {new Date(activity.date).toLocaleString('en-GB')}</p>
            <p>Max Count: {activity.maxCount}</p>
          </li>
})}
      </ul>
    </div>
  );
}

export default AddActivityPage;
