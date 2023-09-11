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
      <Link to="/admin">Back to Admin</Link>

      {/* Rendera AddActivityForm och skicka med funktionen onAdd */}
      <AddActivityForm onAddActivity={onAddActivity} activities={activities} setActivities={setActivities}  />


      <ul>
                {props.activities.map((activity) =>{ 
                    console.log(activity)
                    return <li key={activity.id}>
                        <p>{activity.title}</p>

                       {/*  <p>{activity.date.toLocaleDateString()}</p>*/}

                    </li>
                })}
            </ul>
      {/* Rendera listan med aktiviteter */}
      <h2>Activities:</h2>
      <ul>
        {activities.map((activity) => {
         console.log(activity)
         return <li key={activity.id}>
               
            <h3>{activity.title}</h3>
            <p>{activity.content}</p>
            <p>Date: {activity.date.toLocaleString()}</p>
            <p>Max Count: {activity.maxCount}</p>
          </li>
})}
      </ul>
    </div>
  );
}

export default AddActivityPage;
