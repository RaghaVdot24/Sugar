package com.example.demo22.models;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;


@Entity // This tells Hibernate to make a table out of this class
public class Brand {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer brand_id;

    private String brand_name;


	public Integer getId() {
		return brand_id;
	}

	public void setId(Integer id) {
		this.brand_id = id;
	}

	public String getName() {
		return brand_name;
	}

	public void setName(String name) {
		this.brand_name = name;
	}

	@ManyToOne
	@JoinColumn
	private Category category;
	
	@OneToMany(mappedBy="brand", cascade= CascadeType.ALL)
	private Set<ProductFlipkart> products;

	public Brand(String brand_name) {
		this.brand_name = brand_name;
	}
	
	
	
}