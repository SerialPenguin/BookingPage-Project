import { Activity } from '../types/Activity';
import BookingButton from '../components/BookingButton';
import { User } from '../types/User';

interface BookinPageProps{
  activities: Activity[];
  upDateUserActivities:(activity: Activity) => void;
  loggedInUser:User
  upDateActivityMaxCount:(activityId: number) => void;
}

// Renders the state activities from App

function BookingPage(props:BookinPageProps): JSX.Element {
  const { activities,  upDateUserActivities,  loggedInUser, upDateActivityMaxCount} = props;
  
  return (
    <div>
      <h2>BookingPage</h2>
      <h3>Activities:</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <h4>{activity.title}</h4>
            <p>{activity.content}</p>
            <p>Date: {new Date(activity.date).toLocaleString('en-GB')}</p>
         
            <p>Max Count: {activity.maxCount}</p>
            {/* Pass the activity as a prop to BookingButton */}
            <BookingButton upDateActivityMaxCount={upDateActivityMaxCount} loggedInUser={loggedInUser} updateUserActivities={upDateUserActivities} activity={activity} />
          </li>
        ))}
      </ul>
      
      
    </div>
  );
}

export default BookingPage;
