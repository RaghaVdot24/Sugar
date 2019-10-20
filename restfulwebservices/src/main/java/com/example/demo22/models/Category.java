package com.example.demo22.models;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="category")
public class Category {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer category_id;

    private String category_name;

	public Integer getId() {
		return category_id;
	}

	public void setId(Integer id) {
		this.category_id = id;
	}
	
	public String getName() {
		return category_name;
	}

	public void setName(String name) {
		this.category_name = name;
	}

	@OneToMany(mappedBy="category", cascade= CascadeType.ALL)
	private Set<Brand> brands;
	
}
