package com.example.demo22.models;


import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;


// EACH USER CAN HAVE MULTIPLE SEARCH IDS; MANY TO MANY MAPPING ;
// ONE URL SAVED CORRESPONDING TO EACH MAPPING; EACH URL IS ONE TO ONE MAPPED TO A PRODUCT; HENCE THE COMPOSITE KEY IN THIS MANY TO MANY TABLE IS ONE TO ONE LINKED TO PRODUCTS
@Entity
@Table(name="productviewed")
public class ProductViewed {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int productviewed_id;
	@Lob
	private String URL;
	
	@ManyToMany
	@JoinTable(
			name = "productviewed_user",
			joinColumns = @JoinColumn(name="productviewed_id"),
			inverseJoinColumns = @JoinColumn(name="user_id"))
	
	Set<User> users;
	
	
	@OneToOne
	private Product product_id;

}
