package com.example.demo22.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.demo22.security.UserPrincipal;

/**
 * ToScrape
 */
@Entity
public class ScrapeList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scrape_id;

    @Column(length = 1024)
    private String url;

    private Date lastScraped;

    public int getScrape_id() {
        return scrape_id;
    }

    public void setScrape_id(int scrape_id) {
        this.scrape_id = scrape_id;
    }

    // public UserPrincipal getUser() {
    //     return userprincipal;
    // }

    // public void setUser(UserPrincipal user) {
    //     this.userprincipal = user;
    // }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    
    
}