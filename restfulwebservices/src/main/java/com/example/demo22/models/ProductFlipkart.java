package com.example.demo22.models;

import javax.persistence.Entity;

/**
 * ProductFlipkart
 */

 @Entity
public class ProductFlipkart extends BaseProduct{

    public ProductFlipkart(String product_name, String product_desc, int num_reviews, double product_discount,
            float rating, String brand) {
        super(product_name, product_desc, num_reviews, product_discount, rating, brand);
    }

    

    
}