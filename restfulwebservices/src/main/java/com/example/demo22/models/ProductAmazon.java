package com.example.demo22.models;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "productAmazon")
public class ProductAmazon extends BaseProduct {

    public ProductAmazon(String product_name, String product_desc, int num_reviews, double product_discount,
            float rating, double orig_price, double new_price, String img_url, String brand) {
        super(product_name, product_desc, num_reviews, product_discount, rating, orig_price, new_price, img_url, brand);
    }

    

    

    

}