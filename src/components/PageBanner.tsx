import { UserRole } from "../types/User";
import { Activity } from "../types/Activity";

interface PageBannerProps{
    username:string;
    role:UserRole;
    activities:Activity[];
    password:string;

    handleRemoveActivity:(activityId: number) => void;

}

// Maps through users and booked activities and renders it on the page banner using the page banner props as the type declaration
export default function PageBanner(props:PageBannerProps):JSX.Element{
    return(
        <>
        <h2>Pagebanner</h2>
        <p>Logged in as: {props.username}</p>
        <p>Your Role is: {props.role}</p>
        <p>Your booked activities:  </p>
            <ul>
                {props.activities.map((activity) =>{ 
                    
                    return <li key={activity.id}>
                        <p>{activity.title}</p>
                        <p>{activity.content}</p>
                        
                        <p>{activity.maxCount}</p>
                         <p>{activity.date.toLocaleString()}</p>
                         <button onClick={() => props.handleRemoveActivity(activity.id)}>Cancel Activity</button>
                        

                    </li>
                })}
            </ul>
      


        </>
        
    )
}