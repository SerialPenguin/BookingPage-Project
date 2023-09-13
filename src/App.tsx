import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import BookingPage from './pages/BookingPage';
import AdminPage from './pages/AdminPage';
import { Activity } from './types/Activity';
import PageBanner from './components/PageBanner';
import { UserRole } from './types/User';
import AddActivityPage from './pages/AddActivityPage';
import { User } from './types/User';
import ViewUsers from './pages/ViewUsers';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({ id:0, username: '', role: 'USER' as UserRole, activities: [] as Activity[], password: '' });
  const [activities, setActivities] = useState([] as Activity[]);
  const [users, setUsers]= useState([] as User[])

// Fetch the users from MirageJS
  useEffect(() => {
    fetch('/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.map((user:User)=> convertUser(user.id, user.username, user.role, user.activities, user.password)));
      });
  }, []);
  
  // Function to update the max count for activities
  function updateActivityMaxCount(activityId: number) {
    const updatedActivities = activities.map((activity) => {
      if (activity.id === activityId) {
        return {
          ...activity,
          maxCount: activity.maxCount - 1,
        };
      }
      return activity;
    });
    setActivities(updatedActivities);
  }

  useEffect(() => {
    // Fetch activity data from MirageJS
    fetch('/activities')
      .then((response) => response.json())
      .then((data) => setActivities(data));
      
  }, []);

 

  function onAddActivity(id: number, title: string, content: string, date: Date, maxCount: number) {
    // Create the new activity with the given parameters
    const newActivity: Activity = {
      id,
      title,
      content,
      date,
      maxCount,
    };
  
    // Create a copy of the current activities-array and adds the new activity
    const updatedActivities = [...activities, newActivity];
  
    // Updates the activities array with the new array
    setActivities(updatedActivities);
  }

  // Fetches the stored users data from local storage
  useEffect(() => {
    const storedUserData = localStorage.getItem("loggedInUser");
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      const newUser: User = convertUser( user.id,user.username, user.role,user.activities,user.password)
      setIsLoggedIn(true);
      setLoggedInUser(newUser);
    }
  }, []);

  // Was needed to convert the response from MirageJS to the set the correct type for date
function convertUser(id:number,username:string,role:UserRole, activities:Activity[],password:string):User{
  const newUser: User = {
    id:id,
    username: username,
    role: role,
    activities: activities.map((activity:Activity) => {
      const newActivity:Activity = {
        id: activity.id,
        title : activity.title,
        content: activity.content,
        date: new Date(activity.date),
        maxCount: activity.maxCount
      }
      return newActivity
    }),
    password: password,
  }
  return newUser;
}

  // Function that sets the logged in state and then saves the data to local storage
  function handleLogin(id:number,username: string, role: UserRole, activities: Activity[], password: string) {
    setIsLoggedIn(true);

    setLoggedInUser(convertUser( id,username, role, activities, password ));
    localStorage.setItem("loggedInUser", JSON.stringify({ username, role, activities }))
  }

  function updateUserActivities(activity: Activity) {
    // Creates a copy of the users activity list and adds the new activity
    const updatedActivities = [...loggedInUser.activities, activity];
    
    // Updates loggedInUser with the updated activity list
    setLoggedInUser({ ...loggedInUser, activities: updatedActivities });
  }

  function handleRemoveActivity(activityId: number) {
    // Create a copy of the users' actual activity list
    const updatedActivities = [...loggedInUser.activities];
  
    // Find the index for the activity that's to be removed
    const indexToRemove = updatedActivities.findIndex((activity) => activity.id === activityId);
  
    // Remove the activity if found
    if (indexToRemove !== -1) {
      // Increment the maxCount for the removed activity
      const removedActivity = updatedActivities[indexToRemove];
      const updatedMaxCount = removedActivity.maxCount + 1;
  
      // Remove the activity from the list
      updatedActivities.splice(indexToRemove, 1);
  
      // Update the users' activity list and the maxCount
      setLoggedInUser({
        ...loggedInUser,
        activities: updatedActivities,
      });
  
      // Increment the maxCount for the removed activity in the main activities list
      const updatedMainActivities = activities.map((activity) => {
        if (activity.id === activityId) {
          return {
            ...activity,
            maxCount: updatedMaxCount,
          };
        }
        return activity;
      });
  
      // Update the main activities list
      setActivities(updatedMainActivities);
    }
  }
  

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/bookings"
            element={
              <>
                {isLoggedIn && <PageBanner handleRemoveActivity={handleRemoveActivity} {...loggedInUser} />}
               
                  <BookingPage upDateActivityMaxCount={updateActivityMaxCount} loggedInUser={loggedInUser} upDateUserActivities={updateUserActivities} activities={activities}/> 
                
              </>
            }
          />
             <Route
            path="/admin"
            element={
              <>
                {isLoggedIn && <PageBanner handleRemoveActivity={handleRemoveActivity} {...loggedInUser} />}
               
                  <AdminPage upDateActivityMaxCount={updateActivityMaxCount} loggedInUser={loggedInUser} upDateUserActivities={updateUserActivities} activities={activities}/> 
                
              </>
            }
          />
                    <Route path="/add" element={<AddActivityPage activities={activities} setActivities={setActivities} onAddActivity={onAddActivity} />} />

        </Route>
        <Route path='/view' element={<ViewUsers users={users}/>}/>
      </Routes>
    </div>
  );
}

export default App;
