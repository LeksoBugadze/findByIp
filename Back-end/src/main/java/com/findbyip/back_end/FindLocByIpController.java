package com.findbyip.back_end;

import java.util.Map;
import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@CrossOrigin(origins = "*")
public class FindLocByIpController {

    @PostMapping("/")
    public ResponseEntity<Map<String,Object>> handlEntity(@RequestBody String req) {
        ObjectMapper mapper=new ObjectMapper();
        Map<String, Object> response = new HashMap<>();
        
        try {

            Request request = mapper.readValue(req, Request.class);
            String parsedJson=request.getReq();

            response.put("location",request.getReq());

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            response.put("error",e);
        }
        
        return ResponseEntity.ok(response);
    }
    
}
