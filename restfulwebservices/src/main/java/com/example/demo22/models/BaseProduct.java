package com.example.demo22.models;

import javax.persistence.CascadeType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class BaseProduct {
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer product_id;

    private String product_name;

    private String product_desc;
    
    private int num_reviews;
	
	private double product_discount;

    private float rating;

    private double score;

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn
	private Brand brand;    

    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public String getProduct_desc() {
        return product_desc;
    }

    public void setProduct_desc(String product_desc) {
        this.product_desc = product_desc;
    }

    public double getProduct_discount() {
        return product_discount;
    }

    public void setProduct_discount(double product_discount) {
        this.product_discount = product_discount;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public int getNum_reviews() {
        return num_reviews;
    }

    public void setNum_reviews(int num_reviews) {
        this.num_reviews = num_reviews;
    }

    public double getScore() {
        return score;
    }

    //TODO:balance the score function
    public void setScore() {
        this.score = calcScore();
    }

    public double calcScore(){
        return (rating-2.5)*num_reviews + product_discount;
    }

    public BaseProduct(String product_name, String product_desc, int num_reviews,
            double product_discount, float rating, String brand) {
        this.product_name = product_name;
        this.product_desc = product_desc;
        this.num_reviews = num_reviews;
        this.product_discount = product_discount;
        this.rating = rating;
        this.brand = new Brand(brand);

    }

    public BaseProduct() {
    }

    
    
    
}