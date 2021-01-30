import React, {useState} from 'react';

function CityRenderer(props) {
    const[city, setCity] = useState(props.value);

    const onCityChange = (event) => {
        props.onCityChange(event.target.value);
        setCity(event.target.value);
    }
    return(
        <div>
            <select value={city} onChange={onCityChange}>
                <option value="mumbai"> Mumbai </option>
                <option value="manhatton"> ManHatton </option>
                <option value="dubai"> Dubai </option>
                <option value="punjab"> punjab </option>
            </select>
        </div>
    )
}

export default CityRenderer;