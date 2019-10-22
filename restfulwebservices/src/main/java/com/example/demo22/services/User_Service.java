package com.example.demo22.services;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.example.demo22.CategoryTuple;
import com.example.demo22.models.Product;
import com.example.demo22.models.ProductAmazon;
import com.example.demo22.models.ProductFlipkart;
import com.example.demo22.models.ScrapeList;
import com.example.demo22.proxysetup.ProxyDetails;
import com.example.demo22.proxysetup.ProxyList;
import com.example.demo22.repositories.Amazon_Repo;
import com.example.demo22.repositories.Flipkart_Repo;
import com.example.demo22.repositories.Product_Repo;
import com.example.demo22.repositories.ScrapeList_Repo;
import com.example.demo22.repositories.User_Repo;

@Service
public class User_Service {

	@Autowired
	private User_Repo userrepository;

	@Autowired
	private ScrapeList_Repo scrapelistrepository;

	@Autowired
	private Amazon_Repo amazonrepo;

	@Autowired
	private Flipkart_Repo flipkartrepo;

	@Autowired
	private Product_Repo productrepo;

	SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

	// public void notify(int uid) {
	// CategoryTuple categoryTuple = userrepository.findSearchesByCount(uid);
	// Product product = userrepository.findByCategory(categoryTuple.getId());
	// //Date lastnotifiedDate =
	// dateFormat.parse(userrepository.findLastNotifiedDate(uid));

	// }

	public void scrapeUrl(String url) throws IOException {
//		List<ScrapeList> toScrape = scrapelistrepository.toScrapeNext();
//		for(ScrapeList scrapeurl : toScrape)
//		{
//			String url = scrapeurl.getUrl();
			ProxyList p = new ProxyList();
			ProxyDetails<String,String,String> pd = p.getProxy();
			System.out.println(pd.toString());
			System.setProperty("http.proxyHost",pd.getHost());
			System.setProperty("http.proxyPort", pd.getPort());
			Document productPage = Jsoup.connect(url)
										//.proxy(pd.getHost(),Integer.valueOf(pd.getPort()))
										.userAgent(pd.getUserAgent())
										.get();
			//System.out.println(productPage);
			// Document dummy = Jsoup.connect("https://www.whoishostingthis.com/tools/user-agent/")
			// 						.userAgent(pd.getUserAgent())
			// 						.proxy(pd.getHost(), Integer.valueOf(pd.getPort()))
			// 						.timeout(1000*60)
			// 						.get();
			// System.out.println(dummy.getElementsByClass("info-box user-agent").text());
			// System.out.println(dummy.getElementsByClass("info-box ip").text());
			if(url.contains("amazon"))
			{
			String title = productPage.getElementById("productTitle").text();
			String brand = productPage.getElementById("bylineInfo_feature_div").child(0).child(0).text();
			float rating = Float.valueOf(productPage.getElementById("acrPopover").attr("title").split(" ",0)[0]);
			int num_reviews =Integer.valueOf(productPage.getElementById("acrCustomerReviewText").text().split(" ",0)[0].replace(",", ""));
			double orig_price = Double.valueOf(productPage.getElementById("price").child(0).child(0).child(0).child(1).child(0).text().replaceAll("/^[0-9]/","").substring(1).replace(",", ""));
			System.out.println(orig_price);
			double new_price = Double.valueOf(productPage.getElementById("price").child(0).child(0).child(1).child(1).child(0).text().replaceAll("/^[0-9]/","").substring(1).replace(",", ""));
			System.out.println(new_price);
			String img_url = productPage.getElementById("landingImage").attr("src");
			System.out.println(img_url);
			String product_desc ="";
			Element bulletsElement = productPage.getElementById("feature-bullets").child(0);
			System.out.println(bulletsElement);
			for(Element e: bulletsElement.select("li>span"))
				product_desc+=e.text();
			double product_discount = 100*(orig_price-new_price)/orig_price;

			//insert into amazon table
			ProductAmazon productAmazon=new ProductAmazon(title, product_desc, num_reviews, product_discount, rating, orig_price, new_price, img_url, brand);
			productAmazon.setScore();
			amazonrepo.save(productAmazon);
			}
			if(url.contains("flipkart"))
			{
			String title = productPage.getElementsByClass("_35KyD6").text();
			System.out.println(title);
			String brand;
			try {
				brand = productPage.getElementsByClass("_2J4LW6").text();
				System.out.println(brand);	
			} catch (Exception e) {
				brand = title.split(" ",0)[0];
				System.out.println(brand);
			}
			float rating = Float.valueOf(productPage.getElementsByClass("_3ors59").first().child(0).child(0).child(0).text());
			System.out.println(rating);
			int num_reviews =Integer.valueOf(productPage.getElementsByClass("_38sUEc").text().split(" ",0)[0].replace(",",""));
			System.out.println(num_reviews);
			double orig_price = Double.valueOf(productPage.getElementsByClass("_3auQ3N _1POkHg").first().text().replaceAll("/[^0-9]/","").substring(1).replace(",", ""));
			System.out.println(orig_price);
			double new_price = Double.valueOf(productPage.getElementsByClass("_1uv9Cb").first().child(0).text().substring(1).replace(",",""));
			String img_div = productPage.getElementsByClass("LzhdeS").first().child(0).child(0).child(0).attr("style");
			String img_url = img_div.split(":", 2)[1].substring(3).replaceAll("[()]", "");
			img_url = img_url.replace("/128/128", "/880/1056");
			System.out.println(img_url);
			String product_desc ="";
			//Element bulletsElement = productPage.getElementById("feature-bullets").child(0);
			//for(Element e: bulletsElement.select("li>span"))
			//	product_desc+=e.text();
			double product_discount = 100*(orig_price-new_price)/orig_price;

			// ProductFlipkart productFlipkart = new ProductFlipkart(title,product_desc, num_reviews, product_discount, rating, brand);
			// productFlipkart.setScore();
			// productFlipkart.setImg_url(img_url);
			// flipkartrepo.save(productFlipkart);

			Product product = new Product(title, product_desc, num_reviews, product_discount, rating, orig_price, new_price, img_url, brand);
			product.setScore();
			productrepo.save(product);
			}

//		}
	}
	
	
	
	
}
