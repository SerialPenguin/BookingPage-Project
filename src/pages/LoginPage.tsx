import { Activity } from "../types/Activity";
import LoginForm from "../components/LoginForm";
import { UserRole } from "../types/User";
import "../stylesheet/pages/_LoginPage.scss"
interface LoginPageProps{
onLogin:(id:number,username:string,role:UserRole,activities:Activity[],password:string) => void;
}

function LoginPage(props:LoginPageProps){
    const {onLogin} = props;
    return(
       <div>
        <LoginForm onLogin={onLogin}/>

        <h2>"We help you to stay STRONG"</h2>
        </div>
    )
}
export default LoginPage;