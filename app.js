
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var db = require('monk')('localhost/tagslocal');
var products = db.get('products');
var crawled = require('crawl');
var request = require('request');
var cheerio = require('cheerio');
var url = require('url');
var category = require('category');
//var request1 = require('request1');
var page1 = require('page');
var retailer = require('retailer');
var search_page_data = new Array();

var db1 = require('db');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req,res){
res.render('index');
});
app.get('/users', user.list);


app.use(express.bodyParser());

app.post('/searching',function(req,res){
console.log('searching');
var term1 = req.body.term2;
var data123 = db1.find_home(term1,function(data){
res.send(data);
});
});

app.get('/search',function(req,res){
var page = 0;
var search_term = req.query.search_term;
var no = req.query.no;
if(typeof(req.query.page) != "undefined"){
page = req.query.page;
}
console.log(no);
db1.find_similar(search_term,page,no,function(data,total_results_num){
search_page_data = data;
res.render('search',{search_data:data,search_term:search_term,total_results_num:total_results_num});
});
});


app.post('/get_product_colors',function(req,res){
var name = req.body.name;
db1.get_product_colors(name,function(data){
});
});


app.post('get_retailer_by_city',function(req,res){

});


app.post('/search_ajax',function(req,res){
var page = req.body.page;
var search_term = req.body.search_term;
var no = req.body.no;
db1.find_similar(search_term,page,no,function(data,total_results_num){
search_page_data = data;
res.send(data);
});
});

app.post('/get_trending',function(req,res){
console.log('trending');
db1.get_trending_products(function(data){
res.send(data);
});
});

app.get('/gettrending',function(req,res){
console.log('trending get');
db1.get_trending_products(function(data){
res.send(data);
});
});


app.post('/trendingsearch',function(req,res){
db1.get_trending_products(function(data){
console.log(data);
res.send(data);
});
});


app.post('/search_term',function(req,res){
var search_term = req.body.search_term;
db1.find_home(search_term,function(data){
res.send(data);
});
});

app.get('/category',function(req,res){

var category_name = req.query.category;

db1.show_products_by_category(category_name,function(data){
console.log(data);
res.render('category',{category_name:category_name,c_data:data});
});

});

app.post('/search_filter',function(req,res){
var retailer_arr = new Array();
var brands_arr = req.body.brands_arr;
if(typeof(req.body.retailer_arr) != "undefined"){
retailer_arr = req.body.retailer_arr;
}
var term = req.body.term;
db1.get_search_filter(brands_arr,retailer_arr,term,function(data){
console.log(data.length);
res.send(data);
});
});


app.post('/search_page',function(req,res){
var search_term = req.body.search_term;
var page = req.body.page;
var no = req.body.no;
db1.find_similar(search_term,page,no,function(data){
res.send(data);
});
});


app.post('/get_similar_products',function(req,res){
var brand = req.body.brand;
db1.get_similar_products(brand,function(data){
res.send(data);
});
});

app.post('/get_product_brands',function(req,res){
var name = req.body.name;
db1.get_product_brands(name,function(data){
res.send(data);
});
});

