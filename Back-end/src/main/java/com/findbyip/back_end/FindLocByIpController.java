package com.findbyip.back_end;

import java.util.Map;
import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.github.cdimascio.dotenv.Dotenv;



@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class FindLocByIpController {

    private final String apiKey;
    private final String baseURL;

    public FindLocByIpController(){
        Dotenv dotenv=Dotenv.load();
        this.baseURL=dotenv.get("BASE_URL");
        this.apiKey=dotenv.get("API_KEY");
    }

    public String getParam(String input){
        String result="domain";
        
        if(input.contains("@")){
            return "email";
        }
        
        String cleaned=input.replace(".","");
        
        try{
            Long converted=Long.parseLong(cleaned);
            if(converted!=0){
                return "ipAddress";
            }
        }catch(NumberFormatException e){
        }

        return result;
    }

    @PostMapping("/")
    public ResponseEntity<Map<String,Object>> handlEntity(@RequestBody String req) {
        Map<String, Object> response = new HashMap<>();
        
        ObjectMapper mapper=new ObjectMapper();
        try {

            Request request = mapper.readValue(req, Request.class);
            String parsedJson=request.getReq();

            if(parsedJson.equals(null)||parsedJson.isEmpty()){
                response.put("error", "Request is empty");
                return ResponseEntity.badRequest().body(response);
            }

            RestTemplate restTemplate=new RestTemplate();
            
            String param=getParam(parsedJson);
            
            String url=baseURL+"apiKey="+apiKey+"&"+param+"="+parsedJson;

            String result = restTemplate.getForObject(url, String.class);
             
            JSONObject resOBJ=new JSONObject(result);

            JSONObject location=resOBJ.getJSONObject("location");
            
            String country=location.getString("country");
            String city=location.getString("city");
            String timeZone=location.getString("timezone");
            String postalCode=location.getString("postalCode");
            Double lat=location.getDouble("lat");
            Double lng=location.getDouble("lng");          
            
            response.put("Country",country);
            response.put("City",city);
            response.put("TimeZone",timeZone);
            response.put("PostalCode",postalCode);
            response.put("Lat",lat);
            response.put("Lng",lng);

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            response.put("error",e);
        }
        
        return ResponseEntity.ok(response);
    }
    
}
