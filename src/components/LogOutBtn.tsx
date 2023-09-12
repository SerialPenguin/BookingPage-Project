import { useNavigate } from "react-router-dom";
import "../stylesheet/components/_LogOutBtn.scss"

function LogOutBtn(): JSX.Element {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the local storage
    localStorage.clear();

    // Redirect to the landing page
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="logout-btn">Log out</button>
  )
}
  export default LogOutBtn;