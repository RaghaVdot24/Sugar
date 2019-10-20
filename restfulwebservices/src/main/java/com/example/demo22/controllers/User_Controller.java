package com.example.demo22.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo22.authentication.UserIdentityAvailability;
import com.example.demo22.authentication.UserProfile;
import com.example.demo22.authentication.UserSummary;
import com.example.demo22.exception.ResourceNotFoundException;
import com.example.demo22.models.ScrapeList;
import com.example.demo22.models.User;
import com.example.demo22.repositories.ScrapeList_Repo;
import com.example.demo22.repositories.User_Repo;
import com.example.demo22.security.CurrentUser;
import com.example.demo22.security.UserPrincipal;

@RequestMapping("/api")
@RestController
public class User_Controller {
	
	@Autowired
    private User_Repo userrepository;
    
    @Autowired
    private ScrapeList_Repo scrapelistrepository;
	
	private static final Logger logger = LoggerFactory.getLogger(User_Controller.class);
	
	  @GetMapping("/user/me")
	    //@PreAuthorize("hasRole('USER')")
	    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
	        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername());
	        return userSummary;
	    }
	
	@GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userrepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userrepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }
    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userrepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

       

        UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getCreatedAt());

        return userProfile;
    }


    
}
