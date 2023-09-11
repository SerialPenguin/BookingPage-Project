import AddActivityForm from "../components/AddActivityForm";
import PageBanner from "../components/PageBanner";
import BookingPage from "./BookingPage";
import { Activity } from "../types/Activity";
import { Link } from "react-router-dom";
import { User } from "../types/User";
interface AdminPageProps {
  activities: Activity[];
  upDateUserActivities:(activity: Activity) => void;
  loggedInUser:User
}

function AdminPage(props: AdminPageProps): JSX.Element {
  return (
    <>
      <h1>AdminPage</h1>
      <Link to="/add">Add new Activity</Link>
      <p></p>
      <Link to="/view">View Users</Link>
      <BookingPage loggedInUser={props.loggedInUser} upDateUserActivities={props.upDateUserActivities} activities={props.activities} />
    </>
  );
}

export default AdminPage;
