package com.example.demo22.repositories;

import java.util.List;

import com.example.demo22.models.ScrapeList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface ScrapeList_Repo extends CrudRepository<ScrapeList,Integer>{

    @Query(value = "SELECT * from scrapelist where lastscraped < DATE_SUB(NOW(),INTERVAL 1 DAY) order by lastscraped",nativeQuery = true)
    List<ScrapeList> toScrapeNext();

}