package com.example.demo22.controllers;

import java.io.IOException;

import com.example.demo22.JsonUrl;
import com.example.demo22.models.ScrapeList;
import com.example.demo22.repositories.ScrapeList_Repo;
import com.example.demo22.security.CurrentUser;
import com.example.demo22.security.UserPrincipal;
import com.example.demo22.services.User_Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParser;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class ScrapeList_Controller {

    @Autowired
    private ScrapeList_Repo scrapelistrepo;

    @Autowired
    private User_Service userservice;

    @PostMapping("/userpages")
    public @ResponseBody String getUserPages(@RequestBody String jsonString) throws IOException
    {
        ScrapeList l = new ScrapeList();
        //l.setUser(currentuser);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonUrl jsonUrl = objectMapper.readValue(jsonString,JsonUrl.class);
        l.setUrl(jsonUrl.url);
        scrapelistrepo.save(l);
        userservice.scrapeUrl(jsonUrl.url);
        return "Saved";
    }
    
}