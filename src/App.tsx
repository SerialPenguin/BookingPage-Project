import React, { useState, useEffect } from 'react';
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


  useEffect(() => {
    fetch('/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.map((user:User)=> convertUser(user.id, user.username, user.role, user.activities, user.password)));
        console.log(data); // Här loggar du den hämtade användardata
      });
  }, []);
  


  useEffect(() => {
    // Hämta aktivitetsdata från MirageJS
    fetch('/activities') // Använd rätt endpoint här
      .then((response) => response.json())
      .then((data) => setActivities(data)); // Uppdatera aktivitetsstaten med data från Mirage
      
  }, []);

 

  function onAddActivity(id: number, title: string, content: string, date: Date, maxCount: number) {
    // Skapa en ny aktivitet med de givna parametrarna
    const newActivity: Activity = {
      id,
      title,
      content,
      date,
      maxCount,
    };
  
    // Skapa en kopia av den befintliga activities-arrayen och lägg till den nya aktiviteten
    const updatedActivities = [...activities, newActivity];
  
    // Uppdatera activities-arrayen med den nya arrayen
    setActivities(updatedActivities);
  }

  useEffect(() => {
    const storedUserData = localStorage.getItem("loggedInUser");
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      console.log(user)
      const newUser: User = convertUser( user.id,user.username, user.role,user.activities,user.password)
      setIsLoggedIn(true);
      setLoggedInUser(newUser);
    }
    console.log(loggedInUser);
  }, []);
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

  function handleLogin(id:number,username: string, role: UserRole, activities: Activity[], password: string) {
    setIsLoggedIn(true);
    console.log('in app');

    setLoggedInUser(convertUser( id,username, role, activities, password ));
    localStorage.setItem("loggedInUser", JSON.stringify({ username, role, activities }))
  }

  function updateUserActivities(activity: Activity) {
    // Skapa en kopia av användarens aktivitetslista och lägg till den nya aktiviteten
    const updatedActivities = [...loggedInUser.activities, activity];
    
    // Uppdatera loggedInUser med den uppdaterade aktivitetslistan
    setLoggedInUser({ ...loggedInUser, activities: updatedActivities });
  }

  //nytt under:

   // Funktion för att ta bort en aktivitet från användarens lista av aktiviteter
   function handleRemoveActivity(activityId: number) {
    // Skapa en kopia av användarens aktuella aktivitetslista
    const updatedActivities = [...loggedInUser.activities];

    // Hitta indexet för den aktivitet som ska tas bort
    const indexToRemove = updatedActivities.findIndex((activity) => activity.id === activityId);

    // Ta bort aktiviteten om den hittades
    if (indexToRemove !== -1) {
      updatedActivities.splice(indexToRemove, 1);

      // Uppdatera användarens aktivitetslista med den uppdaterade listan
      setLoggedInUser({ ...loggedInUser, activities: updatedActivities });
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
               
                  <BookingPage loggedInUser={loggedInUser} upDateUserActivities={updateUserActivities} activities={activities}/> 
                
              </>
            }
          />
             <Route
            path="/admin"
            element={
              <>
                {isLoggedIn && <PageBanner handleRemoveActivity={handleRemoveActivity} {...loggedInUser} />}
               
                  <AdminPage loggedInUser={loggedInUser} upDateUserActivities={updateUserActivities} activities={activities}/> 
                
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
