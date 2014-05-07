<html>
<head><title>Home Page</title>
<link rel="stylesheet" type="text/css" href="style.css"  />



</head>
<body>
<?php
require_once('header.php');
?>


<div class="middle_container">

<div class="search_container">
<div class="search_div">
<input type="text" class="search_box" name="search" placeholder="Search Products Here" />
<span id="font_search">
</span>
</div>
</div>
/* product container */
<div class="product_container">
<div class="product_title">Trending Products :</div>
<div class="product_slider">
<span class="product_icon" id="left_icon"></span>
<div class="main_product">
<ul id="gallery">
<li class="one_product"><img src= "aa.jpg" width="200" height="200" />
<div class="product_name">Demo 1111</div>
<div class="product_desc"><a href="javascript:void(0);">Description &gt;&gt; </a >
</div>
</li>

<li class="one_product"><img src= "aa.jpg" width="200" height="200" />
<div class="product_name">Demo 1112</div>
<div class="product_desc"><a href="javascript:void(0);">Description &gt;&gt; </a >
</div>
</li>
<li class="one_product"><img src= "aa.jpg" width="200" height="200"/>
<div class="product_name">Demo 1113</div>
<div class="product_desc"><a href="javascript:void(0);">Description &gt;&gt; </a >
</div>


</li>
<li class="one_product"><img src= "aa.jpg" width="200" height="200"/>
<div class="product_name">Demo 1114</div>
<div class="product_desc"><a href="javascript:void(0);">Description &gt;&gt; </a >
</div>

</li>
<li class="one_product"><img src= "aa.jpg" width="200" height="200"/>

<div class="product_name">Demo 1115</div>
<div class="product_desc"><a href="javascript:void(0);">Description &gt;&gt; </a >
</div>
</li>
<li class="one_product"><img src= "aa.jpg" width="200" height="200"/>
<div class="product_name">Demo 1116</div>
<div class="product_desc"><a href="javascript:void(0);">Description &gt;&gt; </a >
</div>


</li>
<li class="one_product"><img src= "aa.jpg" width="200" height="200"/>
<div class="product_name">Demo 1117</div>
<div class="product_desc"><a href="javascript:void(0);">Description &gt;&gt; </a >
</div>


</li>
<li class="one_product"><img src= "aa.jpg" width="200" height="200"/>
<div class="product_name">Demo 1118</div>
<div class="product_desc"><a href="javascript:void(0);">Description &gt;&gt; </a >
</div>


</li>
<li class="one_product"><img src= "aa.jpg" width="200" height="200"/>
<div class="product_name">Demo 1119</div>
<div class="product_desc"><a href="javascript:void(0);">Description &gt;&gt; </a >
</div>


</li>


</ul>


</div>
<span class="product_icon" id="right_icon" ></span>
</div>
</div>

/* end product container */

</div>
<?php 
require_once('footer.php');
?>
<script type="text/javascript" src="jquery.js" ></script>
<script type="text/javascript" src="jquery.jcarousel.pack.js" ></script>
<script type="text/javascript" src="about.js" ></script>
</body>
</html>