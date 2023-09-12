import BookingPage from "./BookingPage";
import { Activity } from "../types/Activity";
import { Link } from "react-router-dom";
import { User } from "../types/User";
import "../stylesheet/components/_FakeBtn.scss"

interface AdminPageProps {
  activities: Activity[];
  upDateUserActivities:(activity: Activity) => void;
  loggedInUser:User
  upDateActivityMaxCount:(activityId: number) => void;
}

// Renders and adds functions for the admin page

function AdminPage(props: AdminPageProps): JSX.Element {
  return (
    <>
      <h1>AdminPage</h1>
      <Link to="/add" className="admin-btn">Add new Activity</Link>
      <p></p>
      <Link to="/view" className="admin-btn">View Users</Link>
      <BookingPage upDateActivityMaxCount={props.upDateActivityMaxCount} loggedInUser={props.loggedInUser} upDateUserActivities={props.upDateUserActivities} activities={props.activities} />
    </>
  );
}

export default AdminPage;
