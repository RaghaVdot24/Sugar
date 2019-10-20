package com.example.demo22.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name="comment")
public class Comments {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long getId() {
	    return comment_id;
	}

	public void setId(Long id) {
	    this.comment_id = id;
	}

	
	@Lob
	@Column(name="COMMENT", length=512)
	private Long comment_id;
	
	
}
