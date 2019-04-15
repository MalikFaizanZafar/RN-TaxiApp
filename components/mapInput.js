import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class MapInput extends React.Component {

    render() {
        return (

            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2}
                autoFocus={true}
                returnKeyType={'search'} 
                listViewDisplayed={false}
                fetchDetails={true}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    this.props.notifyChange(details.geometry.location);
                  }
                }
                query={{
                    key: 'AIzaSyB-EsaismaaJDTBDg0F2l-28Z-7zsVCTWU',
                    language: 'en'
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={200}
            />
        );
    }
}
export default MapInput;