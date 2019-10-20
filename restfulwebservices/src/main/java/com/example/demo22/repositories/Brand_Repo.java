package com.example.demo22.repositories;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

import com.example.demo22.models.Brand;
import com.example.demo22.models.Product;

public interface Brand_Repo extends CrudRepository<Brand, Integer> {

    @Query(value = "SELECT product.* FROM product natural join brand where brand_name like ?1",nativeQuery=true)
    List<Product> findByBrand_name(String name);

}
