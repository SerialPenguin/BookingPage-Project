import { useState } from 'react';
import axios from 'axios';
import { Activity } from '../types/Activity';
import { User } from '../types/User';
import "../stylesheet/components/_BookingButton.scss"

interface BookingButtonProps { 
  activity: Activity;
  updateUserActivities: (activity: Activity) => void;
  loggedInUser: User;
  upDateActivityMaxCount:(activityId: number) => void;
}

  // Logic for updating the logged in users activities when booking an activity
function BookingButton({ activity, updateUserActivities, loggedInUser, upDateActivityMaxCount }: BookingButtonProps) {
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  function showBookingConfirmation() {
    setBookingConfirmed(true);
  }

  function hideBookingConfirmation() {
    setBookingConfirmed(false);
  }

  function handleBookActivity() {
    const userId = loggedInUser.id;
    // Create a new booking object
    const booking = {
      userId: userId,
      activityId: activity.id,
      bookedDate: new Date(),
    };

    // Gets bookings from Mirage
    axios
      .post('/bookings', booking)
      .then((response) => {
        console.log('Booking successful:', response.data);
        const newActivity = {
          id: activity.id,
          title: activity.title,
          content: activity.content,
          date: new Date(activity.date),
          maxCount: activity.maxCount -1,
        };
        // After a successful booking, update the user's activities
        upDateActivityMaxCount(activity.id)
        updateUserActivities(newActivity);
        showBookingConfirmation();
        
      })
      .catch((error) => {
        console.error('Error booking activity:', error);
      });
  }


  return (
    <div>
      {bookingConfirmed && (
        <div className="booking-confirmation">
          <p>Your booking has been confirmed!</p>
          <button onClick={hideBookingConfirmation} className='booking-btn'>Close</button>
        </div>
      )}
      <button onClick={handleBookActivity} className='login-btn'>Book Activity</button>
    </div>
  );
}

export default BookingButton;