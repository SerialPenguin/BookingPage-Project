import { Activity } from "../types/Activity";
import LoginForm from "../components/LoginForm";
import { UserRole } from "../types/User";
import "../stylesheet/pages/_LoginPage.scss"

interface LoginPageProps{
onLogin:(id:number,username:string,role:UserRole,activities:Activity[],password:string) => void;
}

// Render the form for log in

function LoginPage(props:LoginPageProps){
    const {onLogin} = props;
    return(
       <div className="login-form">
        <LoginForm onLogin={onLogin}/>
            <div className="quote">
                <h2>"We help you to stay STRONG"</h2>
            </div>
        </div>
    )
}
export default LoginPage;