app.get('/product',function(req,res){
var url = req.query.product;
db1.get_product_by_url(url,function(data){
console.log(data);
res.render('product',{url:url,c_data:data});
});
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.post('/get_product_retailers',function(req,res){
var name = req.body.name;
retailer.get_product_retailers(name,function(data,retailer_data){
res.send(retailer_data);
});
});


//crawled.crawl_site_snapdeal('http://www.snapdeal.com/brand/samsung/mobiles-mobile-phones','Samsung');
//crawled.crawl_site_snapdeal('http://www.snapdeal.com/brand/micromax/mobiles-mobile-phones','Micromax');
//crawled.crawl_site_snapdeal('http://www.snapdeal.com/brand/apple/mobiles-mobile-phones','Apple');
//crawled.crawl_site_snapdeal('http://www.snapdeal.com/brand/xolo/mobiles-mobile-phones','Xolo');
crawled.crawl_site_snapdeal('http://www.snapdeal.com/brand/sony/mobiles-mobile-phones','Sony'); 
//crawled.crawl_site_snapdeal('http://www.snapdeal.com/brand/nokia/mobiles-mobile-phones','Nokia');




// www.nokia.com


// request('http://www.nokia.com/in-en/phones/all/',function(error,response,html){
// var data1;

// if(!error && response.statusCode == 200){
// var $ = cheerio.load(html);
// var titles = $('.featured');

// titles.each(function(i,element){ 
// 	//    console.log(i); 
// 	//  console.log(titles.eq(i).text()); 

// 		var img_path = titles.eq(i).attr('data-image-url');
//  	var name = titles.eq(i).find('.headline').text();
//  	name = name.trim();
//  	var desc = titles.eq(i).find('.caption p').text();
// 	desc = desc.trim();	
	
// 	console.log(name+"\n"+desc+"\n"+img_path+"\n \n");	
	
// 	db1.add_product(name,desc,img_path,"phone","Nokia");
// 	});
	
// 	}

// 	});
  
 


// www.acer.com


// request('http://us.acer.com/ac/en/US/content/models/ultrabooks/aspires7', function(error,response,html){

// 	if(!error && response.statusCode == 200){
// 		var $ = cheerio.load(html);
		
		
// 		var products = $('.container-sx .product');
		
// 		products.each(function(i,element){
// 			if(products.eq(i).css('display') == 'block'){
// 			//console.log(products.eq(i).attr('id'));
// 			//console.log(i);
// 			var title = products.eq(i).find('.content article h2').html();
// 			var price = products.eq(i).find('.content article h3').html();
// 			console.log(title+"\t"+price+"\n");
// 			var txtLOs = products.eq(i).find('.content article ul li span');
// 			var list1 = txtLOs.eq(0).text();
// 			var list2 = txtLOs.eq(1).text();
// 			var list3 = txtLOs.eq(2).text();
// 			var list4 = txtLOs.eq(3).text();

// 		}
// 		});


// 	}



// });
/*
for(var i=2;i<=7;i++){
var website_name = "http://www.gsmarena.com/nokia-phones-f-1-0-p"+i+".php";

	crawled.crawl_site_gsmarena(website_name,'Nokia');

}
/*

crawled.crawl_site_gsmarena('http://www.gsmarena.com/samsung-phones-9.php','Samsung');

for(var i=2;i<=11;i++){

	var website_name = "http://www.gsmarena.com/samsung-phones-f-9-0-p"+i+".php";

	crawled.crawl_site_gsmarena(website_name,'Samsung');

}


crawled.crawl_site_gsmarena('http://www.gsmarena.com/motorola-phones-4.php','Motorola');

for(var i=2;i<=8;i++){

	var website_name = "http://www.gsmarena.com/motorola-phones-f-4-0-p"+i+".php";

	crawled.crawl_site_gsmarena(website_name,'Motorola');

}

crawled.crawl_site_gsmarena('http://www.gsmarena.com/sony-phones-7.php','Sony');

for(var i=2;i<=3;i++){

	var website_name = "http://www.gsmarena.com/sony-phones-f-7-0-p"+i+".php";

	crawled.crawl_site_gsmarena(website_name,'Sony');

}
crawled.crawl_site_gsmarena('http://www.gsmarena.com/apple-phones-48.php','Apple');

crawled.crawl_site_gsmarena('http://www.gsmarena.com/htc-phones-45.php','HTC');

for(var i=2;i<=5;i++){

	var website_name = "http://www.gsmarena.com/htc-phones-f-45-0-p"+i+".php";

	crawled.crawl_site_gsmarena(website_name,'HTC');
}
crawled.crawl_site_gsmarena('http://www.gsmarena.com/blackberry-phones-36.php','Blackberry');

for(var i=2;i<=3;i++){

	var website_name = "http://www.gsmarena.com/blackberry-phones-f-36-0-p"+i+".php";

	crawled.crawl_site_gsmarena(website_name,'Blackberry');

}

crawled.crawl_site_gsmarena('http://www.gsmarena.com/nokia-phones-1.php','Nokia');

 crawled.crawl_site_gsmarena('http://www.gsmarena.com/dell-phones-61.php','Dell');
crawled.crawl_site_gsmarena('http://www.gsmarena.com/hp-phones-41.php','HP');
crawled.crawl_site_gsmarena('http://www.gsmarena.com/celkon-phones-75.php','Celkon');

for(var i=2;i<=6;i++){

	var website_name = "http://www.gsmarena.com/celkon-phones-f-75-0-p"+i+".php";
	crawled.crawl_site_gsmarena(website_name,'Celkon');


}

crawled.crawl_site_gsmarena('http://www.gsmarena.com/lg-phones-20.php','LG');

for(var i=2;i<=9;i++){

	var website_name = "http://www.gsmarena.com/lg-phones-f-20-0-p"+i+".php";
	crawled.crawl_site_gsmarena(website_name,'LG');


}

crawled.crawl_site_gsmarena('http://www.gsmarena.com/micromax-phones-66.php','Micromax');

for(var i=2;i<=5;i++){

	var website_name = "http://www.gsmarena.com/micromax-phones-f-66-0-p"+i+".php";
	crawled.crawl_site_gsmarena(website_name,'Micromax');


}
crawled.crawl_site_gsmarena('http://www.gsmarena.com/acer-phones-59.php','Acer');
crawled.crawl_site_gsmarena('http://www.gsmarena.com/acer-phones-f-59-0-p2.php','Acer');
*/

// request('http://www.huaweidevice.co.in/Products/SmartPhones/', function(error,response,html){

// 	if(!error && response.statusCode == 200){
// 		var $ = cheerio.load(html);
		
		
// 		var products1 = $('.over .product-mobile');
// 		var products2 = $('.over .product-mobile-last');
// 		products1.each(function(i,element){

// 			// console.log(i);
// 			var href = products1.eq(i).find('a').attr('href');
// 			var src = products1.eq(i).find('img').attr('src');
// 			var title = products1.eq(i).find('.product-name').text();

			
// 			console.log(href + '\n' + src + '\n' + title + desc);



// 	});
// 	// 	products2.each(function(i,element){

// 	// 		// console.log(i);
// 	// 		var href = products2.eq(i).find('a').attr('href');
// 	// 		var src = products2.eq(i).find('img').attr('src');
// 	// 		var title = products2.eq(i).find('.product-name').text();
// 	// 		// var desc = products.eq(i).find('img').attr('title');
// 	// 		console.log(href + '\n' + src + '\n' + title);
			


// 	// });
// 	}



// });


//request1.crawl('GSM','nokia');



exports.db = db;

