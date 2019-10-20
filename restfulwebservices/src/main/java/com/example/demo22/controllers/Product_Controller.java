package com.example.demo22.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo22.models.Product;
import com.example.demo22.models.ProductAmazon;
import com.example.demo22.repositories.Product_Repo;
import com.example.demo22.repositories.User_Repo;


@Controller
@CrossOrigin(origins="*")
public class Product_Controller {
	
	@Autowired
	private Product_Repo productrepository;
	
	@PostMapping(path="/add") // Map ONLY POST Requests
	public @ResponseBody String addNewProduct (@RequestParam String name
			, @RequestParam String desc,@RequestParam float rating,@RequestParam int num_reviews,@RequestParam String brand,@RequestParam double discount) {
		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request

		Product p = new Product(name,desc,num_reviews,discount,rating,brand);
		p.setImg_url("./img1");
		productrepository.save(p);
		return "Saved";
	}
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<Product> getAllProducts()
	{
		return productrepository.findAll();
	}

	@GetMapping(path = "/dealsoftheday")
	public @ResponseBody List<Product> returnTop()
	{
		return productrepository.orderByScore();
	}

	@PostMapping(path="/searchdata")
	public @ResponseBody List<Product> searchProducts(String key)
	{
		System.out.println(key);
		return productrepository.findByNameOrDesc(key);
	}

	@GetMapping(path = "/details/{id}")
	public @ResponseBody double FlipkartPrice(@PathVariable int id)
	{
		return productrepository.findPriceFlipkart(id);
	}

}
