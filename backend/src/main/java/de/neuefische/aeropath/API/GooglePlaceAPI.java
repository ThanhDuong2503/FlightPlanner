package de.neuefische.aeropath.API;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Service
public class GooglePlaceAPI {

    @Value("${google.apikey}")
    private String googleMapsApiKey;

    public String getImageUrl (String placeId) {

        RestTemplate restTemplate = new RestTemplate();
        String waypointPlaceId = placeId;

        String url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+ waypointPlaceId + "&fields=photos&key=" + googleMapsApiKey ;

        // JsonNode used to reach nodes further down the main branch
        ResponseEntity<JsonNode> responseEntity = restTemplate.getForEntity(url, JsonNode.class);

        // get a random photo from Google Place API
        int photoListSize = responseEntity.getBody().get("result").get("photos").size();
        int randomNumber = (int) (Math.floor(Math.random() * photoListSize));

        String reference = responseEntity.getBody().get("result").get("photos").get(randomNumber).get("photo_reference").asText();
        return "https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=" + reference + "&key=" + googleMapsApiKey;
    }

    public String getNameUrl (String placeId) {

        RestTemplate restTemplate = new RestTemplate();
        String waypointPlaceId = placeId;

        String url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+ waypointPlaceId + "&fields=name&key=" + googleMapsApiKey ;

        ResponseEntity<JsonNode> responseEntity = restTemplate.getForEntity(url, JsonNode.class);

        String reference = responseEntity.getBody().get("result").get("name").asText();
        return reference;
    }

    public String getAddressUrl (String placeId) {

        RestTemplate restTemplate = new RestTemplate();
        String waypointPlaceId = placeId;

        String url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+ waypointPlaceId + "&fields=formatted_address&key=" + googleMapsApiKey ;

        ResponseEntity<JsonNode> responseEntity = restTemplate.getForEntity(url, JsonNode.class);

        String reference = responseEntity.getBody().get("result").get("formatted_address").asText();
        return reference;
    }

}
