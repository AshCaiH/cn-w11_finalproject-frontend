import { useContext, useEffect } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { putRequest } from "../common/requests";
import { userContext } from "../common/contexts";

export const QueryResponse = (props) => {
    const user = useContext(userContext).user;

    useEffect(() => {}, [props.response]);

    const setDefault = async (location) => {
        const body = JSON.stringify({town: location});

        const headers = {
            "Content-Type": "application/json",
            "Authorization": user.token
        }

        await putRequest(`${import.meta.env.VITE_SERVER_URL}/users/update/town`, body, headers)
            .then(user.location = location);
    }

    

    const Response = () => {
        if (!props.response) return
        else {
            if (!props.response.location) return <><p>Awaiting response from server.</p> <AiOutlineLoading3Quarters className="loading-icon"/></>;
            const location = props.response.location;
            const weather = props.response.weather;
            return (
                <>
                    <h4>Showing weather information for {location.city}, {location.county} in {location.country}</h4>
                    <h3>Today{"'"}s weather is {weather.weathername[0]}.</h3>
                    <h3>The highest temperature today will be {weather.temperature[0]} degrees celsius.</h3>

                    {/* Don't save the county if it comes back as "undefined" */}
                    <button onClick={() => setDefault(`${location.city}, ${location.county != undefined ? location.county + "," : ""} ${location.country}`)}>Set {location.city} as my default location</button>
                    <img src={`data:image/png;base64,${props.response.map}`} />
                    <p className="response-wrong-prompt">Wrong place? Try using a postcode or search with a more specific location name (eg, Bury, Greater Manchester)</p>
                </>
            )
        }
    }

    if (props.response) {
        return (
            <div className="response element">
                <Response />
            </div>
        )
    }
}

export default QueryResponse