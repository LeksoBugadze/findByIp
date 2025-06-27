package com.findbyip.back_end;

import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.github.cdimascio.dotenv.Dotenv;



@RestController
@CrossOrigin(origins = "*")
public class FindLocByIpController {

    private final String apiKey;
    private final String baseURL;

    public FindLocByIpController(){
        Dotenv dotenv=Dotenv.load();
        this.baseURL=dotenv.get("BASE_URL");
        this.apiKey=dotenv.get("API_KEY");
    }

    @PostMapping("/")
    public ResponseEntity<Map<String,Object>> handlEntity(@RequestBody String req) {
        Map<String, Object> response = new HashMap<>();
        
        ObjectMapper mapper=new ObjectMapper();
        try {

            Request request = mapper.readValue(req, Request.class);
            String parsedJson=request.getReq();

            System.out.println("Key "+ apiKey);

            response.put("location",parsedJson);

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            response.put("error",e);
        }
        
        return ResponseEntity.ok(response);
    }
    
}
