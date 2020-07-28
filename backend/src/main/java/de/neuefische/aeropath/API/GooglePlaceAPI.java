package de.neuefische.aeropath.API;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


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
        String reference = responseEntity.getBody().get("result").get("photos").get(0).get("photo_reference").asText();
        return "https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=" + reference + "&key=" + googleMapsApiKey;
    }




}
