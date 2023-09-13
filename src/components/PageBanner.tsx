import { UserRole } from "../types/User";
import { Activity } from "../types/Activity";
import LogOutBtn from "./LogOutBtn";

interface PageBannerProps{
    username:string;
    role:UserRole;
    activities:Activity[];
    password:string;

    handleRemoveActivity:(activityId: number) => void;
    handleIncrementMaxCount?: (activityId: number) => void;
}

// Maps through users and booked activities and renders it on the page banner using the page banner props as the type declaration
export default function PageBanner(props:PageBannerProps):JSX.Element{
    return(
        <>
        <LogOutBtn/>
        <h2>User options</h2>
        <p>Logged in as: {props.username}</p>
        <p>Your Role is: {props.role}</p>
        <p>Your booked activities:  </p>
            <ul>
                {props.activities.map((activity) =>{ 
                    
                    return <li key={activity.id}>
                        <p>{activity.title}</p>
                        <p>{activity.content}</p>
                        
                        <p>Participants: {activity.maxCount}</p>
                         <p>{activity.date.toLocaleString()}</p>
                         <button onClick={() => props.handleRemoveActivity(activity.id)} className="login-btn">Cancel Activity</button>
                    </li>
                })}
            </ul>
      


        </>
        
    )
}