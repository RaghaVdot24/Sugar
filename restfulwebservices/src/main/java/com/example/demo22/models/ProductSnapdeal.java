package com.example.demo22.models;

import javax.persistence.Entity;

@Entity
public class ProductSnapdeal extends BaseProduct{

    public ProductSnapdeal(String product_name, String product_desc, int num_reviews, double product_discount,
            float rating, String brand) {
        super(product_name, product_desc, num_reviews, product_discount, rating, brand);
    }

    
}