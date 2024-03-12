import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./QueryForm.css"
import { useContext, useState } from "react"
import { postRequest } from "../common/requests"
import { userContext } from "../common/contexts"

export const QueryForm = (props) => {
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState(null);
    const user = useContext(userContext).user;

    const sendRequest = async () => {

        const reqBody = JSON.stringify({
            date: date,
            location: location ? location : user.location,
        });

        const reqHeaders = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
        }

        console.log(reqHeaders);

        props.setResponse("awaiting response from server");

        const response = await postRequest(`${import.meta.env.VITE_SERVER_URL}/getweather`, reqBody, reqHeaders);

        props.setResponse(response);
    }

    return (
        <div className="request element">
            <h2>Enter your location:</h2>
            <form className="request-form" onSubmit={(e) => e.preventDefault()}>
                <input
                    className="location-search" 
                    placeholder={user.location}
                    onChange={(e) => setLocation(e.target.value)}
                ></input>
                <DatePicker 
                    selected={date}
                    dateFormat="dd MMM yyyy"
                    onChange={(calendarDate) => setDate(calendarDate)}
                    todayButton="Click here for today"
                />
                <button onClick={sendRequest}>Send Request</button>
            </form>
        </div>
    )
}

export default QueryForm