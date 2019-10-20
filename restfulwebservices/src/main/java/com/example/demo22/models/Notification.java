package com.example.demo22.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;


// EACH USER CAN HAVE MULTIPLE SEARCH IDS; MANY TO MANY MAPPING ;
// ONE URL SAVED CORRESPONDING TO EACH MAPPING; EACH URL IS ONE TO ONE MAPPED TO A PRODUCT; HENCE THE COMPOSITE KEY IN THIS MANY TO MANY TABLE IS ONE TO ONE LINKED TO PRODUCTS
@Entity
@Table(name="notified")
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int notified_id;

	@OneToOne
	private ProductViewed product_viewed;
	
	boolean Notified;
	


}
