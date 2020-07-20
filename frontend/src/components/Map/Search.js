import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover} from "@reach/combobox";
import React from "react";


function Search({panTo}) {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            // search center point
            location: {
                lat: () => 52.133891,
                lng: () => 7.685239
            },
            // 300km radius search expansion range
            radius: 300 * 1000,
        }
    });
    return (
        <div className={"searchBox"}>
            <Combobox onSelect={async (address) => {
                // get selected address without fetching new data from google API
                setValue(address, false);

                // close results-list
                clearSuggestions();

                // 1) get a list of results --> 2) get lat,lng of first result item --> 3) map centers to this position
                try {
                    const results = await getGeocode({address});
                    const {lat, lng} = await getLatLng(results[0]);
                    panTo({lat, lng});
                } catch (error) {
                    console.log("error loading Geocode data...")
                }
            }}>
                <ComboboxInput value={value}
                               onChange={(event) => {
                                   setValue(event.target.value);
                               }}
                               disabled={!ready}
                               placeholder={"search..."}
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && data.map(({id, description}) => (
                            <ComboboxOption key={id} value={description}/>
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}

export default Search;