import { Activity } from "../types/Activity";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../types/User";
import "../stylesheet/pages/_LoginPage.scss"

interface LoginFormProps {
  onLogin: (
    id:number,
    username: string,
    role: UserRole,
    activities: Activity[],
    password: string
  ) => void;
}

function LoginForm(props: LoginFormProps): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(username, password);
  
    // Sends userdata to the Mirage-backend to verify the user
    axios
      .post('/login', { username, password })
      .then((response) => {
        const user = response.data;
        if (user) {
          console.log('Logged in as:', user.username, user.role,user.activities, user.password);
  
          // Calls the onLogin-function to process the login and checks if the user is admin or normal user
          props.onLogin(user.id,user.username, user.role, user.activities, user.password);
            if(user.role === "ADMIN"){
                navigate("/admin")
            }else{navigate("/bookings")}
          
          setError('');
        } else {
        
          setError('Invalid username or password');
          
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setError('Invalid username or password');
      });
  }
  

  return (
    <div className="login-form-wrapper">
      {error && <div className="error-message">{error}</div>}
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log in!</button>
    </form>
    
    </div>
  );
}

export default LoginForm;