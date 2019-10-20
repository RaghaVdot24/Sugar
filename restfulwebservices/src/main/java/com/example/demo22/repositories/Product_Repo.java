package com.example.demo22.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

import com.example.demo22.models.Product;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface Product_Repo extends CrudRepository<Product, Integer> {

    @Query(value="SELECT * FROM product where name like ?%1% or desc like ?%1%",nativeQuery=true)
    List<Product> findByNameOrDesc(String key);

    @Query(value = "SELECT * FROM product order by score desc",nativeQuery = true)
    List<Product> orderByScore();

    @Query(value="SELECT f.product_discount from product_flipkart f natural join product p where p.product_id==?1",nativeQuery = true)
    double findPriceFlipkart(int id);
    
    @Query(value="SELECT a.product_discount from product_amazon a natural join product p where p.product_id==?1",nativeQuery = true)
    double findPriceAmazon(int id);

    @Query(value="SELECT s.product_discount from product_snapdeal a natural join product p where p.product_id==?1",nativeQuery = true)
    double findPriceSnapdeal(int id);

    
    
    
    
    //    @Query(value="CREATE TRIGGER insert_newproductviewed BEFORE INSERT ON productviewed FOR EACH ROW BEGIN SET NEW.gen_date := now();\n" + 
//    		"  IF NEW.image <> '' THEN\n" + 
//    		"    SET NEW.image_date := now();\n" + 
//    		"  END IF;\n" + 
//    		"END;\n" + 
//    		"\n" + 
//    		"CREATE TRIGGER update_template BEFORE UPDATE ON template\n" + 
//    		"FOR EACH ROW BEGIN\n" + 
//    		"  IF NEW.image <> OLD.image THEN\n" + 
//    		"    SET NEW.image_date := now();\n" + 
//    		"  END IF;\n" + 
//    		"END;",nativeQuery = true);
    
    
//    @Query(value="CREATE TRIGGER before_employee_update 
//    	    BEFORE UPDATE ON employees
//    	    FOR EACH ROW 
//    	 INSERT INTO employees_audit
//    	 SET action = 'update',
//    	     employeeNumber = OLD.employeeNumber,
//    	     lastname = OLD.lastname,
//    	     changedat = NOW()');
  //  double findPriceAmazon(int id);
 	

}