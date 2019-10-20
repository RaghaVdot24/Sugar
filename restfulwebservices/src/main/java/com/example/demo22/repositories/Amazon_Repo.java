package com.example.demo22.repositories;

import com.example.demo22.models.ProductAmazon;

import org.springframework.data.repository.CrudRepository;


public interface Amazon_Repo extends CrudRepository<ProductAmazon,Integer>{
    
}