package com.example.demo22.models;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Query;



@Entity // This tells Hibernate to make a table out of this class
public class Product extends BaseProduct {

	@OneToOne
	private ProductAmazon productAmazon;

	@OneToOne
	private ProductFlipkart productFlipkart;

	@OneToOne
	private ProductSnapdeal productSnapdeal;
	
	public void setPassword(String password) {
		// TODO Auto-generated method stub
		
	}
	
	// @Override
	// public double calcScore()
	// {
	// 	return Math.max(productAmazon.getScore(),Math.max(productFlipkart.getScore(),productSnapdeal.getScore()));
	// }

	public ProductAmazon getProductAmazon() {
		return productAmazon;
	}

	public void setProductAmazon(ProductAmazon productAmazon) {
		this.productAmazon = productAmazon;
	}

	public ProductFlipkart getProductFlipkart() {
		return productFlipkart;
	}

	public void setProductFlipkart(ProductFlipkart productFlipkart) {
		this.productFlipkart = productFlipkart;
	}

	public ProductSnapdeal getProductSnapdeal() {
		return productSnapdeal;
	}

	public void setProductSnapdeal(ProductSnapdeal productSnapdeal) {
		this.productSnapdeal = productSnapdeal;
	}

	public Product() {
	}

	public Product(String product_name, String product_desc, int num_reviews, double product_discount, float rating,
			double orig_price, double new_price, String img_url, String brand) {
		super(product_name, product_desc, num_reviews, product_discount, rating, orig_price, new_price, img_url, brand);
	}
}