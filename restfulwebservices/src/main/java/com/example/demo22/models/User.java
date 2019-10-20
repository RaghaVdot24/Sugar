package com.example.demo22.models;

import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import com.example.demo22.audit.DateAudit;

import javax.persistence.*;

@Entity
@Embeddable // USER TO BE USED AS COMPOSITE PRIMARY KEY IN PRODUCTS VIEWED
@Table(name="user",uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "username"
            }),
            @UniqueConstraint(columnNames = {
                "email"
            })
})
public class User extends DateAudit{
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	public Long getId() {
	    return id;
	}
	
	public void setId(Long id) {
	    this.id = id;
	}

	@NotNull
	private String username;
	
	@NotNull
	private String password;
	
	@NotNull
	@Email
	private String email;
	
	public User() {}
	
	public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
	}
	
	
	
	// UNORDERED COLLECTION OF *OBJECTS* IN WHICH DUPLICATE AVLUES CANNOT BE STORED 

	public String getUsername() {
	    return username;
	}

	public void setUsername(String username) {
	    this.username = username;
	}

	public String getPassword() {
	    return password;
	}

	public void setPassword(String password) {
	    this.password = password;
	}

	public String getEmail() {
	    return email;
	}

	public void setEmail(String email) {
	    this.email = email;
	}

	@ManyToMany
	@JoinTable(
			name = "user_role",
			joinColumns = @JoinColumn(name="user_id"),
			inverseJoinColumns = @JoinColumn(name="role_id"))
	
	Set<Role> roles;
	public Set<Role> getRoles() {
        return roles;
    }

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	
@ManyToMany(mappedBy="users")
Set<ProductViewed> productviewed ;

	 
//		@OneToMany(mappedBy = "userId")
//		private Set<SaveClicks> clicks;
	 
	 

	
	

}
