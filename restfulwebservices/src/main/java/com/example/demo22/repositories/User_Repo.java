package com.example.demo22.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

import com.example.demo22.CategoryTuple;
import com.example.demo22.models.Product;
import com.example.demo22.models.SaveClicks;
import com.example.demo22.models.User;

public interface User_Repo extends JpaRepository <User,Integer>{

	Optional<User> findByEmail(String email);
	
	Optional<User> findById(Long id);

    Optional<User> findByUsernameOrEmail(String username, String email);

    List<User> findByIdIn(List<Long> user_Id);

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
	
	
	
	
    @Query(value="SELECT category_category_id,count(*) as frequency from product,saveclicks,brand where userId = ?1 group by category_category_id order by frequency LIMIT 1",nativeQuery = true)
    CategoryTuple findSearchesByCount(int uid);

    @Query(value="SELECT p.* from product p,brand where category_id = ?1 order by score LIMIT 1",nativeQuery = true)
    Product findByCategory(int category_id);

}
